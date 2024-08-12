<?php

namespace App\Http\Controllers;

use App\Models\Classification;
use App\Models\Merchant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function configuration()
    {
        $authMerchant = Auth::user();

        $merchant = Merchant::where('id', $authMerchant->id)->with(['classification'])->first();
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

        $merchantDetails = Merchant::find($merchant->id);

        $merchantDetails->update([
            'merchant_name' => $request->merchant_name,
            'registration_no' => $request->registration_no,
            'classification_id' => $request->classification_id['id'],
        ]);

        return redirect()->back()->with('update successfull');
    }
}
