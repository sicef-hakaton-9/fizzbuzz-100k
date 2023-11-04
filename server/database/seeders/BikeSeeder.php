<?php

namespace Database\Seeders;

use App\Models\Bike;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bike::create([
            'id' => '1',
            'parking_lot_id' => '1',
            'code' => '123ab',
        ]);
        
        Bike::create([
            'id' => '2',
            'parking_lot_id' => '2',
            'code' => '456cd',
        ]);
        
        Bike::create([
            'id' => '3',
            'parking_lot_id' => '3',
            'code' => '789ef',
        ]);
    }
}
