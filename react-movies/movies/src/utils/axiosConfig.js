import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

// 请求拦截器，自动附加 token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token; // 由于后端期望 'Bearer <token>'
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;