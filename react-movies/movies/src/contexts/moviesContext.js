import React, { createContext, useState, useEffect } from 'react';
import { fetchUserFavorites, addFavorite, removeFavorite, fetchUserReviews } from '../services/moviesService';

export const MoviesContext = createContext(null);

/**
 * MoviesContextProvider 用于管理收藏、评论和“必看”列表的状态。
 */
const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]); // 收藏数组，包含后端返回的收藏对象
  const [myReviews, setMyReviews] = useState({}); // 初始化为一个空对象
  const [mustWatch, setMustWatch] = useState([]); // “必看”列表

  // 初始化收藏数据
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favData = await fetchUserFavorites();
        setFavorites(favData);
      } catch (error) {
        console.error("Failed to fetch user favorites:", error);
      }
    };
    getFavorites();
  }, []);

  // 初始化评论数据
  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchUserReviews();
        // 将评论数组转换为对象，键为 movieId
        const reviewsObject = reviewData.reduce((acc, review) => {
          acc[review.movieId] = review;
          return acc;
        }, {});
        setMyReviews(reviewsObject);
      } catch (error) {
        console.error("Failed to fetch user reviews:", error);
      }
    };
    getReviews();
  }, []);

  /**
   * 添加收藏
   * @param {Object} movie - 电影对象
   */
  const addToFavorites = async (movie) => {
    try {
      const newFavorite = await addFavorite(movie.id, movie.title);
      setFavorites([...favorites, newFavorite]);
    } catch (error) {
      console.error("Failed to add favorite:", error);
      // 可以在这里添加用户通知，例如使用 Snackbar 显示错误消息
    }
  };

  /**
   * 移除收藏
   * @param {Object} movie - 电影对象
   */
  const removeFromFavorites = async (movie) => {
    try {
      // 找到对应的收藏对象
      const favorite = favorites.find(fav => fav.movieId === movie.id);
      if (favorite) {
        await removeFavorite(favorite._id);
        setFavorites(favorites.filter(fav => fav.movieId !== movie.id));
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      // 可以在这里添加用户通知，例如使用 Snackbar 显示错误消息
    }
  };

  /**
   * 添加评论
   * @param {Object} movie - 电影对象
   * @param {Object} review - 评论对象
   */
  const addReview = async (movie, review) => {
    try {
      // 假设后端 API 已经添加了评论，并返回了新的评论对象
      const addedReview = await addReview(movie.id, review.content, review.rating);
      setMyReviews(prevReviews => ({ ...prevReviews, [movie.id]: addedReview }));
    } catch (error) {
      console.error("Failed to add review:", error);
      // 可以在这里添加用户通知，例如使用 Snackbar 显示错误消息
    }
  };

  /**
   * 添加到“必看”列表
   * @param {Object} movie - 电影对象
   */
  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) { // 防止重复
      const newMustWatch = [...mustWatch, movie.id];
      setMustWatch(newMustWatch);
      console.log("Must Watch List:", newMustWatch); // 调试用
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        myReviews, // 确保将 myReviews 包含在上下文中
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
