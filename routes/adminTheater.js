const express = require("express");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { postTheater, deleteTheater, updateTheaterDetails } = require("../controllers/theaterController");
const router = express.Router();

router.post("/",
  requireAuth,
  requireRole("admin"), postTheater);
router.delete("/:id",
  requireAuth,
  requireRole("admin"), deleteTheater);
router.patch("/:id",
  requireAuth,
  requireRole("admin"), updateTheaterDetails);

module.exports = router;
