import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryTile from '../components/category_tile';
import NewCategoryTile from '../components/new_category_tile';
import { getCategories } from '../../state/reducks/categories/slices';

function CategoryList() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.list);
  console.log(categories);

  useEffect(() => {
    if (categories != []) {
      dispatch(getCategories());
    }
  }, []);

  const categoriesData = [];

  for(var i in categories){
    categoriesData.push(<CategoryTile to={categories[i].id + '/task'} name={categories[i].name} image={categories[i].base_64_image} key={i}></CategoryTile>);
  }

  return (
    <div>
      <h2>Categories</h2>
      <div className='grid gap-2 grid-cols-2'>
        {categoriesData}
        <NewCategoryTile/>
      </div>
    </div>
  );
}

export default CategoryList;
