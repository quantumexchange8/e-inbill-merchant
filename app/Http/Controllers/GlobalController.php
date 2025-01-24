<?php

namespace App\Http\Controllers;

use App\Models\DiscountSetting;
use App\Models\PolicySetting;
use App\Models\QuotaSetting;
use App\Models\State;
use App\Models\Subscription;
use App\Models\TaxSetting;
use Illuminate\Http\Request;

class GlobalController extends Controller
{
    public function getState()
    {

        $state = State::get();

        return response()->json($state);
    }

    public function getTax()
    {

        $taxes = TaxSetting::get();

        return response()->json($taxes);
    }

    public function getDiscount()
    {

        $discounts = DiscountSetting::get();

        return response()->json($discounts);
    }

    public function getPolicySetting()
    {

        $policy = PolicySetting::with(['lateChargeSetting'])->get();

        return response()->json($policy);
    }

    public function addOnQuota()
    {

        $quotas = QuotaSetting::get();

        return response()->json($quotas);
    }

    public function getSubscription()
    {

        $subscription = Subscription::where('status', 'active')->with(['subscribers', 'termsUnit'])->get();

        return response()->json($subscription);
    }
}
