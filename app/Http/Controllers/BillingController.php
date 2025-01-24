<?php

namespace App\Http\Controllers;

use App\Models\QuotaHistory;
use App\Models\Subscriber;
use App\Models\Subscription;
use App\Models\SubscriptionTransaction;
use App\Services\RunningNumberService;
use Carbon\Carbon;
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

        $subscriptions = Subscriber::where('merchant_id', $merchant)->with(['subscription', 'subscription.late_renewal', 'subscription_term'])->first();

        return response()->json($subscriptions);
    }

    public function getUpComingDue()
    {

        $merchant = Auth::user()->merchant_id;

        $subscriptions = SubscriptionTransaction::where('merchant_id', $merchant)
                ->where('status', 'pending')
                ->where('expired_at', '>', now())
                ->orderBy('expired_at', 'asc')
                ->get();

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

    public function upgradeQuota(Request $request)
    {

        $merchant_id = Auth::user()->merchant_id;

        $subscriber =  Subscriber::where('merchant_id', $merchant_id)->whereNot('status', 'terminated')->first();

        if ($request->selectTypes === 'upgrade_quota') {
            $subscription = SubscriptionTransaction::create([
                 'merchant_id' => Auth::user()->merchant_id,
                 'invoice_no' => RunningNumberService::getID('inv', 'admin'),
                 'amount' => $request->selectedQuota['amount'],
                 'total_amount' => $request->selectedQuota['amount'],
                 'status' => 'pending',
                 'remark' => 'Upgrade Quota'
            ]);

            // $currentMonth = Carbon::now()->format('M Y');

            // $findQuota = QuotaHistory::where('date_type', $currentMonth)->where('merchant_id', $merchant_id)->first();

            // $findQuota->quota_upgrade += $request->selectedQuota['quota'];
            // $findQuota->quota_balance += $request->selectedQuota['quota'];
            // $findQuota->upgrade_date = now();
            // $findQuota->save();

            // $subscriber->total_quota += $request->selectedQuota['quota'];
            // $subscriber->save();
        }

        if ($request->selectTypes === 'upgrade_module') {

            $subscriptionPlan = Subscription::find($request->selectedPlan['id']);

            $subscription = SubscriptionTransaction::create([
                'merchant_id' => Auth::user()->merchant_id,
                'subscription_id' => $request->selectedPlan['id'],
                'subscription_term' => $request->selectedPlan['terms_unit'][0]['id'],
                'invoice_no' => RunningNumberService::getID('inv', 'admin'),
                'amount' => $request->selectedQuota['amount'],
                'total_amount' => $request->selectedQuota['amount'],
                'status' => 'pending',
                'remark' => 'Upgrade Module'
           ]);

            // $subscriber->subscription_id = $request->selectedPlan['quota'];
            // $subscriber->save();
        }

        return redirect()->back();
    }
}
