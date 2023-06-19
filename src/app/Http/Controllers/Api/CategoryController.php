<?php

namespace App\Http\Controllers\Api;

use App\Models\TaskCategory;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
	public function store(CategoryRequest $request){
		// 画像を保存
		$dir = 'public/category/';
		$imagePath = null;
		if ($request->hasfile('image')) {
			$imagePath = $dir . basename($request->file('image')->store($dir));
		}

		// カテゴリーを登録
		$category = TaskCategory::create([
			'user_id' => Auth::id(),
			'name' => $request->name,
			'image_path' => $imagePath,
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
