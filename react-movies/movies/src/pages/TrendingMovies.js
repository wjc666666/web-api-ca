import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../api/tmdb-api';
import MovieCard from '../components/movieCard';
import Spinner from '../components/spinner';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day'); // 默认每日趋势
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const getTrendingMovies = async () => {
          setLoading(true);
          try {
              const movieData = await fetchTrendingMovies(timeWindow);
              setMovies(movieData);
          } catch (err) {
              setError('Failed to fetch trending movies.');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
      getTrendingMovies();
  }, [timeWindow]);

  if (loading) {
      return <Spinner />;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
      <div style={{ padding: "20px" }}>
        <h2>Trending Movies</h2>
        <div style={{ marginBottom: "10px" }}>
          {/* 切换每日/每周趋势 */}
          <button onClick={() => setTimeWindow('day')} disabled={timeWindow === 'day'}>
            Daily
          </button>
          <button onClick={() => setTimeWindow('week')} disabled={timeWindow === 'week'}>
            Weekly
          </button>
        </div>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
};

export default TrendingMovies;