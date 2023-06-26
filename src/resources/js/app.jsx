import "./bootstrap";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import "../css/app.css";
import "../css/mantineBase.css";
import { store } from './state/store';
import Home from './views/pages/home';
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

/**
 * ログイン済みならば true,そうでないならば false を返す関数
 * @return {Promise<boolean>}
 */
const getIsAuthenticated = async () => {
  try{
    // API にアクセスして認証済みか確認するなど、何か認証を確認する適当な非同期処理
    const response = await BaseRepository.post('is-auth', {/** トークン等の認証状態を示すデータ */});

    return !!response.data.success;
  }catch(err){
    return false;
  }
};

/**
 * ログイン済みか否かをチェックするフック
 * @return {{isLoading: boolean, setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>, isAuthenticated: boolean}}
 */
const useAuthChecker = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  // アプリ（厳密にはこのフックを使っているコンポーネント）がマウントされた際に一度だけログイン済みか否かを確認
  React.useEffect( () => {
    getIsAuthenticated().then(auth => {
      // ログイン済みか否かの確認が終われば、それを state にセット
      setAuthenticated(auth);
      setLoading(false);
    });
  },[])
  return {
    isLoading,
    isAuthenticated,
    setAuthenticated,
  }
}

/**
 * ログイン済みか否かでルーティングを切り替えるルーター
 * @return {JSX.Element}
 */
const AuthRouter = () => {
  const {isLoading, isAuthenticated, setAuthenticated} = useAuthChecker();

  // ログイン済みか否かを確認している間は具体的な画面を表示せず、ローディングのみを表示
  if(isLoading){
    return (<div>通信中...</div>)
  }

  // ログイン済みか否かを確認できたならば、認証済み用ルーティングかログインページかの分岐を処理する
  return isAuthenticated ? (
    <AppFrame logout={() => setAuthenticated(false)}>{/* ページの大枠。ログアウトボタンを含むコンポーネントを想定 */}
      <Switch>
        <Route path={'/hoge'}><div>ログインした状態のみのルーティング例</div></Route>
        <Route path="*"><NotFound/></Route>{/* NotFound は 404 ページ用コンポーネント */}
      </Switch>
    </AppFrame>
  ) : (
    <Switch>
      <Route path="/login"><LoginPage login={()=>setAuthenticated(true)}/></Route>{/* ログインページ */}
      <Redirect to={{pathname: '/login', state: {from: location}}}/>{/* 認証がまだの状態で/login 以外のページへ移動しようとした場合、/loginへリダイレクト */}
    </Switch>
  )
}

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
            <GlobalNav></GlobalNav>
            <div className="flex items-center bg-gradient-to-br from-[#C6FFDD] via-[#FBD786] to-[#f7797d] h-screen">
              <div className="m-auto max-h-screen min-w-[420px] max-w-4xl p-6 glass-white rounded-lg">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/task/index" element={<Home />} />
                  <Route path="/category" element={<CategoryList />} />
                  <Route path="/category/:categoryId/task" element={<TaskList />} />
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
