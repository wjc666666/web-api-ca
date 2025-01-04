import express from 'express';
import UserPreference from './userPreferenceModel.js';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

/**
 * @route GET /api/preferences/me
 * @desc Get current user's preferences
 * @access Private
 */
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const preferences = await UserPreference.findOne({ user: userId });
  
  if (!preferences) {
    return res.status(404).json({ message: 'Preferences not found.' });
  }

  res.status(200).json(preferences);
}));

/**
 * @route POST /api/preferences
 * @desc Set or update user's preferences
 * @access Private
 */
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { preferredGenres, preferredLanguage } = req.body;

  let preferences = await UserPreference.findOne({ user: userId });
  if (preferences) {
    preferences.preferredGenres = preferredGenres;
    preferences.preferredLanguage = preferredLanguage;
  } else {
    preferences = new UserPreference({ user: userId, preferredGenres, preferredLanguage });
  }

  await preferences.save();
  res.status(200).json(preferences);
}));

export default router;