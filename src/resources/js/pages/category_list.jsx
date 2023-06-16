import React from 'react';
import {Link} from "react-router-dom";
import CategoryTile from '../components/category_tile';

function CategoryList() {
  var categories = []
  var data = [
    { route: "/", name: 'Motorcycle' },
    { route: "about", name: 'DIY' },
    { route: "about", name: 'Plants' },
    { route: "about", name: 'Camp' },
  ]

  for(var i in data){
    categories.push(<CategoryTile to={data[i].route} name={data[i].name} key={i}></CategoryTile>);
  }

  return (
    <div>
      <h2>カテゴリー</h2>
      <div className='grid gap-2 grid-cols-2'>
        {categories}
      </div>
      <Link to={'/'} className="btn btn-primary">homeへ遷移</Link>
    </div>
  );
}

export default CategoryList;
