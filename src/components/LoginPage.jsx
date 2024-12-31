
import "../styles/LoginPage.css"; // For styling the page
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const LoginPage = () => {
  return (
    <div className="login-page" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Header without search bar and login button */}
      

      {/* Main content */}
      <div className="login-container">
        <div className="login-options">
          <h2>Select Login Type</h2>
          <div className="login-buttons">
            <Link to="/login/purchaser" className="login-btn">Login as customer</Link>
            <Link to="/vendor-login" className="login-btn">Login as Vendor</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;

