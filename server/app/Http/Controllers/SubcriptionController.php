<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Plan;

class SubcriptionController extends Controller
{
    public function getSubscriptionPlans() {
        $subscriptonPlans = Plan::all();

        return response()->json([
            'status' => 'success',
            'subscriptionPlans' => $subscriptonPlans
        ]);
    }

    public function subscribe(Request $request) {
        $plan_id = $request->plan_id;
        $user = $request->user();

        $plan = Plan::find($plan_id);
        $time = (int)$plan->minutes; 

        $getTimeLeft = Subscription::where('user_id', $user->id)
            ->orderBy('created_at')
            ->first(['time_left', 'id']);

        if(isset($getTimeLeft)) {
            $subscripton = Subscription::find($getTimeLeft->id);
            $subscripton->timestamp_end = Carbon::now()->toDateTimeString();
            $subscripton->save();
            $subscripton->delete();

            $time += $getTimeLeft->time_left;
        }

        $subscripton_id = Subscription::insertGetId([
            'user_id' => $user->id,
            'plan_id' => $plan_id,
            'time_left' => $time,
            'timestamp_start' => Carbon::now()->toDateTimeString(),
            'timestamp_end' => null,
            'created_at' => Carbon::now()->toDateTimeString(),
            'updated_at' => Carbon::now()->toDateTimeString(),
        ]);

        return response()->json([
            'status' => 'success',
            'subscriptionId' => $subscripton_id
        ]);
    }
}
