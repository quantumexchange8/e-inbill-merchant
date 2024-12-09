<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'user_id',
        'invoice_no',
        'total_amount',
        'payment_type',
        'transaction_type',
        'transaction_date',
        'invoice_status',
        'remark',
    ];

    
}
