<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
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
        $sales = Transaction::query()
                ->where('transaction_type', 'sales')
                ->with(['transaction_details', 'transaction_details.item'])
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
}
