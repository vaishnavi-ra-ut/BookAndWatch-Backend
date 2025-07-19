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

module.exports = {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
};
