<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [

    ];

    public function subscription(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(Subscription::class, 'subscription_id', 'id');
    }

    public function subscription_term(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(SubscriptionTerm::class, 'subscription_term_id', 'id');
    }
}
