<?php

namespace App\Http\Controllers;

use App\Models\Classification;
use App\Models\Merchant;
use App\Models\State;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function configuration()
    {
        $authMerchant = Auth::user();

        $merchant = Merchant::where('id', $authMerchant->merchant_id)->with(['classification'])->first();
        $merchant->merchant_images = $merchant->getFirstMediaUrl('merchant_images');
        
        $classification = Classification::get();

        return Inertia::render('Configuration/Configuration', [
            'merchant' => $merchant,
            'classification' => $classification,
        ]);
    }

    public function updateMerchant(Request $request)
    {
        $request->validate([
            'merchant_name' => ['required'],
            'registration_no' => ['required'],
        ]);

        $merchant = Auth::user();

        $merchantDetails = Merchant::find($merchant->merchant_id);

        $merchantDetails->update([
            'merchant_name' => $request->merchant_name,
            'registration_no' => $request->registration_no,
            'classification_id' => $request->classification_id['id'],
        ]);

        if ($request->hasFile('merchant_images')) {
            $merchantDetails->clearMediaCollection('merchant_images');
            $merchantDetails->addMedia($request->merchant_images)->toMediaCollection('merchant_images');
        }

        return redirect()->back()->with('update successfull');
    }

    public function updateMerchantBilling(Request $request)
    {

        $request->validate([
            'merchant_name' => ['required'],
            'address' => ['required'],
            'postcode' => ['required'],
            'area' => ['required'],
            'state' => ['required'],
            'phone' => ['required'],
            'merchant_email' => ['required'],
        ]);


        $user = Auth::user();

        $merchant = Merchant::find($user->merchant_id);

        $merchant->update([
            'merchant_name' => $request->merchant_name,
            'address' => $request->address,
            'address_2' => $request->address_2,
            'postcode' => $request->postcode,
            'area' => $request->area,
            'state' => $request->state,
            'phone' => $request->phone,
            'merchant_email' => $request->merchant_email,
        ]);

        return redirect()->back()->with('update successfull');
    }

    public function updateInvoice(Request $request)
    {
        $request->validate([
            'tin_no' => ['required'],
            'irbm_client_id' => ['required'],
            'irbm_client_key' => ['required'],
        ]);

        $user = Auth::user();
        $merchant = Merchant::find($user->merchant_id);

        $merchant->update([
            'tin_no' => $request->tin_no,
            'irbm_client_id' => $request->irbm_client_id,
            'irbm_client_key' => $request->irbm_client_key,
        ]);
        
        return redirect()->back()->with('update successfull');
    }

    public function updateTax(Request $request)
    {
        
        $dateString = $request->sst_effective_data;

        $date = Carbon::parse($dateString);
        $formattedDate = $date->format('Y-m-d');
        
        $request->validate([
            'sales_tax' => ['required'],
            'service_tax' => ['required'],
            'sst_effective_data' => ['required'],
        ]);

        $user = Auth::user();
        $merchant = Merchant::find($user->merchant_id);

        $merchant->update([
            'sales_tax' => $request->sales_tax,
            'service_tax' => $request->service_tax,
            'sst_effective_data' => $formattedDate,
        ]);

        return redirect()->back()->with('update successfull');
    }

    public function getState()
    {

        $states = State::all(); 

        return response()->json($states);
    }
}
