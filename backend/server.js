const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'https://main.d27iq5vkliqz0x.amplifyapp.com',
    'https://claw-virtual-adoption-web.netlify.app',
    'https://claw-virtual-adoption.co.za',
    'https://www.claw-virtual-adoption.co.za',
    'http://localhost:5173',

];

app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error("Blocked CORS origin:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Keep this true if you use cookies/sessions
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');

app.use("/api/auth", authRoutes);
app.use("/api/dog", dogRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("---------- MongoDB Connected! :) ----------"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`---------- Server running on port ${PORT} ----------`);
});