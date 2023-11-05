<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'Obican plan',
            'description' => 'Ovo je opis obicnog plana',
            'minutes' => '300', // 5 sati
            'price' => '750' // 150 dinara po satu
        ]);

        Plan::create([
            'name' => 'Bolji plan',
            'description' => 'Ovo je opis boljeg plana',
            'minutes' => '600', // 10 sati
            'price' => '1300' // 130 dinara po satu
        ]);

        Plan::create([
            'name' => 'Jos bolji plan',
            'description' => 'Ovo je opis jos boljeg plana',
            'minutes' => '1800', // 30 sati
            'price' => '2400' // 80 dinara po satu
        ]);
    }
}
