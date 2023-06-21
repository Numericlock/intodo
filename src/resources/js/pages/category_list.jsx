import { React, useState, useEffect } from 'react';
import CategoryTile from '../components/category_tile';
import NewCategoryTile from '../components/new_category_tile';

function CategoryList() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios.get(`/api/category`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then(res => {
      if(res.data.status === 200){

        setCategories(res.data.categories);
      }
    });
  }, []);

  const addCategoryTile = (category) => {
    setCategories((prevState) => ([ ...prevState, {
      "id": category.id,
      "name": category.name,
      "base_64_image": category.base_64_image,
    }]));
  };

  const categoriesData = [];

  for(var i in categories){
    categoriesData.push(<CategoryTile to={categories[i].id + '/task'} name={categories[i].name} image={categories[i].base_64_image} key={i}></CategoryTile>);
  }

  return (
    <div>
      <h2>Categories</h2>
      <div className='grid gap-2 grid-cols-2'>
        {categoriesData}
        <NewCategoryTile addCategoryTile={addCategoryTile}/>
      </div>
    </div>
  );
}

export default CategoryList;
