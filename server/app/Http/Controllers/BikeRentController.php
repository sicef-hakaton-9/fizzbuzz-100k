<?php

namespace App\Http\Controllers;

use App\Models\Bike;
use App\Models\BikeUser;
use App\Models\ParkingLot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BikeRentController extends Controller
{
    public function rent(Request $request, Bike $bike)
    {
        $user = $request->user();

        // Check if the bike is already allocated
        if(BikeUser::where('bike_id', '=', $bike->id)->where('ends_at', '=', null)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bike already rented',
            ], 409);
        }

        // Fuction that allocates bike to the user
        $user->rent($bike);

        // send microcontroller command to unlock the bike

        return response()->json([
            'status' => 'success',
            'message' => 'Bike rented successfully',
        ], 201);
    }

    public function finish(Request $request) 
    {
        $user = $request->user();

        $request = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        // Check if the user has a bike allocated
        if(! $user->bikeUsers()->where('ends_at', '=', null)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no bike rented',
            ], 409);
        }

        // Find the closest parking lot
        $destinationParkingLot = $this->findClosestParkingLot($request['latitude'], $request['longitude']);

        if(! $destinationParkingLot || $destinationParkingLot->free_spaces == 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'No parking lots available',
            ], 409);
        }

        // Function that finishes the rent
        $user->finishRide($destinationParkingLot);

        // send microcontroller command to lock the bike
        
        return response()->json([
            'status' => 'success',
            'message' => 'Bike returned successfully',
        ], 201);
    }

    public function findClosestParkingLot($requestLatitude, $requestLongitude)
    {
        $closestParkingLot = DB::table('parking_lots')
            ->select(DB::raw('*,
                (6371 * acos(cos(radians(' . $requestLatitude . ')) 
                * cos(radians(latitude)) 
                * cos(radians(longitude) 
                - radians(' . $requestLongitude . ')) 
                + sin(radians(' . $requestLatitude . ')) 
                * sin(radians(latitude)))) AS distance'))
            ->orderBy('distance', 'asc')
            ->first();

        return ParkingLot::find($closestParkingLot->id);
    }

}
