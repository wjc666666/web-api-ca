import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/tmdb-api';
import MovieCard from '../components/movieCard';
import Spinner from '../components/spinner';

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const getPopularMovies = async () =>{
            try{
                const movieData = await fetchPopularMovies();
                if (Array.isArray(movieData)) {  
                    setMovies(movieData);
                } else {
                    setError('Failed to fetch movies.');
                }
            } catch (err) {
                setError('Failed to fetch movies: ' + err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getPopularMovies();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
        <div style={{ padding: "20px" }}>
            <h2>Popular Movies</h2>
            <div className='movie-list'>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
        </div>
    );
};

export default PopularMovies;