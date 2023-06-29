<?php

namespace App\Http\Controllers\Api;

use App\Models\TaskCategory;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
	private $category;

	public function __construct()
	{
		$this->category = new TaskCategory();
	}

	public function index()
	{
		// カテゴリーを取得
		$categories = $this->category->getCategories(Auth::id());

		return response()->json([
			'status' => 200,
			'categories' => $categories,
		]);
	}

	public function store(CategoryRequest $request)
	{
		// 画像を保存
		$dir = 'category/';
		$imagePath = null;
		if ($request->hasfile('image')) {
			$imagePath = $dir . basename($request->file('image')->store($dir));
		}

		// カテゴリーを登録
		$category = $this->category->insertCategory(Auth::id(), $request->name, $imagePath);

		return response()->json([
			'status' => 200,
			'category' => $category,
			'message' => 'Stored Successfully',
		]);
	}
}
