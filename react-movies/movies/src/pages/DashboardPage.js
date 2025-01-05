import React, { useContext } from 'react';
import { MoviesContext } from '../contexts/moviesContext';
import { useQueries } from 'react-query';
import { getMovie } from '../api/tmdb-api';
import MovieCard from '../components/movieCard';
import ReviewCard from '../components/ReviewCard';
import Spinner from '../components/spinner';
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const DashboardPage = () => {
  const { favorites, myReviews } = useContext(MoviesContext);

  // 使用 useQueries 并行获取每个收藏电影的详细信息
  const favoriteMovieQueries = useQueries(
    favorites.map((fav) => ({
      queryKey: ["movie", { id: fav.movieId }],
      queryFn: () => getMovie({ queryKey: ["movie", { id: fav.movieId }] }),
    }))
  );

  // 检查是否有任何查询仍在加载或有错误
  const isLoading = favoriteMovieQueries.some(q => q.isLoading);
  const isError = favoriteMovieQueries.some(q => q.isError);
  
  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading favorite movies.</div>;

  // 提取电影数据
  const movies = favoriteMovieQueries.map(q => q.data);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      
      <section>
        <h3>Your Favorite Movies</h3>
        <div className="movie-list">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              action={(movie) => (
                <>
                  <RemoveFromFavoritesIcon movie={movie} />
                  <WriteReview movie={movie} />
                </>
              )} 
            />
          ))}
        </div>
      </section>
      
      <section>
        <h3>Your Reviews</h3>
        <div className="review-list">
          {Object.values(myReviews).map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
