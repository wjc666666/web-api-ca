import axios from '../utils/axiosConfig';

/**
 * Register a new user.
 * @param {Object} userData - { username, password }
 * @returns {Promise<Object>}
 */
export const signup = async (userData) => {
    try {
        const response = await axios.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Login user and get JWT token.
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>}
 */
export const login = async (credentials) => {
    try {
        const response = await axios.post('/users/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Get current authenticated user.
 * @returns {Promise<Object>}
 */
export const getCurrentUser = async () => {
    try {
        const response = await axios.get('/users/me');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};