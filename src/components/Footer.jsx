import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#14213d",
        color: "#fff",
        padding: "20px",
        paddingLeft:"300px",
        paddingRight:"300px",
        textAlign: "center",
        fontSize: "15px",
        width: "100%",
        minHeight: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <p>
          <strong>About Us:</strong> ShopSmart is your one-stop destination for
          the best deals on Clothing, Jewellery, Electronics, Groceries, Beauty
          &amp; Personal Care...
        </p>
        <p>
          We aim to provide a seamless shopping experience with top-notch
          features and customer support.
        </p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <p>Follow us:</p>
        <a
          href="https://www.instagram.com/1234"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#f4c10f",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          Instagram
        </a>
        |
        <a
          href="https://www.facebook.com/1234"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4267B2",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          Facebook
        </a>
        |
        <a
          href="https://www.twitter.com/1234"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1DA1F2",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          Twitter
        </a>
      </div>
      <div>
        <p>
          Need Help? Contact us at{" "}
          <a
            href="mailto:support@shopsmart.com"
            style={{ color: "#4caf50" }}
          >
            support@shopsmart.com
          </a>
        </p>
        <p>&copy; 2024 ShopSmart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

