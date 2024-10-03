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

    public function item(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }

    public function transaction(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'id');
    }

    public function refundDetail(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(OrderRefundDetail::class, 'refund_id', 'id');
    }
}
