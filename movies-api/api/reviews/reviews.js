import express from 'express';
import Review from './reviewModel.js';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

/**
 * @route GET /api/reviews/me
 * @desc Get current user's reviews
 * @access Private
 */
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.find({ user: userId });
  res.status(200).json(reviews);
}));

/**
 * @route POST /api/reviews
 * @desc Add a review for a movie
 * @access Private
 */
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { movieId, content, rating } = req.body;

  const review = await Review.create({ user: userId, movieId, content, rating });
  res.status(201).json(review);
}));

/**
 * @route PUT /api/reviews/:id
 * @desc Update a review
 * @access Private
 */
router.put('/:id', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { content, rating } = req.body;

  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: userId },
    { content, rating },
    { new: true }
  );

  if (!review) {
    return res.status(404).json({ message: 'Review not found or not authorized.' });
  }

  res.status(200).json(review);
}));

/**
 * @route DELETE /api/reviews/:id
 * @desc Delete a review
 * @access Private
 */
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: userId });

  if (!review) {
    return res.status(404).json({ message: 'Review not found or not authorized.' });
  }

  res.status(200).json({ message: 'Review deleted successfully.' });
}));

/**
 * @route GET /api/reviews/:movieId
 * @desc Get all reviews for a specific movie
 * @access Public
 */
router.get('/:movieId', asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId }).populate('user', 'username');
  res.status(200).json(reviews);
}));

export default router;