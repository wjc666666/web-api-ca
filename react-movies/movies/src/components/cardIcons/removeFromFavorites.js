import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const { removeFromFavorites } = useContext(MoviesContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    removeFromFavorites(movie);
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;