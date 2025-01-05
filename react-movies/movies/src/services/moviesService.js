import axios from '../utils/axiosConfig';

/**
 * 获取即将上映的电影
 * @param {number} page 
 * @returns {Promise<Array>}
 */
export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await axios.get('/movies/tmdb/upcoming', { params: { page } });
    return response.data.results;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch upcoming movies.';
  }
};

/**
 * 获取热门电影
 * @param {number} page 
 * @returns {Promise<Array>}
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get('/movies/tmdb/popular', { params: { page } });
    return response.data.results;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch popular movies.';
  }
};

/**
 * 获取当前用户的收藏电影
 * @returns {Promise<Array>}
 */
export const fetchUserFavorites = async () => {
  try {
    const response = await axios.get('/favourites/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch favorite movies.';
  }
};

/**
 * 添加收藏电影
 * @param {number} movieId 
 * @param {string} title 
 * @returns {Promise<Object>}
 */
export const addFavorite = async (movieId, title) => {
  try {
    const response = await axios.post('/favourites', { movieId, title });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to add favorite movie.';
  }
};

/**
 * 移除收藏电影
 * @param {string} favoriteId 
 * @returns {Promise<Object>}
 */
export const removeFavorite = async (favoriteId) => {
  try {
    const response = await axios.delete(`/favourites/${favoriteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to remove favorite movie.';
  }
};

/**
 * 添加评论
 * @param {number} movieId 
 * @param {string} content 
 * @param {number} rating 
 * @returns {Promise<Object>}
 */
export const addReview = async (movieId, content, rating) => {
  try {
    const response = await axios.post('/reviews', { movieId, content, rating });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to add review.';
  }
};

/**
 * 获取特定电影的评论
 * @param {number} movieId 
 * @returns {Promise<Array>}
 */
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`/reviews/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch reviews for the movie.';
  }
};

/**
 * 获取当前用户的评论
 * @returns {Promise<Array>}
 */
export const fetchUserReviews = async () => {
  try {
    const response = await axios.get('/reviews/me');
    return response.data; 
  } catch (error) {
    throw error.response?.data || 'Failed to fetch your reviews.';
  }
};
/**
 * 获取用户偏好
 * @returns {Promise<Object>}
 */
export const fetchUserPreferences = async () => {
  try {
    const response = await axios.get('/preferences/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch your preferences.';
  }
};

/**
 * 设置用户偏好
 * @param {Object} preferences 
 * @returns {Promise<Object>}
 */
export const setUserPreferences = async (preferences) => {
  try {
    const response = await axios.post('/preferences', preferences);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to set your preferences.';
  }
};
