<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;

class LeaderboardController extends Controller
{
    public function index()
    {   
        $users = User::with(['bikeUsers' => function ($query) {
            $query->where('created_at', '>', Carbon::parse(now()->startOfMonth()->toDateTimeString()));
        }])->get();

        foreach($users as $user) {
            $totalTime = $user->bikeUsers->sum(function($bikeUser) {
                return Carbon::parse($bikeUser->ends_at)->diffInMinutes(Carbon::parse($bikeUser->starts_at));
            });
            
            $user->setAttribute('total_time', $totalTime);
        }

        $users = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'total_time' => $user->total_time,
                'hours' => floor($user->total_time / 60),
                'minutes' => $user->total_time % 60,
                'hours_to_add' => $this->hoursToAdd($user->total_time),
            ];
        });

        return response()->json([
            'status' => 'success',
            'users' => collect($users)->sortByDesc('total_time'),
        ]);
    }

    private function hoursToAdd($totalTime) {
        $hoursToAdd = 0;

        switch($totalTime) {
            case $totalTime > 60 * 30:
                $hoursToAdd = '4h';
                break;
            case $totalTime > 60 * 25:
                $hoursToAdd = '3h';
                break;
            case $totalTime > 60 * 20:
                $hoursToAdd = '2h';
                break;
            case $totalTime > 60 * 10:
                $hoursToAdd = '30 min';
                break;
        }

        return $hoursToAdd;
    }
}
