const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
module.exports = app;