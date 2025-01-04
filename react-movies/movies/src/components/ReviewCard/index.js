import React from "react";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ReviewCard = ({ review }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
          Review By: {review.user?.username || 'Unknown'}
        </Typography>

        <Typography variant="h6" component="p" sx={{ marginTop: 1 }}>
          {review.content}
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          Rating: {review.rating}/10
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;