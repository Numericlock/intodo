<?php

namespace App\Models;

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


    /**
     * Undocumented function
     *
     * @return void
     */
    public function getBase64ImageAttribute()
    {
        if (is_null($this->image_path)) {
            return null;
        }

        $file = Storage::get($this->image_path);

        return 'data:image/png;base64, ' . base64_encode($file);
    }
}
