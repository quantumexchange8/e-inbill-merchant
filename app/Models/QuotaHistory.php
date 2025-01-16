<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotaHistory extends Model
{
    use HasFactory;

    
    public function quota_setting(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(QuotaSetting::class, 'quota_id', 'id');
    }
}
