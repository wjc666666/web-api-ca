import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const { addToFavorites, favorites } = useContext(MoviesContext);

  // 检查电影是否已经被收藏
  const isFavorite = favorites.some(fav => fav.movieId === movie.id);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    if (!isFavorite) {
      addToFavorites(movie);
    }
  };

  return (
    <IconButton
      aria-label="add to favorites"
      onClick={handleAddToFavorites}
      disabled={isFavorite} // 禁用已收藏的按钮
    >
      <FavoriteIcon color={isFavorite ? "error" : "primary"} fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;