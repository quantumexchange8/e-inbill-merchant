<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\InvoiceTransaction;
use App\Models\Item;
use App\Models\OrderRefund;
use App\Models\OrderRefundDetail;
use App\Models\ShiftTransaction;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function openShift(Request $request)
    {
        $user = Auth::user();

        $checkShift = ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('status', 'opened')
            ->first();

        if (empty($checkShift)) {
            $shift = ShiftTransaction::create([
                'merchant_id' => $user->merchant_id,
                'user_id' => $user->id,
                'shift_no' => RunningNumberService::getID('shift'),
                'starting_cash' => $request->starting_cash,
                'expected_cash_amount' => $request->starting_cash,
                'shift_opened' => now(),
                'status' => 'opened',
            ]);

            return response()->json([
                'status' => 'succesfull open shift',
            ], 200);
        } else {
            return response()->json([
                'status' => 'current shift opening',
                'shift' => $checkShift,
            ], 200);
        }
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

        if ($getShift->status === 'opened') {
            $getShift->update([
                'shift_closed' => now(),
                'actual_cash' => $request->actual_cash ?? null,
                'difference' => $request->actual_cash != null ? $getShift->expected_cash_amount - $request->actual_cash : null,
                'status' => 'closed'
            ]);

            return response()->json([
                'status' => 'succesfull closed shift',
                'shift_details' => $getShift,
            ], 200);
        } else {
            return response()->json([
                'shift_details' => $getShift->id,
                'message' => 'Shift ID' . $getShift->id . ', has closed'
            ], 200);
        }

    }

    public function addTransaction(Request $request)
    {

        $user = Auth::user();
        $shift =  ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('user_id', $user->id)
            ->where('status', 'opened')
            ->first();

        if ($request->payment_type === 'cash') {
            $transaction = Transaction::create([
                'merchant_id' => $user->merchant_id,
                'shift_transaction_id' => $shift->id,
                'user_id' => $user->id,
                'receipt_no' => RunningNumberService::getID('order'),
                'paid_in' => $request->pay_in, 
                'paid_out' => $request->pay_out, 
                'total_amount' => $request->total_amount,
                'payment_type' => 'cash',
                'transaction_type' => 'sales',
                'transaction_date' => now(),
                'discount_id' => $request->discount_id ?? null,
                'discount_amount' => $request->discount_amount,
                'total_grand_amount' => $request->total_grand_amount,
            ]);

            $shift->cash_amount += $request->total_grand_amount;
            $shift->expected_cash_amount += $request->total_grand_amount;
            $shift->gross_sales += $request->total_amount;
            $shift->net_sales += $request->total_grand_amount;
            $shift->net_cash += $request->total_grand_amount;
            $shift->total_discount += $request->discount_amount;
            $shift->save();

            $invoice = InvoiceTransaction::create([
                'merchant_id' => $user->merchant_id,
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'invoice_no' => RunningNumberService::getID('inv'),
                'date_issue' => $transaction->created_at,
                'total_amount' => $request->total_amount,
                'payment_type' => $request->payment_type,
                'invoice_type' => '01',
                'invoice_status' => '0',
            ]);

        } else {
            $transaction = Transaction::create([
                'merchant_id' => $user->merchant_id,
                'shift_transaction_id' => $shift->id,
                'user_id' => $user->id,
                'receipt_no' => RunningNumberService::getID('order'),
                'total_amount' => $request->total_amount,
                'payment_type' => 'card',
                'transaction_type' => 'sales',
                'transaction_date' => now(),
                'discount_id' => $request->discount_id ?? null,
                'discount_amount' => $request->discount_amount,
                'total_grand_amount' => $request->total_grand_amount,
            ]);

            $shift->gross_sales += $request->total_amount;
            $shift->net_sales += $request->total_amount;
            $shift->net_card += $request->total_amount;
            $shift->save();

            $invoice = InvoiceTransaction::create([
                'merchant_id' => $user->merchant_id,
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'invoice_no' => RunningNumberService::getID('inv'),
                'date_issue' => $transaction->created_at,
                'total_amount' => $request->total_amount,
                'payment_type' => $request->payment_type,
                'invoice_type' => '01',
                'invoice_status' => '0',
            ]);

        }

        foreach($request->sale_items as $sale_item) {

            $transaction_item = TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'item_id' => $sale_item['item_id'],
                'quantity' => $sale_item['quantity'],
                'amount' => $sale_item['amount'],
            ]);
        }

        return response()->json([
            'status' => 'succesfull created transaction',
        ], 200);
    }

    // Refund Transaction
    public function refundOrders(Request $request)
    {
        $user = Auth::user();
        
        $shift =  ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('user_id', $user->id)
            ->where('status', 'opened')
            ->first();

        $transaction = Transaction::find($request->id);

        $refund = OrderRefund::create([
            'transaction_id' => $transaction->id,
            'user_id' => $user->id,
            'refund_no' => RunningNumberService::getID('refund'),
            'amount' => $request->refund_amount,
        ]);
        
        foreach($request->itemRefund as $item) {

            $transactionDetails = TransactionDetail::where('transaction_id', $transaction->id)
                    ->where('item_id', $item['item_id'])
                    ->first();
            if ($transactionDetails->quantity === $transactionDetails->refunded_qty) {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'this item is fully refunded'
                ], 200);
            } else {
                $refundDetails = OrderRefundDetail::create([
                    'refund_id' => $refund->id,
                    'item_id' => $item['item_id'],
                    'refund_qty' => $item['qty'],
                    'amount' => $item['amount'],
                ]);
    
                $transactionDetails->refunded_qty += $item['qty'];
                $transactionDetails->save();
            }
        }

        $transaction->refund_amount += $request->refund_amount;
        $transaction->save();

        $shift->total_refund += $request->refund_amount;
        $shift->save();

        return response()->json([
            'status' => 'succesfull refund',
        ], 200);
    }

    public function getRefundOrders(Request $request)
    {

        $user = Auth::user();

        $refund = OrderRefund::where('user_id', $user->id)->with(['transaction', 'refundDetail', 'refundDetail.item'])->get();

        return response()->json([
            'refund_orders' => $refund,
        ], 200);
    }

    // Pay IN/OUT
    public function payIn(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'pay_in_amount' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $shift =  ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('user_id', $user->id)
            ->where('status', 'opened')
            ->first();

        $shift->paid_in += $request->pay_in_amount;
        $shift->expected_cash_amount += $request->pay_in_amount;
        $shift->save();

        $payIn = Transaction::create([
            'merchant_id' => $user->merchant_id,
            'shift_transaction_id' => $shift->id,
            'user_id' => $user->id,
            'payment_type' => 'cash',
            'paid_in' => $request->pay_in_amount,
            'transaction_type' => 'shift',
            'transaction_date' => now(),
            'remark' => $request->remark,
            'cash_management' => 'pay_in',
        ]);

        return response()->json([
            'status' => 'succesfull pay in',
        ], 200);
    }

    public function payOut(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pay_out_amount' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $shift =  ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('user_id', $user->id)
            ->where('status', 'opened')
            ->first();
            
        $shift->paid_out += $request->pay_out_amount;
        $shift->expected_cash_amount -= $request->pay_out_amount;
        $shift->save();

        $payOut = Transaction::create([
            'merchant_id' => $user->merchant_id,
            'shift_transaction_id' => $shift->id,
            'user_id' => $user->id,
            'payment_type' => 'cash',
            'paid_out' => $request->pay_out_amount,
            'transaction_type' => 'shift',
            'transaction_date' => now(),
            'remark' => $request->remark,
            'cash_management' => 'pay_out',
        ]);

        return response()->json([
            'status' => 'succesfull pay out',
        ], 200);
    }

    public function getTransaction()
    {

        $user = Auth::user();
        $shift =  ShiftTransaction::where('merchant_id', $user->merchant_id)
            ->where('user_id', $user->id)
            ->first();

        if ($shift) {
            $transaction = Transaction::where('shift_transaction_id', $shift->id)
                    ->whereNot('transaction_type', 'shift')
                    ->with(['transaction_details', 'transaction_details.item', 'refund_details'])
                    ->get();
    
            return response()->json([
                'status' => 'success',
                'transaction_history' => $transaction,
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'No shift transaction found',
        ], 200);

    }
}
