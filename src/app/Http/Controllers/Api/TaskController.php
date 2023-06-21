<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
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
                'is_completed as completed',
                'is_draggable as draggable',
            )
            ->where('user_id', Auth::id())
            ->where('category_id', $request->category_id)
            ->get();
        Log::debug(Auth::id());
        Log::debug($request->category_id);

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
        ];

        if ($request->has('parent_id')) {
            $insertData += ['parent_id' => $request->parent_id];
        }

		// ToDo を登録
		$task = Task::create($insertData);

		return response()->json([
			'status' => 200,
			'task' => $task,
			'message' => 'Stored Successfully',
		]);
	}
}
