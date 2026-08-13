import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {

    const history = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    history('/category');
                } else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Register
                </h2>

                <form onSubmit={registerSubmit}>
                    {/* ユーザー名入力 */}
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            User Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleInput}
                            value={registerInput.name}
                            className="w-full bg-white/60 border border-white/50 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white/80 transition-all duration-200"
                            placeholder="John Doe"
                        />
                        <span className="text-red-500 text-xs mt-1 block">
                            {registerInput.error_list.name}
                        </span>
                    </div>

                    {/* メールアドレス入力 */}
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Mail Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInput}
                            value={registerInput.email}
                            className="w-full bg-white/60 border border-white/50 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white/80 transition-all duration-200"
                            placeholder="hello@example.com"
                        />
                        <span className="text-red-500 text-xs mt-1 block">
                            {registerInput.error_list.email}
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
                            value={registerInput.password}
                            className="w-full bg-white/60 border border-white/50 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white/80 transition-all duration-200"
                            placeholder="••••••••"
                        />
                        <span className="text-red-500 text-xs mt-1 block">
                            {registerInput.error_list.password}
                        </span>
                    </div>

                    {/* 登録ボタン */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800/80 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200"
                    >
                        Register
                    </button>
                </form>

                {/* ログインへの導線 */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <a href="/login" className="text-gray-800 font-bold hover:underline ml-1">
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Register;
