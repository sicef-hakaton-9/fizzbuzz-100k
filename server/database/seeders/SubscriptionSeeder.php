<?php

namespace Database\Seeders;

use App\Models\Subscription;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subscription::create([
            'user_id' => 1,
            'plan_id' => 2,
            'timestamp_start' => '2024-1-1 16:00:00',
            'timestamp_end' => '2024-2-1 16:00:00',
            'time_left' => '30'
        ]);

    }
}
