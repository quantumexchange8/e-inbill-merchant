<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'user_id',
        'shift_no',
        'starting_cash',
        'cash_amount',
        'cash_refund',
        'paid_in',
        'paid_out',
        'expected_cash_amount',
        'gross_sales',
        'total_refund',
        'total_discount',
        'net_cash',
        'net_card',
        'net_sales',
        'shift_opened',
        'shift_closed',
        'status',
        'actual_cash',
        'difference',
    ];

    public function transaction(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(Transaction::class, 'shift_transaction_id', 'id')->where('transaction_type', 'shift');
    }
}
