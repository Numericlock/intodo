import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import CategoryTile from '../components/category_tile';
import Paginator from '../components/Paginator';
import NewCategoryTile from '../components/new_category_tile';
import { getCategories } from '../../state/reducks/categories/slices';

function CategoryList() {
  const [startNumber, setStartNumber] = useState(0);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const page = Number(query.get('page')) ?? 1;

  const categories = useSelector((state) => state.categories.list);
  console.log(categories);
  const pageItemNumber = 3;

  useEffect(() => {
    if (categories != []) {
      dispatch(getCategories());
    }
  }, []);

  const categoriesData = [];

  if (categories.length) {
    for (var i = 0; i < pageItemNumber; i++) {
      const index = startNumber + i;

      // 存在しない要素の場合
      console.log(categories.includes(index));
      const category = categories[index];
      if (!category) {
        console.log('index');
        console.log(index);
        break;
      }

      categoriesData.push(<CategoryTile to={category.id + '/task'} name={category.name} image={category.base_64_image} key={index}></CategoryTile>);
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <div className='grid gap-2 grid-cols-2'>
        {categoriesData}
        <NewCategoryTile/>
      </div>
      <Paginator
        dataCounts={categories.length}
        setStartNumber={setStartNumber}
        pageItems={pageItemNumber}
        currentPage={page}
      />
    </div>
  );
}

export default CategoryList;
