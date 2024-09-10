<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
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

        $topItems = TransactionDetail::query()
                ->select('item_id', DB::raw('CAST(SUM(quantity) AS UNSIGNED) as total_quantity')) // Casting SUM to UNSIGNED INTEGER
                ->groupBy('item_id')
                ->orderBy('total_quantity', 'desc')
                ->with(['item', 'item.category:id,name,color'])
                ->take(10)
                ->get();

        $topItems->each(function ($topItem) {
            $topItem->item->itemImgs = $topItem->item->getFirstMediaUrl('item_image');
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
