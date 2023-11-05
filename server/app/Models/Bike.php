<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bike extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'code',
        'parking_lot_id',
        'user_id',
    ];

    /**
     * The users that belong to the Bike
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(BikeUser::class);
    }

    /**
     * Get the parkingLog that owns the Bike
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parkingLot(): BelongsTo
    {
        return $this->belongsTo(ParkingLot::class);
    }

    /**
     * Remove reservation for the bike
     */
    public function removeReservation() 
    {
        return $this->update([
            'user_id' => null,
        ]);
    }
}
