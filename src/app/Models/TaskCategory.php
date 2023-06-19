<?php

namespace App\Models;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
        'created_at',
    ];

    protected $appends = ['base_64_image'];


    public function getBase64ImageAttribute()
    {
        $file = Storage::get($this->image_path);

        return 'data:image/png;base64, ' . base64_encode($file);
    }
}
