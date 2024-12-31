const Product = require('../models/Product');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { name, price, category, vendorId, image } = req.body; // imageUrl directly from the request

      // Validate required fields
      if (!name || !price || !category || !vendorId || !image) {
        return res.status(400).json({
          error: 'Missing required fields',
          received: { name, price, category, vendorId, image },
          required: ['name', 'price', 'category', 'vendorId', 'image'],
        });
      }

      const product = new Product({
        name: name.trim(),
        price: parseFloat(price),
        category: category.trim(),
        image: image, // Save the image URL directly here
        vendor: vendorId,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product: ' + error.message });
    }
  },

  getVendorProducts: async (req, res) => {
    try {
      const vendorId = req.query.vendorId;
      const category = req.query.category;

      let query = { vendor: vendorId };
      if (category) {
        query.category = category;
      }

      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const category = req.query.category;
      const query = category ? { category } : {};
      const products = await Product.find(query).populate('vendor', 'name');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products by category' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, category, image } = req.body; // Include image in the request body
      const updateData = {};
  
      // Add fields to updateData only if they are provided in the request
      if (name) updateData.name = name.trim();
      if (price) updateData.price = parseFloat(price);
      if (category) updateData.category = category.trim();
      if (image) updateData.image = image; // Update the image URL
  
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id, vendor: req.body.vendorId },
        { $set: updateData },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error updating product: ' + error.message });
    }
  },
  
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        vendor: req.query.vendorId,
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  },
};

module.exports = ProductController;