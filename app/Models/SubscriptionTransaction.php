<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'invoice_no',
        'amount',
        'total_amount',
        'status',
        'remark',
    ];
    
}
