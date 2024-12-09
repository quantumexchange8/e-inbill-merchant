<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsolidateInvoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'merchant_id',
        'consolidate_id',
        'transaction_id',
        'total_amount',
        'remark',
    ];

    public function transaction(): \Illuminate\Database\Eloquent\Relations\belongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'id');
    }
}
