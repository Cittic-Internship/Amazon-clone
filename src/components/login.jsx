import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Footer from "./Footer"; // Ensure Footer is correctly imported

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Header Section */}
      <header
        style={{
          backgroundColor: "#14213d",
          color: "#fff",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Change to space-between to position items
          position: "relative", // Allow positioning for the home button
          fontSize: "22px",
          height: "80px", // Set header height
        }}
      >
        {/* Logo and App Name */}
         {/* Logo */}
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src="/assets/logo.png" // Add the correct path to your logo image
      alt="App Logo"
      style={{ height: "120px", marginRight: "30px" }} // Increased logo size
    />
  </div>

  {/* App Name Centered */}
  <h1 style={{ margin: 0, fontSize: "36px", flexGrow: 1, textAlign: "center" }}>Smart Shop</h1> {/* Centered app name */}


        {/* Home Button */}
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            marginLeft: "auto", // Ensure it stays on the right
          }}
          onClick={() => navigate("/")}
        >
          <FaHome /> Home
        </button>
      </header>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 160px)", // Adjust height to account for header and footer
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "400px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Select Login Type</h2>
          <div>
            <Link
              to="/login/customer"
              style={{
                display: "block",
                margin: "10px 0",
                padding: "10px",
                backgroundColor: "#4caf50",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              Login as Customer
            </Link>
            <Link
              to="/login/vendor"
              style={{
                display: "block",
                margin: "10px 0",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              Login as Vendor
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Login;