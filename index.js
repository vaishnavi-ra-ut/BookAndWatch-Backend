const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const movieRoutes = require('./routes/movieRoutes');
const theatersRoute = require("./routes/theaters");
const adminTheaterRoutes = require("./routes/adminTheater");

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/database');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // required to read cookies   

app.use('/', authRoutes);
app.use('/movies', movieRoutes);
app.use("/theaters", theatersRoute);
app.use("/admin/theaters", adminTheaterRoutes);

connectDB()
    .then(() => {
        console.log("database connection established successfully..");
        app.listen(7777, () => {
            console.log("server successfully running on port 7777");
        })
    })
    .catch((err) => {
        console.error("Database cannot be connected" + err.message);
    })