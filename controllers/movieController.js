require('dotenv').config();
const axios = require("axios");

const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_BEARER_TOKEN) {
  console.error("❌ TMDB_BEARER_TOKEN not available in movieController");
}

const axiosConfig = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
  params: {
    language: "en-US",
    region: "IN",
  },
};

const getMovieTrailer = async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, axiosConfig);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching trailer:", error.message);
    res.status(500).json({ error: "Failed to fetch trailer" });
  }
};

const getPopularMovies = async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/popular`, axiosConfig);
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};

const getUpcomingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/upcoming`, axiosConfig);
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error.message);
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
};

const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/now_playing`, axiosConfig);
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    res.status(500).json({ error: "Failed to fetch now playing movies" });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const [movie, credits, videos, similar] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${id}`, axiosConfig),
      axios.get(`${BASE_URL}/movie/${id}/credits`, axiosConfig),
      axios.get(`${BASE_URL}/movie/${id}/videos`, axiosConfig),
    ]);

    res.json({
      movie: movie.data,
      cast: credits.data.cast,
      videos: videos.data.results,
    });
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
};

module.exports = {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieTrailer,
  getMovieDetails
};
