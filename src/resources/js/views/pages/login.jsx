import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {

    const history = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    history('/category');
                } else if (res.data.status === 401){
                    // 認証失敗時
                    setLogin({...loginInput, error_list: { email: [res.data.message] }});
                } else {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Login
                </h2>

                <form onSubmit={loginSubmit}>
                    {/* メールアドレス入力 */}
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Mail Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInput}
                            value={loginInput.email}
                            className="w-full bg-white/60 border border-white/50 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white/80 transition-all duration-200"
                            placeholder="hello@example.com"
                        />
                        {/* エラーメッセージ（赤色で表示） */}
                        <span className="text-red-500 text-xs mt-1 block">
                            {loginInput.error_list.email}
                        </span>
                    </div>

                    {/* パスワード入力 */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleInput}
                            value={loginInput.password}
                            className="w-full bg-white/60 border border-white/50 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white/80 transition-all duration-200"
                            placeholder="••••••••"
                        />
                        {/* エラーメッセージ（赤色で表示） */}
                        <span className="text-red-500 text-xs mt-1 block">
                            {loginInput.error_list.password}
                        </span>
                    </div>

                    {/* ログインボタン */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800/80 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* 新規登録への導線 */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <a href="/register" className="text-gray-800 font-bold hover:underline ml-1">
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
