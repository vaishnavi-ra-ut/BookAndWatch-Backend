const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Theater = require("../models/Theater");
const theaterData = require("./theatersData");

// Load .env
dotenv.config();

// DEBUG: Print URI to make sure it's loaded
console.log("Using Mongo URI:", process.env.MONGO_URI);

// Validate the URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Theater.deleteMany();
    console.log("🧹 Old theater data cleared");

    // Prepare new data
    const seedData = [];
    theaterData.forEach(entry => {
      const { city, theaters } = entry;
      theaters.forEach(theater => {
        if (theater.name && theater.area && city && theater.screens != null) {
          seedData.push({ ...theater, city });
        } else {
          console.warn("⚠️ Incomplete theater entry skipped:", { ...theater, city });
        }
      });
    });

    // Insert new data
    await Theater.insertMany(seedData);
    console.log(`✅ ${seedData.length} theater records inserted successfully!`);

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
