<?php
namespace App\Models;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Casts\NullCast;

class Task extends Model
{
  use HasFactory;

  protected $guarded = [
    'id',
    'created_at',
  ];

  protected $casts = [
    'parent_id' => NullCast::class,
    'parent' => NullCast::class,
    'is_droppable' => 'boolean',
    'droppable' => 'boolean',
    'is_done' => 'boolean',
    'done' => 'boolean',
  ];

  /**
   * 特定のカテゴリーのタスクを取得する
   *
   * @param int $userId
   * @param int $categoryId
   * @return Collection
   */
  public function getCategoryTasks(int $userId, int $categoryId): Collection
  {
    try {
      $tasks = $this->select(
        'id',
        'parent_id as parent',
        'text',
        'is_done as done',
        'is_droppable as droppable',
      )
      ->where('user_id', $userId)
      ->where('category_id', $categoryId)
      ->get();
    } catch (\Exception $e) {
      report($e);
    }

    return $tasks;
  }

  /**
   * タスクを追加する
   *
   * @param int $userId
   * @param int $categoryId
   * @param string $text
   * @param int|null $parentId
   * @return Array
   */
  public function insertTask(int $userId, int $categoryId, string $text, ?int $parentId): Array
  {
    try {
      // 親タスクを取得
      $parentTask = $this->where('id', $parentId)->first();
      $position = is_null($parentTask) ? 0 : $parentTask->position;
      Log::debug($parentTask);
      Log::debug($position);

      // ToDo を登録
      $task = $this->create([
        'user_id' => $userId,
        'category_id' => $categoryId,
        'parent_id' => $parentId,
        'position' => $position,
        'text' => $text,
        'is_droppable' => true,
        'is_done' => false,
      ]);
      Log::debug($task);
    } catch (\Exception $e) {
      report($e);
    }

    return [
      'id' => $task->id,
      'parent' => $task->parent_id ?? 0,
      'text' => $task->text,
      'done' => $task->is_done,
      'droppable' => $task->is_droppable,
    ];
  }

  /**
   * タスクの完了有無を更新する
   *
   * @param integer $taskId
   * @param boolean $isDone
   * @return Array
   */
  public function doneTask(int $taskId, bool $isDone): Array
  {
		try {
			Task::where('id', $taskId)->update(['is_done' => $isDone]);
			$task = Task::where('id', $taskId)->first();
		} catch (\Exception $e) {
			report($e);
		}

		$task = [
			'id' => $task->id,
			'parent' => $task->parent_id,
			'text' => $task->text,
			'done' => $task->is_done,
			'droppable' => $task->is_droppable,
		];

    return $task;
  }

  /**
   * タスクを削除する
   *
   * @param integer $taskId
   * @return integer
   */
  public function deleteTask(int $taskId): int
  {
    try {
      Task::where('id', $taskId)->delete();
    } catch (\Exception $e) {
      report($e);
    }

    return $taskId;
  }

  /**
   * タスクの子孫タスクを全て取得する
   *
   * @param integer $taskId
   * @return integer
   */
  public function getProgeny(int $taskId): int
  {
    try {
      Task::where('id', $taskId)->delete();
    } catch (\Exception $e) {
      report($e);
    }

    return $taskId;
  }
}
