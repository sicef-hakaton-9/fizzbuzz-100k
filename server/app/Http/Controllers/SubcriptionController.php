<?php

namespace App\Http\Controllers;

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

    public function subscribe($id) {

    }
}
