import {Link, useNavigate} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/category">
        <span>category</span>
      </Link>
    </div>
  );
}

export default Home;
