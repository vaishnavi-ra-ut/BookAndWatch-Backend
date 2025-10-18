const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const movieRoutes = require('./routes/movieRoutes');
const theatersRoute = require("./routes/theaters");
const adminTheaterRoutes = require("./routes/adminTheater");
const cityApi = require("./routes/cityRoutes");
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// ✅ Use environment variable for frontend origin
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use("/theaters", theatersRoute);
app.use("/admin/theaters", adminTheaterRoutes);
app.use("/api", cityApi);

// ✅ Start server after DB connection
connectDB()
    .then(() => {
        console.log("✅ Database connection established successfully.");
        const PORT = process.env.PORT || 7777;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed: " + err.message);
    });
