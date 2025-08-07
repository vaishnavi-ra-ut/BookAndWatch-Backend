const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  title: String,
  poster_path: String,
  backdrop_path: String,
  overview: String,
  release_date: String,
  runtime: Number,
  vote_average: Number,
  genres: [genreSchema],
  videos: [
    {
      key: String,
      site: String,
      type: String,
      name: String,
    },
  ],
  cast: [
    {
      id: Number,
      name: String,
      character: String,
      profile_path: String,
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
