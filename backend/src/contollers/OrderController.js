// src/controllers/OrderController.js
const Order = require('../models/Order');

class OrderController {
  // Get vendor's orders
  static async getVendorOrders(req, res) {
    try {
      const orders = await Order.find({ vendor: req.vendor.vendorId })
        .populate('customer', 'name email')
        .populate('products.product');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id, vendor: req.vendor.vendorId },
        { status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error updating order status' });
    }
  }

  // Get order analytics
  static async getOrderAnalytics(req, res) {
    try {
      const analytics = await Order.aggregate([
        { $match: { vendor: req.vendor.vendorId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$totalAmount' }
          }
        }
      ]);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching order analytics' });
    }
  }
}

module.exports = OrderController;