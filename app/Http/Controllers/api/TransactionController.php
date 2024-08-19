<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\ShiftTransaction;
use App\Models\Transaction;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function openShift(Request $request)
    {
        $user = Auth::user();
       
        $shift = ShiftTransaction::create([
            'merchant_id' => $user->merchant_id,
            'user_id' => $user->id,
            'shift_no' => RunningNumberService::getID('shift'),
            'starting_cash' => $request->starting_cash,
            'shift_opened' => now(),
            'status' => 'opened',
        ]);

        return response()->json([
            'status' => 'succesfull open shift',
        ], 200);

    }

    public function getShiftDetails(Request $request)
    {
        $user = Auth::user();

        $currentShift = ShiftTransaction::where('merchant_id', $user->merchant_id)
                ->where('user_id', $user->id)
                ->where('status', 'opened')
                ->first();

        $shiftHistory = ShiftTransaction::where('merchant_id', $user->merchant_id)
                ->where('user_id', $user->id)
                ->where('status', 'closed')
                ->get();
    
        return response()->json([
            'current shift details' => $currentShift ?? 'no shift opened',
            'shift history' => $shiftHistory,
        ], 200);

    }

    public function closeShift(Request $request)
    {
        $user = Auth::user();

        $getShift = ShiftTransaction::find($request->shift_id);
       
        $getShift->update([
            'shift_closed' => now(),
            'actual_cash' => $request->actual_cash ?? null,
            'difference' => $request->difference ?? null,
            'status' => 'closed'
        ]);

        return response()->json([
            'status' => 'succesfull closed shift',
        ], 200);

    }

    public function addTransaction(Request $request)
    {

        $user = Auth::user();
        $shift =  ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('user_id', $user->id)
            ->where('status', 'opened')
            ->first();

        $transaction = Transaction::create([
            'shift_transaction_id' => $shift->id,
            'user_id' => $user->id,
            // 'receipt_no' => 
        ]);


        return response()->json([
            'status' => 'succesfull created transaction',
        ], 200);
    }
}
