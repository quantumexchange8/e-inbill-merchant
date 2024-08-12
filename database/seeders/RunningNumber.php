<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RunningNumber extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('running_numbers')->insert([
            'type' => 'merchant',
            'prefix' => 'MID',
            'digit' => '6',
            'last_number' => '0',
        ]);

        DB::table('running_numbers')->insert([
            'type' => 'shift',
            'prefix' => 'shift',
            'digit' => '8',
            'last_number' => '0',
        ]);
    }
}
