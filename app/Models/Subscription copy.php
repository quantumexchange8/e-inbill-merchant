<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function late_renewal(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(LateChargesSetting::class, 'late_renewal_id', 'id');
    }
}
