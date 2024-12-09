<?php

namespace App\Http\Controllers;

use App\Models\ConsolidateInvoice;
use App\Models\Merchant;
use App\Models\ShiftTransaction;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function eInvoice()
    {
        return Inertia::render('Einvoice/Einvoice');
    }

    public function getNormalInvoice()
    {

        $user = Auth::user();

        $transactions = Transaction::whereIn('transaction_type', ['sales'])
                // ->where('user_id', $user->id)
                ->where('invoice_status', 0)
                ->where('merchant_id', $user->merchant_id)
                ->with(['shiftSales', 'transaction_details']) // Eager load the related shift transaction
                ->latest()
                ->get();

        return response()->json($transactions);

    }

    public function getConsolidateInvoice()
    {
        $user = Auth::user();

        $transactions = Transaction::whereIn('transaction_type', ['consolidate'])
                // ->where('user_id', $user->id)
                ->where('invoice_status', 0)
                ->where('merchant_id', $user->merchant_id)
                ->with(['shiftSales', 'consolidateSales', 'consolidateSales.transaction']) // Eager load the related shift transaction
                ->latest()
                ->get();

        return response()->json($transactions);

    }

    public function consolidateInvoice(Request $request)
    {
        dd($request->all());
        $user = Auth::user();

        $totalAmount = 0;

        foreach($request->invoices as $invoice) {

            $totalAmount += $invoice['total_grand_amount'];

            $updateTrans = Transaction::find($invoice['id']);
            $updateTrans->update([
                'transaction_type' => 'grouped_consolidate'
            ]);
        }

        $consolidate = Transaction::create([
            'shift_transaction_id' => '0',
            'user_id' => $user->id,
            'receipt_no' => 'consolidate',
            'total_amount' => $totalAmount,
            'payment_type' => '-',
            'transaction_type' => 'consolidate',
            'transaction_date' => now(),
        ]);

        foreach($request->invoices as $invoice) {
            $consolidateInvoice = ConsolidateInvoice::create([
                'merchant_id' => $user->merchant_id,
                'consolidate_id' => $consolidate->id,
                'transaction_id' => $invoice['id'],
                'total_amount' => $invoice['total_grand_amount'],
            ]);
        }

        return redirect()->back();
    }

    public function getNormalInvoiceItem($id)
    {

        $user = Auth::user();

        $getItem = TransactionDetail::where('transaction_id', $id)->with(['item', 'transaction:id,discount_amount'])->get();
        $getMerchant = Merchant::find($user->merchant_id);

        return response()->json([
            'items' => $getItem, 
            'merchant' => $getMerchant
        ]);
    }

    public function submitEinvoice(Request $request)
    {

        // login tax payer system
        // if success cache login token {

            // submit document

            // get the submission api 

        // }  else {
        //     check auth n retry    
        // } 

        

        return response()->json();
    }

    public function deleteInvoice(Request $request)
    {
        
        $datas = $request->all();
        $user = Auth::user();

        foreach ($request->invoices as $data) {
            
            $id = Transaction::find($data['id']);

            $id->invoice_status = 3;
            $id->handle_by = $user->id;
            $id->save();
        }

        return redirect()->back();
    }

    public function archiveInvoice(Request $request)
    {

        $user = Auth::user();

        foreach ($request->invoices as $data) {
            
            $id = Transaction::find($data['id']);

            $id->invoice_status = 2;
            $id->handle_by = $user->id;
            $id->save();
        }

        return redirect()->back();
    }

    // Archive function 
    public function getArchiveInvoice()
    {

        $user = Auth::user();

        $transactions = Transaction::whereIn('transaction_type', ['sales'])
                // ->where('user_id', $user->id)
                ->where('invoice_status', 2)
                ->where('merchant_id', $user->merchant_id)
                ->with(['shiftSales', 'transaction_details']) // Eager load the related shift transaction
                ->latest()
                ->get();

        return response()->json($transactions);
    }
}
