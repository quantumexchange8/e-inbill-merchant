<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Subscription extends Model
{
    use HasFactory;

    // late_renewal_id is late payment charge id

    protected $fillable = [
        'name',
        'quota',
        'description',
        'renewal_term',
        'late_renewal_id',
        'status',
    ];

    public function terms(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(SubscriptionTerm::class, 'subscription_id', 'id');
    }

    public function termsUnit(): \Illuminate\Database\Eloquent\Relations\hasMany
    {

        $merchant = Auth::user()->merchant_id;
        $subscriber = Subscriber::where('merchant_id', $merchant)->first();
        $subscription_term = SubscriptionTerm::where('subscription_id', $subscriber->subscription_term_id)->first();

        return $this->hasMany(SubscriptionTerm::class, 'subscription_id', 'id')->where('unit_type', $subscription_term->unit_type);
    }

    public function late_renewal(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(LateChargesSetting::class, 'late_renewal_id', 'id');
    }

    public function subscribers(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(Subscriber::class, 'id', 'subscription_id')->where('merchant_id', Auth::user()->merchant_id);
    }
}
