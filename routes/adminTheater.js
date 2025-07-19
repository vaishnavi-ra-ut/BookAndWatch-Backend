const express = require("express");
const Theater = require("../models/Theater");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const { name, area, city, screens } = req.body;

      if (!name || !area || !city || !screens) {
        return res.status(400).json({
          error: "All fields (name, area, city, screens) are required.",
        });
      }

      const newTheater = new Theater({ name, area, city, screens });
      await newTheater.save();

      res.status(201).json({
        message: "Theater added successfully",
        theater: newTheater,
      });
    } catch (err) {
      console.error("Error adding theater:", err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
