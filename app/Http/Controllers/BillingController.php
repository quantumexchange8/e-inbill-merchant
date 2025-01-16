<?php

namespace App\Http\Controllers;

use App\Models\QuotaHistory;
use App\Models\Subscriber;
use App\Models\SubscriptionTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function myBilling()
    {

        return Inertia::render('Billing/MyBilling');
    }

    public function getSubscription()
    {

        $merchant = Auth::user()->merchant_id;

        $subscriptions = Subscriber::where('merchant_id', $merchant)->with(['subscription', 'subscription_term'])->first();

        return response()->json($subscriptions);
    }

    public function getUpComingDue()
    {

        $merchant = Auth::user()->merchant_id;

        $subscriptions = SubscriptionTransaction::where('merchant_id', $merchant)
                ->where('status', 'pending')
                ->where('expired_at', '>', now())
                ->orderBy('expired_at', 'asc')
                ->first();

        return response()->json($subscriptions);
    }

    public function getInvoiceListing()
    {
        $merchant = Auth::user()->merchant_id;

        $invoice = SubscriptionTransaction::where('merchant_id', $merchant)->get();


        return response()->json($invoice);
    }

    public function getQuotaListing()
    {
        $merchant = Auth::user()->merchant_id;

        $quotas = QuotaHistory::where('merchant_id', $merchant)->with(['quota_setting'])->get();

        return response()->json($quotas);
    }
}
