<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class RewardUsersRideTime implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $users = User::whereHas('subscription')
            ->with(['bikeUsers' => function ($query) {
                $query->where('created_at', '>', Carbon::parse(now()->startOfMonth()->toDateTimeString()));
            }])->get();

        foreach($users as $user) {
            $totalTime = $user->bikeUsers->sum(function($bikeUser) {
                return Carbon::parse($bikeUser->ends_at)->diffInMinutes(Carbon::parse($bikeUser->starts_at));
            });
            
            $user->setAttribute('total_time', $totalTime);
        }

        foreach($users as $user) {
            switch($user->total_time) {
                case $user->total_time > 60 * 10:
                    $additionalTime = 30;
                    break;
                case $user->total_time > 60 * 20:
                    $additionalTime = 120;
                    break;
                case $user->total_time > 60 * 25:
                    $additionalTime = 180;
                    break;
                case $user->total_time > 60 * 30:
                    $additionalTime = 240;
                    break;
                default:
                    $additionalTime = 0; break;
            }

            $user->subscription()->update([
                'time_left' => $user->subscription->time_left + $additionalTime,
            ]);
        }
    }
}
