import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transition-colors">
                <h2 className="text-2xl font-bold text-center text-primary dark:text-accent mb-6 transition-colors">Admin Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                        Login
                    </button>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-white/10 transition-colors"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase font-medium transition-colors">EzyGo Portal</span>
                        </div>
                    </div>

                    <a 
                        href="https://edu.ezygo.app/#/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full block text-center bg-accent text-dark font-bold py-2 rounded-lg hover:bg-opacity-90 transition-all border border-transparent shadow-sm"
                    >
                        EzyGo Login
                    </a>

                    <div className="text-center mt-6">
                        <a href="/" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1">
                            <span>&larr;</span> Back to Home
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
