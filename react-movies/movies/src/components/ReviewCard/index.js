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
        <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
          Rating: {review.rating}/10
        </Typography>

        <Typography variant="body1" component="p" sx={{ marginTop: 1 }}>
          {review.content}
        </Typography>

        <Typography variant="caption" color="textSecondary" sx={{ marginTop: 1 }}>
          Submitted on: {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;