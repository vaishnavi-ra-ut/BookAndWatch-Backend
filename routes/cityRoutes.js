const express = require("express");
const router = express.Router();
const theaterData = require("../services/theatersData"); // This is your array

router.get("/cities", (req, res) => {
  try {
    const citySet = new Set();

    theaterData.forEach(entry => {
      citySet.add(entry.city);
    });

    const distinctCities = Array.from(citySet).sort();
    res.json(distinctCities);
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

module.exports = router;
