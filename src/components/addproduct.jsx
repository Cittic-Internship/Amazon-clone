import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addfiles.css';

const AddProduct = ({ onSubmit, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Others"
  ];

  const validateForm = () => {
    if (!product.name.trim()) return 'Product name is required';
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
      return 'Please enter a valid price';
    }
    if (!product.category) return 'Please select a category';
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        setSelectedFile(null);
        setPreviewImage(null);
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        setSelectedFile(null);
        setPreviewImage(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.id) throw new Error('Please login to add products');

      const formData = new FormData();
      formData.append('name', product.name.trim());
      formData.append('price', Number(product.price).toFixed(2));
      formData.append('category', product.category);
      formData.append('vendorId', user.id);
      if (selectedFile) formData.append('image', selectedFile);

      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post('/api/smartshop/create', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      });

      console.log('Product created:', response.data);
      onSubmit(response.data);
    } catch (err) {
      console.error('Error creating product:', err);
      setError(
        err.response?.data?.error || 
        err.message || 
        'Failed to create product. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <div className="form-header">
        <h2>Add New Product</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter price"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <div className="file-input-wrapper">
            <label className="file-input-label">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </label>
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="preview-image"
            />
          )}
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Adding...
              </>
            ) : 'Add Product'}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;