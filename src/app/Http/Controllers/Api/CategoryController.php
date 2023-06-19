<?php

namespace App\Http\Controllers\Api;

use App\Models\TaskCategory;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
	public function index(){
		Log::debug(Auth::id());
		// カテゴリーを取得
		$categories = TaskCategory::where('user_id', Auth::id())->get();

		return response()->json([
			'status' => 200,
			'categories' => $categories,
			'message' => 'got Successfully',
		]);
	}

	public function store(CategoryRequest $request){
		// 画像を保存
		$dir = 'category/';
		$imagePath = null;
		if ($request->hasfile('image')) {
			'public/' . $dir . basename($request->file('image')->store($dir));
		}

		// カテゴリーを登録
		$category = TaskCategory::create([
			'user_id' => Auth::id(),
			'name' => $request->name,
			'image_path' => $dir . basename($request->file('image')->store($dir)),
		]);

		return response()->json([
			'status' => 200,
			'id' => $category->id,
			'name' => $category->name,
			'imagePath' => $category->image_path,
			'message' => 'Stored Successfully',
		]);
	}
}
