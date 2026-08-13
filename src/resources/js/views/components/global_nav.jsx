import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GlobalNav() {
  const navigate = useNavigate();

  // 現在ログインしているか判定
  const isAuthenticated = !!localStorage.getItem('auth_token');

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        navigate('/login');
      }
    }).catch(err => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_name');
      navigate('/login');
    });
  }

  // ログインしていない時はナビゲーション自体をレンダリングしない（非表示）
  if (!isAuthenticated) {
    return null;
  }

  // ログイン時のみ、右上にフローティングするログアウトボタンを表示
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={logoutSubmit}
        className="flex items-center gap-2 px-5 py-2.5 bg-white/40 hover:bg-red-400/90 hover:text-white text-gray-700 backdrop-blur-md border border-white/40 shadow-lg rounded-full transition-all duration-300 font-semibold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Logout
      </button>
    </div>
  )
}

export default GlobalNav;
