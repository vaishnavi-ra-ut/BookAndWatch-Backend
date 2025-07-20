const mongoose = require("mongoose");

const bookedSeatSchema = new mongoose.Schema({
    row: { type: String, required: true },
    number: { type: Number, required: true },
    seatType: { type: String, required: true },
    price: { type: Number, required: true },
});

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime",
        required: true,
    },
    seats: [bookedSeatSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked",
    },
    bookedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);