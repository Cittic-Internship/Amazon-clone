import React, { useEffect, useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        { id: 1, customer: "John Doe", status: "Pending" },
        { id: 2, customer: "Jane Smith", status: "Shipped" },
        { id: 3, customer: "Alice Johnson", status: "Delivered" },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const styles = {
    container: {
      padding: "30px",
      backgroundColor: "#f8f8f8",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      width: "100vw",
      maxWidth: "1200px",
      margin: "30px auto",
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#333",
      textAlign: "center",
      fontWeight: "600",
    },
    orderCard: {
      backgroundColor: "#ffffff",
      padding: "20px",
      margin: "15px 0",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s ease, transform 0.2s ease",
      width: "100%",
    },
    orderCardHover: {
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-2px)",
    },
    text: {
      margin: "5px 0",
      fontSize: "1.1rem",
      color: "#555",
      lineHeight: "1.6",
    },
    status: {
      padding: "8px 16px",
      borderRadius: "25px",
      fontWeight: "600",
      textTransform: "capitalize",
      display: "inline-block",
      fontSize: "0.95rem",
    },
    pending: {
      backgroundColor: "#ffbf00",
      color: "white",
    },
    shipped: {
      backgroundColor: "#28a745",
      color: "white",
    },
    canceled: {
      backgroundColor: "#dc3545",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Order Management</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          style={styles.orderCard}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.orderCardHover);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.target.style, styles.orderCard);
          }}
        >
          <div>
            <p style={styles.text}>Customer: {order.customer}</p>
            <p style={styles.text}>
              Status:{" "}
              <span
                style={{
                  ...styles.status,
                  ...(order.status === "Pending"
                    ? styles.pending
                    : order.status === "Shipped"
                    ? styles.shipped
                    : styles.canceled),
                }}
              >
                {order.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderManagement;
