import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../api/tmdb-api';
import MovieCard from '../components/movieCard';
import Spinner from '../components/spinner';

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData = await fetchUpcomingMovies();
        setMovies(movieData);
      } catch (err) {
        setError('Failed to fetch upcoming movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upcoming Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;