const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendor');
const orderRoutes = require('./routes/order');
const Product = require('./models/Product');
const product = require('./routes/product');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/smartshop/vendors', vendorRoutes);
app.use('/api/smartshop/orders', orderRoutes);
app.use('/api/smartshop/',product)


app.get('/api/smartshop/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Product.find({ category });
    res.status(200).json(categoryData);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
