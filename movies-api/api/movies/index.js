import express from 'express';
import movieModel from './movieModel.js';
import asyncHandler from 'express-async-handler';
import { getUpcomingMovies } from '../tmdb-api.js';
import fetch from 'node-fetch';
import favouritesRouter from '../favourites/favourites.js';
import reviewsRouter from '../reviews/reviews.js';
import preferencesRouter from '../preferences/preferences.js';

const router = express.Router();

// 注册子路由
router.use('/favourites', favouritesRouter);
router.use('/reviews', reviewsRouter);
router.use('/preferences', preferencesRouter);

// 现有的路由...

// GET /api/movies
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit);

    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// GET /api/movies/:id
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// GET /api/movies/tmdb/upcoming
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// GET /api/movies/tmdb/genres
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const apiKey = process.env.TMDB_KEY;
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const genres = await response.json();
    res.status(200).json(genres);
}));

export default router;
