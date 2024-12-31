
const express = require('express');
const {
  createProduct,
  getVendorProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController'); // Import the controller functions
const upload = require('../utils/fileUpload.js'); // Import the pre-configured multer middleware
const router = express.Router();

// Route to create a product with an image upload
router.post('/create', upload.single('image'), createProduct);

// Route to get products by vendor
router.get('/vendor/products', getVendorProducts);

// Route to get products by category
router.get('/category', getProductsByCategory);

// Route to update a product, with optional image upload
router.put('/:id', upload.single('image'), updateProduct);

// Route to delete a product
router.delete('/:id', deleteProduct);

module.exports = router;

// Route to delete a product
router.delete('/:id', deleteProduct);

module.exports = router;

