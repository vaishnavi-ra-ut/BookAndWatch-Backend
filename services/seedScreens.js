const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Theater = require("../models/Theater");
const Screen = require("../models/Screen");

dotenv.config();

function generateSeatLayout(totalRows = 5, seatsPerRow = 10) {
    const seats = [];
    for (let r = 0; r < totalRows; r++) {
        const row = String.fromCharCode(65 + r); // A, B, C...
        const price = getPriceForRow(row);
        for (let n = 1; n <= seatsPerRow; n++) {
            seats.push({
                row,
                number: n,
                seatType: getSeatType(row),
                price,
            });
        }
    }
    return seats;
}

function getPriceForRow(row) {
    if (["A", "B"].includes(row)) return 300; // Front rows (VIP)
    if (["C", "D"].includes(row)) return 250; // Middle rows (Premium)
    return 200; // Back rows (Regular)
}

function getSeatType(row) {
    if (["A", "B"].includes(row)) return "vip";
    if (["C", "D"].includes(row)) return "premium";
    return "regular";
}

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("✅ Connected to MongoDB");

        const theaters = await Theater.find();
        console.log(`📍 Found ${theaters.length} theaters in DB`);

        let totalScreensInserted = 0;

        for (const theater of theaters) {
            const existingScreens = await Screen.find({ theater: theater._id });
            if (existingScreens.length > 0) {
                console.log(`⏭️ Skipping ${theater.name} (screens already exist)`);
                continue;
            }

            const screenCount = theater.screens || 1;

            for (let i = 1; i <= screenCount; i++) {
                const totalRows = 6;
                const seatsPerRow = 10;

                const screen = new Screen({
                    theater: theater._id,
                    screenName: `Screen ${i}`,
                    totalRows,
                    seatsPerRow,
                    seats: generateSeatLayout(totalRows, seatsPerRow),
                });

                await screen.save();
                totalScreensInserted++;
            }

            console.log(`✅ Added ${screenCount} screens for ${theater.name}`);
        }

        console.log(`🎉 Done! ${totalScreensInserted} screens seeded`);
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ Seeding error:", err);
        process.exit(1);
    });