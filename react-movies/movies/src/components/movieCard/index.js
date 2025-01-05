import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const MovieCard = ({ movie, action = () => null }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <CalendarIcon fontSize="small" /> {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <StarRateIcon fontSize="small" /> {movie.vote_average}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="500"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'path/to/placeholder/image.png' // 替换为您的占位符图片路径
        }
        alt={movie.title}
      />
      <CardActions>
        {action(movie)}
        <IconButton>
          <PlaylistAddIcon />
        </IconButton>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="small" color="primary">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
