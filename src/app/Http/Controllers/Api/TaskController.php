<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\DoneTaskRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
	public function index(Request $request)
	{
		// カテゴリーを取得
		$tasks = Task::select(
                'id',
                'parent_id as parent',
                'text',
                'is_done as done',
                'is_droppable as droppable',
            )
            ->where('user_id', Auth::id())
            ->where('category_id', $request->category_id)
            ->get();



            Log::debug($tasks);

		return response()->json([
			'status' => 200,
			'tasks' => $tasks,
			'message' => 'got Successfully',
		]);
	}

	public function store(TaskRequest $request)
	{
		$insertData = [
				'user_id' => Auth::id(),
				'category_id' => $request->category_id,
				'text' => $request->text,
				'is_droppable' => true,
				'is_done' => false,
		];

		if ($request->has('parent_id')) {
				$insertData += ['parent_id' => $request->parent_id];
		}

		// ToDo を登録
		$task = Task::create($insertData);
		$task = [
			'id' => $task->id,
			'parent' => (int) $task->parent_id,
			'text' => $task->text,
			'done' => $task->is_done,
			'droppable' => $task->is_droppable,
		];

		return response()->json([
			'status' => 200,
			'task' => $task,
			'message' => 'Stored Successfully',
		]);
	}

	public function done(DoneTaskRequest $request)
	{
		Log::debug('(int) $request->is_done');
		Log::debug((int) $request->is_done);
		Log::debug(gettype($request->is_done));
		Log::debug($request->is_done);
		// ToDo を更新
		try {
			Task::where('id', $request->id)->update(['is_done' => (bool) $request->is_done]);
			$task = Task::where('id', $request->id)->first();
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
		Log::debug($task);

		return response()->json([
			'status' => 200,
			'task' => $task,
			'message' => 'Stored Successfully',
		]);
	}
}
