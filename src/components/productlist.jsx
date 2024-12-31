import React, { useState } from 'react';
import AddProduct from './addproduct';
import '../styles/productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Start with an empty product list
  const [isAdding, setIsAdding] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Function to handle adding or editing a product
  const handleAddProduct = (newProduct) => {
    if (productToEdit) {
      // Update the product in the list if in edit mode
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
      setProductToEdit(null); // Clear edit mode
    } else {
      // Add a new product
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...newProduct, id: Date.now() }
      ]);
    }
    setIsAdding(false); // Close the AddProduct form
  };

  // Function to set a product for editing
  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsAdding(true);
  };

  // Function to delete a product from the list
  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <button
        onClick={() => {
          setIsAdding(true);
          setProductToEdit(null); // Ensure adding a new product
        }}
        className="add-product-button"
      >
        Add Product
      </button>

      <div className="product-cards">
        {products.length === 0 ? (
          <p>No products added yet. Click "Add Product" to get started!</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image && (
                <img
                  src={URL.createObjectURL(product.image)} // Display uploaded image
                  alt={product.name}
                  className="product-image"
                />
              )}
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <button
                onClick={() => handleEditProduct(product)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {isAdding && (
        <AddProduct
          onSubmit={handleAddProduct}
          onCancel={() => {
            setIsAdding(false);
            setProductToEdit(null);
          }}
          productToEdit={productToEdit}
        />
      )}
    </div>
  );
};

export default ProductList;

