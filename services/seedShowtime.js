const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../models/Movie");
const Theater = require("../models/Theater");
const Screen = require("../models/Screen");
const Showtime = require("../models/Showtime");

dotenv.config();

const showTimes = [10, 14, 18, 21]; // Hours: 10AM, 2PM, 6PM, 9PM

async function seedShowtimes() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear old showtimes
    await Showtime.deleteMany({});
    console.log("🧹 Cleared existing showtimes");

    const movies = await Movie.find({});
    if (movies.length === 0) {
        console.error("❌ No movies found in DB");
        process.exit(1);
    }

    const screens = await Screen.find({}).populate("theater");

    let count = 0;

    for (const screen of screens) {
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            for (const hour of showTimes) {
                const date = new Date();
                date.setHours(hour, 0, 0, 0);
                date.setDate(date.getDate() + dayOffset);

                const movie = movies[Math.floor(Math.random() * movies.length)];

                const showtime = new Showtime({
                    movie: movie._id,
                    screen: screen._id,
                    theater: screen.theater._id,
                    startTime: date,
                    language: "Hindi",
                    format: "2D",
                });

                await showtime.save();
                count++;
            }
        }
    }

    console.log(`Seeded ${count} showtimes`);
    process.exit(0);
}
seedShowtimes().catch((err) => {
    console.error("❌ Error seeding showtimes:", err);
    process.exit(1);
});