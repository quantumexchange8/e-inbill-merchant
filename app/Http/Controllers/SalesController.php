<?php

namespace App\Http\Controllers;

use App\Models\ShiftTransaction;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function salesReport()
    {

        $totalItem = TransactionDetail::sum('quantity');
        $totalOrder = Transaction::where('transaction_type', 'sales')->count();

        $totalAmount = Transaction::where('transaction_type', 'sales')->sum('total_amount');
        $totalRefund = Transaction::where('transaction_type', 'sales')->sum('refund_amount');

        $totalSales = $totalAmount - $totalRefund;

        return Inertia::render('Sales/SalesReport', [
            'totalItem' => $totalItem,
            'totalOrder' => $totalOrder,
            'totalSales' => $totalSales,
        ]);
    }

    public function getSaleHistory()
    {
        $user = Auth::user();

        $sales = Transaction::query()
                ->where('merchant_id', $user->merchant_id)
                ->where('transaction_type', 'sales')
                ->with(['transaction_details:id,transaction_id,item_id,quantity,amount', 'transaction_details.item:id,name,price,image_color,image_shape'])
                ->latest()
                ->get();

        $sales->each(function ($transaction) {
            $transaction->transaction_details->each(function ($detail) {
                if ($detail->item) {
                    $detail->item->itemImgs = $detail->item->getFirstMediaUrl('item_image');
                }
            });
        });

        return response()->json($sales);
    }

    public function getShiftCashHistory()
    {
        $sales = ShiftTransaction::query()
            ->with(['transaction'])
            ->latest()
            ->get();

        return response()->json($sales);
    }

    public function getMonthlySalesPerformance(Request $request)
    {

        $year = $request->input('year', date('Y'));

        $monthlySales = Transaction::query()
            ->whereYear('created_at', $year)
            ->where('transaction_type', 'sales')
            ->selectRaw('MONTH(created_at) as month, SUM(total_amount) as total_amount')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($monthlySales);
    }

    public function getMonthlyPay(Request $request)
    {
        $year = $request->input('year', date('Y'));

        $monthlyPayIn = Transaction::query()
            ->whereYear('created_at', $year)
            ->where('transaction_type', 'shift')
            ->selectRaw('MONTH(created_at) as month, SUM(paid_in) as paid_in')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyPayOut = Transaction::query()
            ->whereYear('created_at', $year)
            ->where('transaction_type', 'shift')
            ->selectRaw('MONTH(created_at) as month, SUM(paid_out) as paid_out')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'monthlyPayIn' => $monthlyPayIn,
            'monthlyPayOut' => $monthlyPayOut,
        ]);
    }
}
