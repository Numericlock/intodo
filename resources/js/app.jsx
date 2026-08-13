import "./bootstrap";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import "../css/app.css";
import "../css/mantineBase.css";
import { store } from './state/store';
import CategoryList from './views/pages/category_list';
import TaskList from './views/pages/task_list';
import Login from './views/pages/login';
import Register from "./views/pages/register";
import GlobalNav from "./views/components/global_nav";

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

// 1. 未ログイン時のみアクセス可能なルート（ログイン済みの場合は /category へ）
const GuestRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  if (isAuthenticated) {
    return <Navigate to="/category" replace />;
  }
  return children;
};

// 2. ログイン必須のルート（未ログインの場合は /login へ）
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Provider store={store}>
        <MantineProvider
          theme={{
            components: {
              Modal: {
                styles: {
                  header: {
                    background: 'transparent',
                  },
                  close: {
                    color: 'black',
                    transitionDuration: '0.5s',
                    '&:hover': {
                      color: 'black',
                      backgroundColor: 'transparent',
                      transform: 'scale(1.5, 1.5)',
                      transitionDuration: '0.5s',
                    },
                  },
                  content: {
                    background: 'rgba( 255, 255, 255, 0.45 )',
                    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    backdropFilter: 'blur( 1px )',
                    webkitBackdropFilter: 'blur( 1px )',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                  },
                },
              },
            },
          }}
        >
          <BrowserRouter>
            <GlobalNav />
            <div className="flex items-center bg-gradient-to-br from-[#C6FFDD] via-[#FBD786] to-[#f7797d] h-screen">
              <div className="m-auto max-h-screen min-w-[420px] max-w-4xl p-6 glass-white rounded-lg">
                <Routes>
                  {/* --- 未ログイン時のみ表示する画面 --- */}
                  <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                  <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

                  {/* --- ログイン必須の画面 --- */}
                  <Route path="/task/index" element={<PrivateRoute><TaskList /></PrivateRoute>} />
                  <Route path="/category" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
                  <Route path="/category/:categoryId/task" element={<PrivateRoute><TaskList /></PrivateRoute>} />

                  {/* --- 存在しないURL（ルート等）にアクセスされた場合 --- */}
                  <Route path="*" element={<Navigate to="/category" replace />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </MantineProvider>
      </Provider>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
