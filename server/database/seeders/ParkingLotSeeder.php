<?php

namespace Database\Seeders;

use App\Models\ParkingLot;
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

        ParkingLot::create([
            'name' => 'Železnička stanica',
            'total_spaces' => 10,
            'free_spaces' => 9,
            'longitude' => '21.87744', 
            'latitude' => '43.31617',
        ]);

        ParkingLot::create([
            'name' => 'Delta Planet Niš',
            'total_spaces' => 10,
            'free_spaces' => 9,
            'longitude' => '21.91704', 
            'latitude' => '43.324370',
        ]);

        ParkingLot::create([
            'name' => 'Aerodrom Konstantin Veliki',
            'total_spaces' => 10,
            'free_spaces' => 9,
            'longitude' => '21.866191', 
            'latitude' => '43.338099',
        ]);
    }
}
