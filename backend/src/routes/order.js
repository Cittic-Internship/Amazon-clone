// src/routes/order.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
// const authMiddleware = require('../middleware/auth');

// Order routes
router.get('/',OrderController.getVendorOrders);
router.put('/:id/status',OrderController.updateOrderStatus);
router.get('/analytics',OrderController.getOrderAnalytics);

module.exports = router;