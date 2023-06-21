<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
    ];

    protected $appends = ['draggable', 'completed'];


    /**
     * Undocumented function
     *
     * @return void
     */
    public function getDraggableAttribute()
    {
        return $this->is_draggable;
    }

    public function getCompletedAttribute()
    {
        return $this->is_completed;
    }
}
