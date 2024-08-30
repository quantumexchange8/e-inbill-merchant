<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'shift_transaction_id',
        'user_id',
        'receipt_no',
        'total_amount',
        'payment_type',
        'paid_in',
        'paid_out',
        'transaction_type',
        'transaction_date',
        'remark',
    ];
}
