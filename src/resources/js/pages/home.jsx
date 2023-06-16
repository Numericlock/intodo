import React from 'react';
import {Link} from "react-router-dom";

function Home() {
  return (
    <div>
      <h2 className="mx-11">Home?</h2>
      <Link to={'/task/category'} className="btn btn-primary">aboutへ遷移</Link>
    </div>
  );
}

export default Home;
