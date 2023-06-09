import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function GlobalNav () {

  const history = useNavigate();

  const logoutSubmit = (e) => {
    e.preventDefault();

  axios.post(`/api/logout`).then(res =>
    {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token', res.data.token);
        localStorage.removeItem('auth_name', res.data.username);
        history('/login');
        location.reload();
      }
    });
  }

  var AuthButtons = '';

  if (!localStorage.getItem('auth_token')){
    AuthButtons = (
      <>
        <li>
          <Link to="/register">
            <span>Register</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span>Login</span>
          </Link>
        </li>
      </>
    );
  } else {
    AuthButtons = (
      <li>
        <div onClick={logoutSubmit}>
          <span className="text-white">ログアウト</span>
        </div>
      </li>
    );
  }

  return(
    <ul>
      <li>
        <Link to="/">
          <span>Top</span>
        </Link>
      </li>
      <li>
        <Link to="/about">
          <span>About</span>
        </Link>
      </li>
      {AuthButtons}
    </ul>
  )
}

export default GlobalNav;
