<?php

namespace App\Services;

use App\Models\RunningNumber;
use Illuminate\Support\Str;

class RunningNumberService
{
    public static function getID($type, $role = null): string
    {

        if ($role === 'admin') {
            $format = RunningNumber::where('type', $type)->where('role', 'admin')->first();
            $lastID =  $format['last_number'] + 1;
            $format->increment('last_number');
            $format->save();
            return $format['prefix'] . Str::padLeft($lastID, $format['digits'], "0");
        } else {
            
            if ($type === 'shift') {
                $format = RunningNumber::where('type', 'shift')->first();
                $lastID =  $format['last_number'] + 1;
                $format->increment('last_number');
                $format->save();

                return $lastID;
            } else {
                $format = RunningNumber::where('type', $type)->first();
                $lastID =  $format['last_number'] + 1;
                $format->increment('last_number');
                $format->save();
                return $format['prefix'] . Str::padLeft($lastID, $format['digits'], "0");
            }
        }
    }
}
