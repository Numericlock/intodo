import React from 'react';
import {Link} from "react-router-dom";
import CategoryTile from '../components/category_tile';
import NewCategoryTile from '../components/new_category_tile';

function CategoryList() {
  var categories = []
  var data = [
    { route: "/", name: 'Motorcycle', num: 0},
    { route: "about", name: 'DIY', num: 0 },
    { route: "about", name: 'Plants', num: 0 },
    { route: "about", name: 'Camp', num: 0 },
  ]

  for(var i in data){
    categories.push(<CategoryTile to={data[i].route} name={data[i].name} num={data[i].num} key={i}></CategoryTile>);
  }

  return (
    <div>
      <h2>Categories</h2>
      <div className='grid gap-2 grid-cols-2'>
        {categories}
        <NewCategoryTile/>
      </div>
    </div>
  );
}

export default CategoryList;
