import React, { useState, useEffect } from 'react';
import ProductList from './productlist';
import OrderManagement from './orderlist';
import SalesInsights from './salesinsights';
import AddProduct from './addproduct';
import Footer from './Footer';
import axios from 'axios';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/smartshop/vendor/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductSubmit = async (productData) => {
    try {
      setProducts(prevProducts => [...prevProducts, productData]);
      setShowAddProduct(false);
      await fetchProducts();
    } catch (error) {
      console.error('Error handling product submission:', error);
    }
  };

  const styles = {
    dashboard: {
      fontFamily: "'Amazon Ember', Arial, sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f7f7f7',
    },
    header: {
      backgroundColor: '#232f3e',
      color: 'white',
      padding: '12px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    mainNav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1500px',
      margin: '0 auto',
    },
    title: {
      fontSize: '24px',
      fontWeight: '500',
      margin: 0,
    },
    nav: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      padding: '8px 15px',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    buttonActive: {
      backgroundColor: '#ffffff1a',
    },
    main: {
      flex: 1,
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '20px',
      width: '100%',
    },
    summaryContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    summaryCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '10px',
    },
    cardValue: {
      fontSize: '24px',
      fontWeight: '500',
      color: '#232f3e',
    },
    addButton: {
      backgroundColor: '#ff9900',
      color: '#000',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '20px',
      transition: 'background-color 0.2s',
    },
    contentSection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <div style={styles.mainNav}>
          <h1 style={styles.title}>Seller Central</h1>
          <nav style={styles.nav}>
            <button
              style={{
                ...styles.button,
                ...(activeTab === 'products' ? styles.buttonActive : {})
              }}
              onClick={() => setActiveTab('products')}
            >
              Inventory
            </button>
            <button
              style={{
                ...styles.button,
                ...(activeTab === 'orders' ? styles.buttonActive : {})
              }}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              style={{
                ...styles.button,
                ...(activeTab === 'sales' ? styles.buttonActive : {})
              }}
              onClick={() => setActiveTab('sales')}
            >
              Analytics
            </button>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        {showSummary && (
          <div style={styles.summaryContainer}>
            <div style={styles.summaryCard}>
              <div style={styles.cardTitle}>Total Products</div>
              <div style={styles.cardValue}>{products.length}</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.cardTitle}>Today's Orders</div>
              <div style={styles.cardValue}>0</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.cardTitle}>Total Revenue</div>
              <div style={styles.cardValue}>$0.00</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.cardTitle}>Performance</div>
              <div style={styles.cardValue}>100%</div>
            </div>
          </div>
        )}

        <div style={styles.contentSection}>
          {activeTab === 'products' && (
            <>
              <button
                style={styles.addButton}
                onClick={() => setShowAddProduct(true)}
              >
                Add Product
              </button>
              
              {showAddProduct ? (
                <AddProduct
                  onSubmit={handleProductSubmit}
                  onCancel={() => setShowAddProduct(false)}
                />
              ) : (
                <ProductList products={products} />
              )}
            </>
          )}
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'sales' && <SalesInsights />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorDashboard;