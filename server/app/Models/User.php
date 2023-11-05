<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Subscription;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'parking_lot_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * The bikes that belong to the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function bikeUsers(): HasMany
    {
        return $this->hasMany(BikeUser::class,);
    }

    /**
     * Get the user that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the subcription associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Get the last created subscription associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function subscription(): HasOne
    {
        return $this->hasOne(Subscription::class)->whereNull('timestamp_end')->latest();
    }

    /**
     * Get the parkingLot that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parkingLot(): BelongsTo
    {
        return $this->belongsTo(ParkingLot::class);
    }

    public function rent(Bike $bike)
    {
        if($this->bikeUsers()->where('ends_at', '=', null)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bike already rented',
            ], 409);
        }

        try {
            $this->bikeUsers()->create([
                'bike_id' => $bike->id,
                'starting_parking_lot_id' => $bike->parking_lot_id,
                'starts_at' => Carbon::now()->toDateTime(),
            ]);
            
            $bike->parkingLot()->update([
                'free_spaces' => $bike->parkingLot->free_spaces + 1,
            ]);

            $bike->parking_lot_id = null;
            $bike->save();
        }
        catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot rent bike.',
            ], 409);
        }

        return true;
    }

    public function finishRide(ParkingLot $parkingLot, bool $decrementSpaces)
    {
        $bikeUser = $this->bikeUsers()->where('ends_at', '=', null)->first();

        if(! $bikeUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no bike rented',
            ], 409);
        }

        try {

            $bikeUser->ends_at = Carbon::now();
            $bikeUser->ending_parking_lot_id = $parkingLot->id;
            $bikeUser->save();
            
            if($decrementSpaces) {
                $parkingLot->update([
                    'free_spaces' => $parkingLot->free_spaces - 1,
                ]);
            }
            
            $bikeUser->bike->parking_lot_id = $parkingLot->id;
            $bikeUser->bike->save();

            $this->subscription()->update([
                'time_left' => $this->subscription->time_left - $bikeUser->duration(),
            ]);
        }
        catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot finish ride.',
            ], 409);
        }

        return true;
    }

    /**
     * Get the subscription associated with the User
     */
    public function hasActiveSubscription() 
    {
        return  $this->subscription()->exists();
    }

    /**
     * Check if user has active reservation
     */
    public function hasReservation()
    {
        return Bike::where('user_id', '=', $this->id)->exists();
    }

    /**
     * Reserve bike for the user
     */
    public function reserve(Bike $bike)
    {
        return $bike->update([
            'user_id' => $this->id,
        ]);
    }

    /**
     * Get reserved bike
     */
    public function getReservedBike()
    {
        return Bike::where('user_id', $this->id)->first();
    }

    /**
     * Check if user has active ride
     */
    public function hasActiveRide()
    {
        return $this->bikeUsers()->where('ends_at', '=', null)->exists();
    }

    /**
     * Get active ride
     */
    public function getActiveRide()
    {
        return $this->bikeUsers()->where('ends_at', '=', null)->first();
    }

    /**
     * Check if user has destination reservation
     */
    public function hasDestionationReservation()
    {
        return $this->parkingLot()->exists();
    }

    /**
     * Remove destination reservation
     */
    public function removeLocationReservation()
    {
        return $this->update([
            'parking_lot_id' => null,
        ]);
    }
}
