<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderRefundDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'refund_id',
        'item_id',
        'refund_qty',
        'amount',
    ];
}
