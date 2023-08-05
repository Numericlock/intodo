import { React, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";
import CategoryTile from '../components/category_tile';
import Paginator from '../components/Paginator';
import NewCategoryTile from '../components/new_category_tile';

function CategoryList() {
  const query = new URLSearchParams(useLocation().search);
  const initialPage = () => {
    const pageParam = Number(query.get('page')) ?? 0;
    if (pageParam !== 0) {
      pageParam - 1;
    } 
    
    return pageParam;
  }

  const [startNumber, setStartNumber] = useState(initialPage);
  const { isLoading, data, isError, error } = useQuery({ queryKey: ['categories'], queryFn: () => {
    return axios.get(`/api/category`, {}, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
    });
  }})

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // １ページに表示するアイテム数
  const pageItemNumber = 3;
  // カテゴリーリストのデータ
  const categories = data.data.categories;
  // カテゴリータイルの要素
  const categoryElements = [];

  if (categories.length) {
    for (var i = 0; i < pageItemNumber; i++) {
      const index = startNumber * pageItemNumber + i;

      // 存在しない要素の場合
      const category = categories[index];
      if (!category) {
        break;
      }

      categoryElements.push(
        <CategoryTile to={category.id + '/task'} num={category.tasks_count} name={category.name}
          image={category.base_64_image} key={index}>
        </CategoryTile>
      );
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <div className='grid gap-2 grid-cols-2'>
        {categoryElements}
        <NewCategoryTile/>
      </div>
      <Paginator
        dataCounts={categories.length}
        setStartNumber={setStartNumber}
        pageItems={pageItemNumber}
        currentPage={startNumber}
      />
    </div>
  );
}

export default CategoryList;
