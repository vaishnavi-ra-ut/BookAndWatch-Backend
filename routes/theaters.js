const express = require("express");
const router = express.Router();
const { getTheaters, postTheater, deleteTheater, updateTheaterDetails } = require("../controllers/theaterController");

// Static fallback theaters
const defaultTheaters = [
  { name: "CineZone Multiplex", area: "Main Street", city: "Unknown", screens: 3 },
  { name: "Galaxy Cinema", area: "Downtown", city: "Unknown", screens: 4 },
  { name: "Movie Palace", area: "East End", city: "Unknown", screens: 2 }
];

// GET: Get theaters by city
router.get("/:city", getTheaters);

module.exports = router;
