const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: String,
  area: String,
  city: String,
  screens: Number
});

module.exports = mongoose.model("Theater", theaterSchema);
