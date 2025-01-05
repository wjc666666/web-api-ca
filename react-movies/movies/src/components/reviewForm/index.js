import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ratings = [
  { value: 10, label: "Excellent" },
  { value: 8, label: "Good" },
  { value: 6, label: "Average" },
  { value: 4, label: "Poor" },
  { value: 2, label: "Terrible" },
];

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const ReviewForm = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(5);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      content: "",
      rating: 5,
    },
  });

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/dashboard"); // 导航到 Dashboard 页面
  };

  const onSubmit = async (data) => {
    try {
      await context.addReview(movie, data);
      setOpen(true); // 显示成功消息
      reset(); // 重置表单
    } catch (error) {
      console.error("Failed to submit review:", error);
      // 可以在这里添加错误通知
    }
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a Review
      </Typography>
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="content"
          control={control}
          rules={{ required: "Review content is required" }}
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="content"
              label="Review Content"
              name="content"
              multiline
              minRows={4}
            />
          )}
        />
        {errors.content && (
          <Typography variant="h6" component="p" color="error">
            {errors.content.message}
          </Typography>
        )}

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              id="select-rating"
              select
              variant="outlined"
              label="Rating"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                handleRatingChange(e);
              }}
              helperText="Select your rating"
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={{ display: "flex", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Box>
      </form>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          Thank you for submitting a review!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ReviewForm;
