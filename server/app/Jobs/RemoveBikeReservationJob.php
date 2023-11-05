<?php

namespace App\Jobs;

use App\Models\Bike;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RemoveBikeReservationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Bike $bike;
    
    /**
     * Create a new job instance.
     */
    public function __construct(Bike $bike)
    {
        $this->bike = $bike;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if($this->bike->user_id !== null) {
            $this->bike->removeReservation();
        }
    }
}
