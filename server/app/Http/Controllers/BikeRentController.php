<?php

namespace App\Http\Controllers;

use App\Jobs\RemoveBikeReservationJob;
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

        // Check if the user has an active subscription
        if(! $user->hasActiveSubscription()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no active subscription',
            ], 409);
        }

        // Check if the bike is already allocated
        if(BikeUser::where('bike_id', '=', $bike->id)->where('ends_at', '=', null)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bike already rented',
            ], 409);
        }

        if($user->hasReservation()) {
            // Get reserved bike for the user and remove reservation
            $reservedBike = $user->getReservedBike();

            $user->rent($reservedBike);
            $reservedBike->removeReservation();

        } else {
            // Fuction that allocates bike to the user
            $user->rent($bike);
        }
    
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

        // Check if the user has an active subscription
        if(! $user->hasActiveSubscription()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no active subscription',
            ], 409);
        }

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

        if($user->hasDestionationReservation() && $user->parkingLot->id == $destinationParkingLot->id) {
            // Get reserved parking lot for the user and remove reservation
            $reservedParkingLot = $user->parkingLot;

            $user->finishRide($reservedParkingLot, false);
            $user->removeLocationReservation();

            return response()->json([
                'status' => 'success',
                'message' => 'Bike returned successfully',
            ], 201);
        }

       if($user->hasDestionationReservation() && $user->parkingLot->id != $destinationParkingLot->id) {
            // Get reserved parking lot for the user and remove reservation
            $reservedParkingLot = $user->parkingLot;
            $reservedParkingLot->returnBikeSpace();

            $user->finishRide($destinationParkingLot, true);
            $user->removeLocationReservation();

            return response()->json([
                'status' => 'success',
                'message' => 'Bike returned successfully',
            ], 201);
        }

        // If the user has no reservation, return the bike to the closest parking lot
        $user->finishRide($destinationParkingLot, true);

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

    public function reserve(Request $request, ParkingLot $parkingLot)
    {
        $user = $request->user();

        // Check if the user has an active subscription
        if(! $user->hasActiveSubscription()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no active subscription',
            ], 409);
        }

         // Check if the user has a bike allocated
        if($user->bikeUsers()->where('ends_at', '=', null)->exists() || $user->hasReservation()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User already has bike rented',
            ], 409);
        }

        $bike = Bike::where('parking_lot_id', '=', $parkingLot->id)->first();

        if(! $bike) {
            return response()->json([
                'status' => 'error',
                'message' => 'No bikes available',
            ], 409);
        }

        // Function that reserves the bike
        $user->reserve($bike);

        // call job to remove reservation after 15 minute
        RemoveBikeReservationJob::dispatch($bike)
            ->delay(now()->addMinutes(15));

        return response()->json([
            'status' => 'success',
            'bikeCode' => $bike->code,
            'message' => 'Bike reserved successfully',
        ], 201);
    }

}
