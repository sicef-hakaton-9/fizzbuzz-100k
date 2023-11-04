<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
                'starts_at' => now(),
            ]);
            
            $bike->parkingLot()->update([
                'free_spaces' => $bike->parkingLot->free_spaces - 1,
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

    public function finishRide(ParkingLot $parkingLot)
    {
        $bikeUser = $this->bikeUsers()->where('ends_at', '=', null)->first();

        if(! $bikeUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no bike rented',
            ], 409);
        }

        try {
            $bikeUser->ends_at = now();
            $bikeUser->ending_parking_lot_id = $parkingLot->id;
            $bikeUser->save();
            
            $parkingLot->update([
                'free_spaces' => $parkingLot->free_spaces + 1,
            ]);
            
            $bikeUser->bike->parking_lot_id = $parkingLot->id;
            $bikeUser->bike->save();
        }
        catch(\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot finish ride.',
            ], 409);
        }

        return true;
    }
}
