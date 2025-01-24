<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicySetting extends Model
{
    use HasFactory;

    public function lateChargeSetting(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(LateChargesSetting::class, 'policy_id', 'id');
    }
}
