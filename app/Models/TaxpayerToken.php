<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxpayerToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'token',
        'expired_at',
    ];
}
