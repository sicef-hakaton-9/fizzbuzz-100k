<?php

namespace Database\Seeders;

use App\Models\ParkingLot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParkingLotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ParkingLot::create([
            'name' => 'Elektronski fakultet',
            'total_spaces' => 10,
            'free_spaces' => 9,
            'longitude' => '21.89241',
            'latitude' => '43.33134',
        ]);

        ParkingLot::create([
            'name' => 'Trg kralja Milana',
            'total_spaces' => 10,
            'free_spaces' => 9,
            'longitude' => '21.89578',
            'latitude' => '43.32145',
        ]);
        
        ParkingLot::create([
            'name' => 'Trg republike',
            'total_spaces' => 10,
            'free_spaces' => 9,
            'longitude' => '21.89667', 
            'latitude' => '43.31787',
        ]);
    }
}
