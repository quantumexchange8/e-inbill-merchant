<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\TaxpayerToken;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SubmitInvoiceController extends Controller
{
    public function submitEinvoice(Request $request)
    {

        // dd($request->all());
        $user = Auth::user();
        $merchantDetail = Merchant::find($user->merchant_id);

        foreach ($request->invoices as $data) {
            
            $id = Transaction::find($data['id']);
            $id->invoice_status = 1;
            $id->handle_by = $user->id;
            $id->save();

        }

        if ($merchantDetail) {

            $checkToken = TaxpayerToken::where('merchant_id', $user->merchant_id)->first();

            if ($checkToken) {

                $invoiceData = [
                    'e-Invoice Number' => $request->receipt_no,
                    'e-Invoice Date' => $request->transaction_date,
                    'e-Invoice Version' => '1.0',
                    'e-Invoice Type Code' => '01',
                    'currency' => 'MYR',
                    'supplier' => [
                        'supplier_name' => $request->supplier_name,
                        'supplier_tin' => $request->supplier_tin,
                        'supplier_brn' => $request->supplier_brn,
                        'supplier_sst_register_no' => $request->supplier_brn,
                        'supplier_msic_code' => $request->supplier_msic_code,
                        'supplier_address' => $request->supplier_address,
                        'supplier_contact' => $request->supplier_contact,
                    ],
                    'buyer' => [
                        'buyer_name' => $request->buyer_name ?? 'General Public',
                        'buyer_tin' => $request->buyer_tin ?? 'EI00000000010',
                        'buyer_register_no' => $request->buyer_register_no ?? 'NA',
                        'buyer_sst_register_no' => $request->buyer_brn ?? 'NA',
                        'buyer_address' => $request->buyer_address ?? 'NA',
                        'buyer_contact' => $request->buyer_contact ?? 'NA',
                    ],
                    'total_amount' => $request->total_amount,
                    'total_tax' => $request->total_tax,
                    'total_grand_amount' => $request->total_grand_amount,
                    'transaction_type' => $request->transaction_type,
                    'transaction_date' => $request->transaction_date,
                    'merchant_id' => $request->merchant_id,
                    
                ];
                
                $docsSubmitApi = 'https://api/v1.0/documentsubmissions/';
                $submiturl = Http::withToken($checkToken->token)->post($docsSubmitApi, $invoiceData);

                if ($submiturl->successful()) {
                    Log::debug('submission ', $submiturl);

                }
                

            } else {
                $preprod = 'https://{{idSrvBaseUrl}}/connect/token';

                $response = Http::post($preprod, [
                    'client_id' => $merchantDetail->irbm_client_id,
                    'client_secret' => $merchantDetail->irbm_client_key,
                    'grant_type' => 'client_credentials',
                    'scope' => 'InvoicingAPI',
                ]);

                if ($response->successful()) {
                    Log::debug('token ', $response);
                    $getToken = TaxpayerToken::create([
                        'merchant_id' => $user->merchant_id,
                        'token' => $response['access_token'],
                        'expired_at' => Carbon::now()->addHour(),
                    ]);

                } else {
                    $status = $response->status();
                    $error = $response->body();

                    Log::debug('response error', $status, $error);
                }
            }
        
        }

        return redirect()->back();
    }
}
