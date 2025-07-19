// routes/movieRoutes.js
const express = require('express');
const {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} = require('../controllers/movieController');

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/now-playing", getNowPlayingMovies);

module.exports = router; 

