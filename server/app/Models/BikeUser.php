<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BikeUser extends Pivot
{
    use HasFactory;

    protected $table = 'bike_users';

    protected $fillable = [
        'bike_id',
        'user_id',
        'starting_parking_lot_id',
        'ending_parking_lot_id',
        'starts_at',
        'ends_at',
    ];

    /**
     * Get the bike that owns the BikeUser
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bike(): BelongsTo
    {
        return $this->belongsTo(Bike::class);
    }

    /**
     * Get the user that owns the BikeUser
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function duration()
    {
        return Carbon::parse($this->ends_at)->diffInMinutes(Carbon::parse($this->starts_at));
    }
}
