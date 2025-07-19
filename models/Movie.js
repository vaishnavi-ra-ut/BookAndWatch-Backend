// models/Movie.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, unique: true },
  title: String,
  overview: String,
  poster_path: String,
  release_date: String,
  genres: [String], // or TMDB genre IDs
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Movie", movieSchema);
