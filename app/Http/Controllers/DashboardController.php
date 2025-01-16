<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $todaySale =  Transaction::where('transaction_type', 'sales')
                ->whereDate('created_at', now())
                ->sum('total_amount');

        $todayOrder =  Transaction::where('transaction_type', 'sales')
                ->whereDate('created_at', now())
                ->count();

        $todayItemSold =  TransactionDetail::whereDate('created_at', now())
                ->sum('quantity');


        return Inertia::render('Dashboard', [
            'todaySale' => $todaySale,
            'todayOrder' => $todayOrder,
            'todayItemSold' => $todayItemSold,
        ]);
    }

    public function getRecentTransaction(Request $request)
    {

        $weeklySales = Transaction::query()
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as total_sales')) // Count records
            ->where('transaction_type', 'sales')
            ->whereBetween('created_at', [Carbon::now()->subDays(7)->startOfDay(), Carbon::now()->endOfDay()]) // From 6 days ago to today
            ->groupBy(DB::raw('DATE(created_at)')) // Group by date
            ->orderBy('date') // Order by date
            ->get();

        return response()->json($weeklySales);
    }

    public function getTopSellingItem()
    {

        $userMerchantID = Auth::user()->merchant_id;

        $topItems = TransactionDetail::query()
                ->select('transaction_details.item_id', DB::raw('SUM(transaction_details.quantity) as total_quantity'))
                ->join('transactions', 'transactions.id', '=', 'transaction_details.transaction_id')
                ->join('shift_transactions', 'shift_transactions.id', '=', 'transactions.shift_transaction_id')
                ->where('shift_transactions.merchant_id', $userMerchantID) // Filter by merchant_id
                ->groupBy('transaction_details.item_id')
                ->orderBy('total_quantity', 'desc')
                ->with([
                    'item:id,name,category_id,image_color,image_shape',
                    'item.category:id,name,color',
                ])
                ->whereHas('item', function ($query) {
                    $query->whereNull('deleted_at'); // Ensure the item is not soft-deleted
                })
                ->take(10)
                ->get();

        $topItems->each(function ($topItem) {
            if ($topItem->item) { // Check if the item exists (not null)
                $topItem->item->itemImgs = $topItem->item->getFirstMediaUrl('item_image');
            }
        });

        return response()->json($topItems);
    }


    public function getWeeklySales(Request $request)
    {
        $currentWeeklySales = Transaction::query()
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as total_sales'))
            ->where('transaction_type', 'sales')
            ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get();

        $lastWeeklySales = Transaction::query()
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as total_sales'))
            ->where('transaction_type', 'sales')
            ->whereBetween('created_at', [Carbon::now()->subWeek()->startOfWeek(), Carbon::now()->subWeek()->endOfWeek()])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get();

        return response()->json(['currentWeek' => $currentWeeklySales, 'lastWeek' => $lastWeeklySales]);
    }

    public function getEinvoiceSummary(Request $request)
    {

        

        return response()->json();
    }
}
