import React, { useState, useEffect } from "react";
// import '../styles/salesinsights.css';

const SalesInsights = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    ordersProcessed: 0,
    pendingOrders: 0,
  });

  // Simulating fetching sales data with mock data for testing
  useEffect(() => {
    // MOCK DATA for now - Replace with backend call when ready
    const mockSalesData = {
      totalSales: 500,  // Mock total sales value
      ordersProcessed: 20, // Mock orders processed
      pendingOrders: 5, // Mock pending orders
    };
    setSalesData(mockSalesData); // Set mock data to state for now

    // Later, you will replace this with a real API call
    // Comment: Replace this mock data with a backend API call when backend is ready
    // For example, you can call an API like:
    // fetchSalesDataFromBackend();
  }, []); // This will run once when the component mounts

  // Function to simulate fetching sales data from backend
  // Comment: This is where you'll make the actual API call once the backend is ready
  // const fetchSalesDataFromBackend = async () => {
  //   const token = localStorage.getItem("token"); // Token for authentication
  //   const response = await fetch("https://your-backend-url.com/sales", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   });
  //   const data = await response.json();
  //   setSalesData(data); // Set the actual data from the backend
  // };

  return (
    <div className="sales-insights">
      <h2>Sales Insights</h2>
      <p>Total Sales: ${salesData.totalSales}</p>
      <p>Orders Processed: {salesData.ordersProcessed}</p>
      <p>Pending Orders: {salesData.pendingOrders}</p>

      {/* Comment: When backend is integrated, you will remove the mock data */}
      {/* Replace the data rendering above with real data from the API response */}
    </div>
  );
};

export default SalesInsights;
