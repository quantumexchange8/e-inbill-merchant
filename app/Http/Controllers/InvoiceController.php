<?php

namespace App\Http\Controllers;

use App\Models\ConsolidateInvoice;
use App\Models\Merchant;
use App\Models\ShiftTransaction;
use App\Models\TaxpayerToken;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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
                // ->with(['shiftSales', 'transaction_details']) // Eager load the related shift transaction
                ->latest()
                ->get();

        return response()->json($transactions);

    }

    public function getConsolidateInvoice()
    {
        $user = Auth::user();
        
        $transactions = ConsolidateInvoice::where('merchant_id', $user->merchant_id)
                // ->with(['shiftSales', 'consolidateSales', 'consolidateSales.transaction']) // Eager load the related shift transaction
                ->with(['transaction:consolidate_id,transaction_date,receipt_no,payment_type,total_amount,merchant_id'])
                ->latest()
                ->get();

        return response()->json($transactions);

    }

    public function consolidateInvoice(Request $request)
    {
        
        $user = Auth::user();

        $totalAmount = 0;

        $consolidate = ConsolidateInvoice::create([
            'merchant_id' => $user->merchant_id,
            'total_amount' => $totalAmount,
        ]);

        foreach($request->invoices as $invoice) {

            $totalAmount += $invoice['total_grand_amount'];

            $updateTrans = Transaction::find($invoice['id']);
            $updateTrans->update([
                'consolidate_id' => $consolidate->id,
                'invoice_status' => '4',
            ]);
        }

        $consolidate->total_amount = $totalAmount;
        $consolidate->save();

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

    public function updateAction(Request $request, $type)
    {
        
        $user = Auth::user();
        $merchantDetail = Merchant::find($user->merchant_id);
        

        foreach ($request->invoices as $data) {
            
            $id = Transaction::find($data['id']);

            if ($type === 'draft') {
                $id->invoice_status = 0;
            }

            if ($type === 'archive') {
                $id->invoice_status = 2;
            }

            if ($type === 'delete') {
                $id->invoice_status = 3;
            }
            
            $id->handle_by = $user->id;
            $id->save();
        }

        return redirect()->back();
    }

}
