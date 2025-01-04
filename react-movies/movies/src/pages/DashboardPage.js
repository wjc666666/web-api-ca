import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchUserFavorites, fetchUserReviews } from '../services/moviesService';
import MovieCard from '../components/movieCard';
import ReviewCard from '../components/ReviewCard'; 
import Spinner from '../components/spinner';

const DashboardPage = () => {
  const { auth } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [favData, reviewData] = await Promise.all([
          fetchUserFavorites(),
          fetchUserReviews(),
        ]);
        console.log('Favorites:', favData);
        console.log('Reviews:', reviewData);
        setFavorites(favData);
        setReviews(reviewData);
      } catch (err) {
        console.log('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  console.log('Auth:', auth); // 调试用

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      
      <section>
        <h3>Your Favorite Movies</h3>
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
      
      <section>
        <h3>Your Reviews</h3>
        <div className="review-list">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;