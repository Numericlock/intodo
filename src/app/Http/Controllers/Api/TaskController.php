<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\DoneTaskRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
	private $task, $category;

	public function __construct()
	{
		$this->task = new Task();
		$this->category = new TaskCategory();
	}

	public function index(Request $request)
	{
		// タスクを取得
		$tasks = $this->task->getCategoryTasks(Auth::id(), $request->category_id);

		return response()->json([
			'status' => 200,
			'tasks' => $tasks,
		]);
	}

	public function store(TaskRequest $request)
	{
		$parentId = (int) $request->parent_id === 0 ? null : (int) $request->parent_id;
		$task = $this->task->insertTask(Auth::id(), $request->category_id, $request->text, $parentId);

		return response()->json([
			'status' => 200,
			'task' => $task,
		]);
	}

	public function done(DoneTaskRequest $request)
	{
		// タスクの完了を更新
		$task = $this->task->doneTask($request->id, (bool) $request->is_done);

		return response()->json([
			'status' => 200,
			'task' => $task,
		]);
	}

	public function delete(Request $request)
	{
		// タスクを削除
		$deletedTaskIdList = $this->task->deleteTask($request->id);

		return response()->json([
			'status' => 200,
			'id_list' => $deletedTaskIdList,
		]);
	}
}
