import React from "react";
import "../styles/Header.css";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();

  // Conditionally render "Login" and "Register" links based on the route
  const showLoginLinks = location.pathname !== "/CustomerHomePage";  // Only show login links on non-CustomerHomePage

  // Only display "My Cart" and "My Orders" on CustomerHomePage or other specific pages
  const showCartAndOrders = location.pathname === "/CustomerHomePage";

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo.png" alt="Smart Shop Logo" />  
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" /> {/* Search Icon */}
        <input type="text" placeholder="Search products" />
      </div>

      <nav className="nav">
        <ul>
          {showCartAndOrders && (
            <>
              <li>
                <Link to="/cart">
                  <i className="cart-icon">🛒</i> My Cart
                </Link>
              </li>
              <li>
                <Link to="/orders">
                  <i className="orders-icon">📦</i> My Orders
                </Link>
              </li>
            </>
          )}
          {showLoginLinks && (
            <>
              <li>
                <Link to="/login">
                  <button className="login-button">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;




