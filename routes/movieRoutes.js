// routes/movieRoutes.js
const express = require('express');
const {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieTrailer,
} = require('../controllers/movieController');

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/now-playing", getNowPlayingMovies);
router.get("/trailer/:movieId", getMovieTrailer);

module.exports = router;

