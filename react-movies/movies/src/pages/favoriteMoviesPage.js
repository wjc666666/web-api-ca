import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites } = useContext(MoviesContext);

  // 创建一组查询并行获取每部收藏电影的详细信息
  const favoriteMovieQueries = useQueries(
    favorites.map((fav) => ({
      queryKey: ["movie", { id: fav.movieId }],
      queryFn: getMovie,
    }))
  );

  // 检查是否有任何查询仍在加载
  const isLoading = favoriteMovieQueries.some(query => query.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  // 提取电影数据
  const movies = favoriteMovieQueries.map((query, index) => {
    const movie = query.data;
    // 将后端的收藏 ID 添加到电影对象中，以便后续删除操作
    movie.favoriteId = favorites[index]._id;
    return movie;
  });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavoritesIcon movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;