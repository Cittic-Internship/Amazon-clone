import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Ensure Footer is correctly imported
import { FaHome } from "react-icons/fa";
import axios from "axios"; // Import axios for HTTP requests

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:3001/api/smartshop/vendors/login", {
        email,
        password,
      });

      console.log("Response:", response); // Inspect the response structure
      const { id, name, token } = response.data; // Destructure response data
      alert(`Login successful! Welcome, ${name}`);
      
      // Example: Store user data in localStorage (optional)
      localStorage.setItem("user", JSON.stringify({ id, name, email,token }));

      // Redirect user after successful login
      navigate("/vendor-dashboard"); // Replace '/dashboard' with your target route
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data.message || "Invalid email or password.");
      } else {
        alert("Failed to connect to the server.");
      }
    }
  };


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
          justifyContent: "space-between",
          fontSize: "22px",
          height: "100px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/assets/logo.png" // Add the correct path to your logo image
            alt="App Logo"
            style={{ height: "120px", marginRight: "30px" }}
          />
        </div>

        {/* App Name Centered */}
        <h1 style={{ margin: 0, fontSize: "36px", flexGrow: 1, textAlign: "center" }}>
          Smart Shop
        </h1>

        {/* Home Button */}
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
          onClick={() => navigate("/")}
        >
          <FaHome /> Home
        </button>
      </header>

      {/* Main Content */}
      <div
        className="purchaser-login"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 200px)",
          backgroundColor: "#f8f9fa",
          backgroundImage: "url('/assets/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="purchaser-login-container"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "400px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Vendor Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default VendorLogin;
