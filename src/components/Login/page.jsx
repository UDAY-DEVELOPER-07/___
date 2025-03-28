import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/bg.jpg'; 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/users'); // Redirect to Users List (Level 2)
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg- bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}>
            <div className=" flex items-center justify-center h-screen w-full  backdrop-blur-sm">
            <form onSubmit={handleLogin} className="bg-transparent p-8 rounded-xl shadow-2xl border-2 border-black shadow-black w-96">
                <h2 className="text-3xl text-white font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="mb-4">
                    <label className="block font-bold  text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
                >
                    Login
                </button>
            </form>
            </div>
        </div>
    );
};

export default Login;
