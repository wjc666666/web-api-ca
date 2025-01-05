# Assignment 2 - Web API.

Name: Juncheng Wang
## Features.

In addition to the functionalities covered in the labs, the following features have been implemented in this Web API:
 
 + User Authentication & Authorization:
   + Secure user registration and login using JWT (JSON Web Tokens).
   + Protected routes to ensure only authenticated users can access certain endpoints.
 + Favorite Movies Management:
   + Add, retrieve, and remove favorite movies for authenticated users.
   + Prevent duplicate entries in favorites.
 + Movie Reviews:
   + Users can create, update, delete, and view reviews for movies.
   + Each review is associated with a specific user and movie.
   + Prevent users from submitting multiple reviews for the same movie.
+ Integration with TMDB API:
   + Fetch upcoming, trending, and popular movies from The Movie Database (TMDB) API.
   + Retrieve detailed information, genres, images, and reviews for individual movies.
+ Frontend Integration:
   + React frontend with Context API for managing authentication and movie-related states.
   + React Query for efficient data fetching and caching.
   + Protected routes to ensure secure navigation within the application.
+ Comprehensive Error Handling:
   + Handle and respond to various error scenarios gracefully, providing meaningful feedback to users.

 + etc

## Setup requirements.

To run the application locally, follow these steps:

1.Clone the Repository:
git clone https://github.com/wjc666666/web-api-ca.git

2.Install Backend Dependencies:
cd movies-api
npm install
npm run dev

3.Install Frontend Dependencies:
cd ../movies
npm install
npm run

4.Set Up Environment Variables:
+ Create a .env file in both backend and frontend directories.
+ Refer to the API Configuration section for required environment variables.

5.Access the Application:

+ Open your browser and navigate to http://localhost:3000 to view the frontend.
+ The backend API runs on http://localhost:8080 by default.
## API Configuration

Before running the API, ensure that you have the necessary environment variables configured. Create a .env file in the backend directory with the following variables:
_____________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoURL
TMDB_KEY=YourTMDBApiKey
SECRET=YourJWTSecret

______________________
Description of Variables:

+ NODE_ENV: Sets the environment mode (e.g., development, production).
+ PORT: The port on which the backend server will run.
+ HOST: The host address (default is localhost).
+ MONGO_DB: Your MongoDB connection string.
+ TMDB_KEY: API key for accessing TMDB services.
+ SECRET: Secret key used for signing JWT tokens.

Note: Replace the placeholder values with your actual credentials.
## API Design
The Web API follows a RESTful architecture with the following endpoints:

User Routes
+ Register a New User
 + POST /api/users/register
 + Description: Creates a new user account.
 + Body Parameters:
  + username (string, required)
  + password (string, required)
+ User Login
 + POST /api/users/login
 + Description: Authenticates a user and returns a JWT token.
 + Body Parameters:
  + username (string, required)
  + password (string, required)
+ Get Current User
 + GET /api/users/me
 + Description: Retrieves information about the authenticated user.
 + Headers: Authorization: Bearer <token>
+ Update User Information
 + PUT /api/users/:id
 + Description: Updates user information.
 + Headers: Authorization: Bearer <token>
 + Body Parameters: Any user fields to update (e.g., username, password).

Movie Routes
 + Get All Movies
  + GET /api/movies
  + Description: Retrieves a paginated list of movies.
  + Query Parameters:
   + page (number, optional)
   + limit (number, optional)
+ Get Movie Details
 + GET /api/movies/:id
 + Description: Retrieves detailed information about a specific movie by its ID.
+ Get Upcoming Movies
 + GET /api/movies/tmdb/upcoming
 + Description: Fetches upcoming movies from TMDB.
+ Get Movie Genres
 + GET /api/movies/tmdb/genres
 + Description: Retrieves a list of movie genres from TMDB.

 Favorite Movies Routes
 + Get User's Favorite Movies
  + GET /api/favourites/me
  + Description: Retrieves the list of favorite movies for the authenticated user.
  + Headers: Authorization: Bearer <token>
+ Add a Movie to Favorites
 + POST /api/favourites
 + Description: Adds a movie to the authenticated user's favorites.
 + Headers: Authorization: Bearer <token>
 + Body Parameters:
  + movieId (number, required)
  + title (string, required)
