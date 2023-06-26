<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
    ];

    protected $casts = [
        'is_droppable' => 'boolean',
        'is_done' => 'boolean',
        'droppable' => 'boolean',
        'done' => 'boolean',
    ];
}
