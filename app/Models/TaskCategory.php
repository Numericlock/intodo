<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Collection;
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

    protected $appends = [
        'base_64_image',
        //'count_is_open_task',
    ];

    /**
     * カテゴリーに紐づくタスクを取得
     */
    public function tasks()
    {
        return $this->hasMany(Task::class, 'category_id');
    }

    /**
     * Base64 形式の画像を返す
     *
     * @return string|null
     */
    public function getBase64ImageAttribute(): ?String
    {
        if (is_null($this->image_path)) {
            return null;
        }

        $file = Storage::get($this->image_path);

        return 'data:image/png;base64, ' . base64_encode($file);
    }

    /**
     * カテゴリーリストを取得する
     *
     * @param int $userId
     * @return Collection
     */
    public function getCategories(int $userId): Collection
    {
        try {
            $categories = $this->where('user_id', $userId)->withCount('tasks')->get();
        } catch (\Exception $e) {
            report($e);
        }

        return $categories;
    }

    /**
     * 特定のカテゴリーを取得する
     *
     * @param int $categoryId
     * @return Collection
     */
    public function getCategory(int $categoryId): Collection
    {
        try {
            $category = $this->where('id', $categoryId)->first();
        } catch (\Exception $e) {
            report($e);
        }

        return $category;
    }

    /**
     * カテゴリーを追加する
     *
     * @param integer $userId
     * @param string $name
     * @param string|null $imagePath
     * @return TaskCategory
     */
    public function insertCategory(int $userId, string $name, ?string $imagePath): TaskCategory
    {
        try {
            $category = $this->create([
                'user_id' => $userId,
                'name' => $name,
                'image_path' => $imagePath,
            ]);
        } catch (\Exception $e) {
            report($e);
        }

        return $category;
    }
}
