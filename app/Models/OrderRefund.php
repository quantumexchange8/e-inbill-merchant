<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderRefund extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'user_id',
        'refund_no',
        'item_id',
        'item_qty',
        'amount',
    ];
}
