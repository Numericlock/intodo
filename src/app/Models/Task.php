<?php
namespace App\Models;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

use App\Casts\NullCast;

class Task extends Model
{
  use HasFactory;
  use HasRecursiveRelationships;

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

  public function recursiveTask()
  {
      return $this->hasManyOfDescendantsAndSelf(Task::class);
  }

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

      // ToDo を登録
      Log::debug($position + 1);
      Log::debug($userId);
      $task = $this->create([
        'user_id' => $userId,
        'category_id' => $categoryId,
        'parent_id' => $parentId,
        'position' => $position + 1,
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
   * @return Collection
   */
  public function doneTask(int $taskId, bool $isDone): Collection
  {
		try {
      if ($isDone) {
        // タスクを完了させる場合
        $updateTasks = Task::find($taskId)->descendants->pluck('id');
        $updateTasks->add($taskId);
      } else {
        $updateTasks = [$taskId];
      }

      Task::whereIn('id', $updateTasks)->update(['is_done' => $isDone]);

			$tasks = Task::select(
        'id',
        'parent_id as parent',
        'text',
        'is_done as done',
        'is_droppable as droppable',
      )->whereIn('id', $updateTasks)->get();
      Log::debug($tasks);
		} catch (\Exception $e) {
			report($e);
		}

    return $tasks;
  }

  /**
   * タスクを削除する
   *
   * @param integer $taskId
   * @return SupportCollection
   */
  public function deleteTask(int $taskId): SupportCollection
  {
    try {
      // 子孫を取得
      $deleteTasks = Task::find($taskId)->descendants->pluck('id');
      $deleteTasks->add($taskId);

      Task::whereIn('id', $deleteTasks)->delete();
    } catch (\Exception $e) {
      report($e);
    }
    Log::debug($deleteTasks);

    return $deleteTasks;
  }

}
