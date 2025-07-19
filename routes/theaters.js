const express = require("express");
const router = express.Router();
const Theater = require("../models/Theater");

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

// POST: Add new theater
router.post("/", async (req, res) => {
  try {
    const { name, area, city, screens } = req.body;

    if (!name || !area || !city || !screens) {
      return res.status(400).json({ error: "All fields (name, area, city, screens) are required." });
    }

    const newTheater = new Theater({ name, area, city, screens });
    await newTheater.save();

    res.status(201).json({ message: "Theater added successfully", theater: newTheater });
  } catch (err) {
    console.error("Error adding theater:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