+ Remove a Movie from Favorites
 + DELETE /api/favourites/:id
 + Description: Removes a movie from the authenticated user's favorites by favorite ID.
 + Headers: Authorization: Bearer <token>

Review Routes
+ Get User's Reviews
 + GET /api/reviews/me
 + Description: Retrieves all reviews made by the authenticated user.
 + Headers: Authorization: Bearer <token>
+ Add a Review for a Movie
 + POST /api/reviews
 + Description: Adds a new review for a specific movie.
 + Headers: Authorization: Bearer <token>
 + Body Parameters:
  + movieId (number, required)
  + content (string, required)
  + rating (number, required, 1-10)
+ Update a Review
 + PUT /api/reviews/:id
 + Description: Updates an existing review by review ID.
 + Headers: Authorization: Bearer <token>
 + Body Parameters:
  + content (string, optional)
  + rating (number, optional, 1-10)
+ Delete a Review
 + DELETE /api/reviews/:id
 + Description: Deletes a review by review ID.
 + Headers: Authorization: Bearer <token>
+ Get All Reviews for a Movie
 + GET /api/reviews/:movieId
 + Description: Retrieves all reviews for a specific movie.
## Security and Authentication

Authentication:
+ JWT (JSON Web Tokens):
 + Used for authenticating users.
 + Upon successful login, a JWT token is issued to the user.
 + This token must be included in the Authorization header (Bearer <token>) for protected routes.

Protected Routes:
+ User Routes:
 + GET /api/users/me
 + PUT /api/users/:id

Favorite Movies Routes:
+ GET /api/favourites/me
+ POST /api/favourites
+ DELETE /api/favourites/:id

Review Routes:
+ GET /api/reviews/me
+ POST /api/reviews
+ PUT /api/reviews/:id
+ DELETE /api/reviews/:id

Note: All protected routes require the Authorization header with a valid JWT token. Unauthorized access attempts will receive a 401 Unauthorized response.

## Integrating with React App

The React frontend is seamlessly integrated with the backend API, providing a responsive and interactive user experience. Below are the key integrations and updates made to the React application:

Context API:
+ AuthContext:
 + Manages user authentication state across the application.
 + Provides functions for logging in, logging out, and maintaining user session.

+ MoviesContext:
 + Manages state related to favorite movies, user reviews, and "must watch" lists.
 + Provides functions to add/remove favorites and add reviews.

React Query:
+ Utilized for efficient data fetching, caching, and synchronization with the backend API.
+ Ensures that data is up-to-date and reduces redundant network requests.

Protected Routes:
+ Implemented using the ProtectedRoute component.
+ Ensures that certain pages (e.g., Dashboard, Home, Upcoming, Trending, Popular) are only accessible to authenticated users.

Views Utilizing Web API:
+ HomePage:
 + Displays a list of movies fetched from the backend API.
Allows users to add movies to favorites.

+ DashboardPage:
 + Shows user's favorite movies and their corresponding reviews.
 + Enables users to remove movies from favorites and write reviews.

+ AddMovieReviewPage:
 + Provides a form for users to submit reviews for movies.
 + Integrates with the backend to save reviews and display them on the Dashboard.

+ FavoriteMoviesPage:
 + Lists all movies that the user has marked as favorites.

+ MoviePage:
 + Shows detailed information about a specific movie, including reviews and recommendations.
 
 Additional Updates:
+ Error Handling:
 + Comprehensive error handling to provide users with meaningful feedback in case of failures.
+ User Feedback:
 + Implemented Snackbar notifications to inform users about successful actions (e.g., submitting a review).
+ Responsive Design:
 + Ensured that the application is responsive and user-friendly across different devices and screen sizes.
## Independent learning 

During the development of this application, several advanced features and optimizations were implemented beyond the scope of the initial assignments:
+ Context API Integration:
 + Leveraged React's Context API to manage global state, enhancing the scalability and maintainability of the frontend application.
+ React Query for Data Management:
 + Adopted React Query for efficient data fetching and caching strategies, improving the performance and user experience.