const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    screen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        default: "Hindi",
    },
    format: {
        type: String,
        enum: ["2D", "3D", "IMAX"],
        default: "2D",
    },
    priceOverride: {
        type: Map,
        of: Number,
        default: undefined, // Optional override per seat type: { vip: 400, premium: 300 }
    },
}, { timestamps: true });

module.exports = mongoose.model("Showtime", showtimeSchema);
