import axios from 'axios';

/**
 * Axios instance with base URL and interceptors.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor to add Authorization header
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token; // 'Bearer <token>'
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;