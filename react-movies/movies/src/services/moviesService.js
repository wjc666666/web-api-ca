import axios from '../utils/axiosConfig';

/**
 * Fetch top-rated movies.
 * @returns {Promise<Array>}
 */
export const fetchTopRatedMovies = async () => {
    try {
        const response = await axios.get('/movies/top-rated');
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Fetch all movies.
 * @returns {Promise<Array>}
 */
export const fetchMovies = async () => {
    try {
        const response = await axios.get('/movies');
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Fetch a single movie by ID.
 * @param {string} movieId 
 * @returns {Promise<Object>}
 */
export const fetchMovieById = async (movieId) => {
    try {
        const response = await axios.get(`/movies/${movieId}`);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Search movies by query.
 * @param {string} query 
 * @returns {Promise<Array>}
 */
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`/movies/search/${query}`);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Fetch movies by genre.
 * @param {string} genreName 
 * @returns {Promise<Array>}
 */
export const fetchMoviesByGenre = async (genreName) => {
    try {
        const response = await axios.get(`/movies/genre/${genreName}`);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};