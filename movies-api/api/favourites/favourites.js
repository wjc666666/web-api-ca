import express from 'express';
import Favorite from './favoriteModel.js';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

/**
 * @route GET /api/favourites/me
 * @desc Get current user's favorite movies
 * @access Private
 */
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const favorites = await Favorite.find({ user: userId });
  res.status(200).json(favorites);
}));

/**
 * @route POST /api/favourites
 * @desc Add a movie to favorites
 * @access Private
 */
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { movieId, title } = req.body;

  // 检查是否已收藏
  const existingFavorite = await Favorite.findOne({ user: userId, movieId });
  if (existingFavorite) {
    return res.status(400).json({ message: 'Movie is already in favorites.' });
  }

  const favorite = await Favorite.create({ user: userId, movieId, title });
  res.status(201).json(favorite);
}));

/**
 * @route DELETE /api/favourites/:id
 * @desc Remove a movie from favorites
 * @access Private
 */
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const favorite = await Favorite.findOneAndDelete({ _id: req.params.id, user: userId });

  if (!favorite) {
    return res.status(404).json({ message: 'Favorite not found.' });
  }

  res.status(200).json({ message: 'Favorite removed successfully.' });
}));

export default router;