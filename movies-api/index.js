import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import moviesRouter from './api/movies/index.js';
import favouritesRouter from './api/favourites/favourites.js';
import reviewsRouter from './api/reviews/reviews.js';
import preferencesRouter from './api/preferences/preferences.js'; 
import './db/index.js';
import defaultErrHandler from './errHandler/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; 

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/preferences', preferencesRouter); 
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});