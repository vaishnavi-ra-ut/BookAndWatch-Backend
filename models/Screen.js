const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    row: { type: String, required: true },
    number: { type: Number, required: true },
    seatType: { type: String, default: "regular" }, // e.g., 'VIP', 'premium'
    price: { type: Number, required: true },
});

const screenSchema = new mongoose.Schema({
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
        required: true,
    },
    screenName: {
        type: String,
        required: true,
    },
    totalRows: {
        type: Number,
        required: true,
    },
    seatsPerRow: {
        type: Number,
        required: true,
    },
    seats: [seatSchema],
});

module.exports = mongoose.model("Screen", screenSchema);