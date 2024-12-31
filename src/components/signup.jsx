import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Ensure Footer is correctly imported
import { FaHome } from "react-icons/fa";
import axios from "axios"; // Import axios

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error state
  const [successMessage, setSuccessMessage] = useState(""); // For success message state
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Basic validation
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(""); // Reset error before making the request
      setSuccessMessage(""); // Reset success message before making the request

      // Send POST request to backend
      const response = await axios.post("http://localhost:3001/api/smartshop/auth/register", {
        name,
        email,
        password,
      });

      // Log the response to check the structure
      console.log(response); // You can inspect the entire response in the console

      // Check if the response contains the expected data (message or other fields)
      if (response.data && response.data.message) {
        setSuccessMessage(response.data.message); // Set the success message to display it
      } else {
        setSuccessMessage("Account created successfully!"); // Fallback message if no message key
      }

      // Optionally navigate to the homepage after account creation
      // navigate("/");

    } catch (error) {
      console.error(error); // Log any error to the console for debugging
      setError("An error occurred while creating the account. Please try again.");
    } finally {
      setLoading(false);
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
          ShopSmart
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
        className="create-account"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 200px)", // Adjust height to account for header and footer
          backgroundColor: "#f8f9fa",
          backgroundImage: "url('/assets/background.jpg')", // Replace with actual path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="create-account-container"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "400px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Create Account</h2>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>} {/* Success message */}
          <form onSubmit={handleCreateAccount}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Name:
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              disabled={loading} // Disable button when loading
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default CreateAccount;