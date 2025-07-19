// services/tmdb.js
const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchNowPlayingMovies() {
  const url = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
  const response = await axios.get(url);
  return response.data.results;
}

module.exports = {
  fetchNowPlayingMovies,
};
