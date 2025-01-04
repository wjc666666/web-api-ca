import React, { useState, useContext } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * LoginPage component for user authentication.
 */
const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext);

    /**
     * Handle input field changes.
     * @param {Object} e - Event object
     */
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    /**
     * Handle form submission.
     * @param {Object} e - Event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(credentials);
            localStorage.setItem('token', data.token);
            loginUser(data.user); // 假设后端返回 user 数据
            navigate('/dashboard'); // 登录成功后重定向到仪表盘
        } catch (err) {
            setError(err.msg || 'Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;