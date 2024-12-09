<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// NOTE
// invoice_status: 
    // 0: draft
    // 1: submitted
    // 2: archive
    // 3: deleted

// submitted status:
    // pending: after submitted pending validate
    // validate: after submitted and e-invoice approved
    // dispute: after submitted and cancelled by user
    // rejected: after submit fail to validate invoice

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'merchant_id',
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
        'handle_by',
        'invoice_status',
    ];

    public function transaction_details(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id', 'id');
    }

    public function refund_details(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(OrderRefund::class, 'transaction_id', 'id');
    }

    public function shiftSales(): \Illuminate\Database\Eloquent\Relations\belongsTo
    {
        return $this->belongsTo(ShiftTransaction::class, 'shift_transaction_id', 'id');
    }

    public function consolidateSales(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(ConsolidateInvoice::class, 'consolidate_id', 'id');
    }
}
