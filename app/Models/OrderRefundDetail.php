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

    public function item(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }
}
