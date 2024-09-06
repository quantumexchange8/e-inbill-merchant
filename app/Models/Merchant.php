<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_name',
        'registration_no',
        'classification_id',
        'tin_no',
        'irbm_client_id',
        'irbm_client_key',
        'sales_tax',
        'service_tax',
        'sst_effective_data',
        'address',
        'address_2',
        'postcode',
        'area',
        'state',
        'phone',
        'merchant_email',
    ];

    public function classification(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Classification::class, 'classification_id', 'id');
    }
}
