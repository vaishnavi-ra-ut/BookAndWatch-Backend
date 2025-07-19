const express = require("express");
const router = express.Router();
const Theater = require("../models/Theater");
const { requireRole , requireAuth } = require("../middlewares/auth")

// Static fallback theaters
const defaultTheaters = [
  { name: "CineZone Multiplex", area: "Main Street", city: "Unknown", screens: 3 },
  { name: "Galaxy Cinema", area: "Downtown", city: "Unknown", screens: 4 },
  { name: "Movie Palace", area: "East End", city: "Unknown", screens: 2 }
];

// GET: Get theaters by city
router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    const theaters = await Theater.find({ city: new RegExp(city, "i") });

    if (theaters.length === 0) {
      console.warn(`No theaters found for city: ${city}. Returning default list.`);
      return res.json({
        source: "static",
        city,
        theaters: defaultTheaters
      });
    }

    res.json({
      source: "database",
      city,
      theaters
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});


module.exports = router;
