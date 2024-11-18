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
        'refund_amount',
        'refund_status',
        'cash_management',
        'discount_id',
        'discount_amount',
        'total_grand_amount',
    ];

    public function transaction_details(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id', 'id');
    }

    public function refund_details(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(OrderRefund::class, 'transaction_id', 'id');
    }
}
