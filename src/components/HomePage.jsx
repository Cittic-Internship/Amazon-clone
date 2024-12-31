// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../styles/HomePage.module.css"; // Importing CSS Module
// import { FaSignInAlt, FaShoppingCart,FaSearch} from "react-icons/fa";
// import Clothing from "../components/clothing";
// import Electronics from "../components/electronics";
// import Groceries from "../components/Groceries";
// import BeautyPersonalCare from "../components/BeautyPersonalCare";
// import Jewelry from "../components/Jewelry";


// const categories = [
//   { name: "Electronics", image: "/assets/Electronics.jpg", route: "/electronics" },
//   { name: "Clothing", image: "/assets/clothing.jpg", route: "/clothing" },
//   { name: "Groceries", image: "/assets/groceries.jpg", route: "/groceries" },
//   { name: "Beauty", image: "/assets/beauty.jpg", route: "/beauty" },
//   { name: "Jewellery", image: "/assets/jewellery.jpg", route: "/jewelry" },
// ];

// const slides = [
//   { image: "/img/bannerbeauty.jpg", caption: "Discover Beauty Deals" },
//   { image: "/img/bannerclothing.jpg", caption: "Latest in Fashion" },
//   { image: "img/bannereltroncs.jpeg", caption: "Smart Electronics" },
//   { image: "/img/bannergroceries.jpg", caption: "Fresh Groceries" },
//   { image: "/img/final.jpg", caption: "Elegant Jewelry" },
// ];

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [productsByCategory, setProductsByCategory] = useState({});


//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(slideInterval);
//   }, []);

//   const handleCategoryClick = (route) => {
//     navigate(route);
//   };
//   useEffect(() => {
//     // Load categories and products dynamically from components
//     const categoryComponents = [
//       { name: "Clothing", route: "/clothing", data: Clothing },
//       { name: "Electronics", route: "/electronics", data: Electronics },
//       { name: "Groceries", route: "/groceries", data: Groceries },
//       { name: "Beauty", route: "/beauty", data: BeautyPersonalCare },
//       { name: "Jewelry", route: "/jewelry", data: Jewelry },
//     ];

//     const loadedCategories = categoryComponents.map((component) => ({
//       name: component.name,
//       route: component.route,
//     }));

//     const loadedProductsByCategory = categoryComponents.reduce((acc, component) => {
//       acc[component.name] = component.data;
//       return acc;
//     }, {});

//     setCategories(loadedCategories);
//     setProductsByCategory(loadedProductsByCategory);

//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(slideInterval);
//   }, []);

//   const handleSearch = () => {
//     // Search for a category first
//     const category = categories.find((cat) =>
//       cat.name.toLowerCase() === searchQuery.toLowerCase()
//     );
//     if (category) {
//       navigate(category.route);
//       return;
//     }

//     // Search for a product within all categories
//     for (const [categoryName, products] of Object.entries(productsByCategory)) {
//       const product = products.find((prod) =>
//         prod.name.toLowerCase() === searchQuery.toLowerCase()
//       );
//       if (product) {
//         navigate(product.route);
//         return;
//       }
//     }

//     alert("No matching category or product found.");
//   };


//   return (
//     <div>
//       {/* Header Section */}
//       <header className={styles.header}>
//         <div className={styles.logoContainer}>
//           <img src="/assets/logo.png" alt="Smart Shop Logo" className={styles.logo} />
//         </div>
//         <h1 className={styles.appName}>Smart Shop</h1>
//         <div className={styles.userOptions}>
//           <button className={`${styles.actionButton}`} onClick={() => navigate("/login")}>
//             <FaSignInAlt /> Login
//           </button>
//           <button className={`${styles.actionButton}`} onClick={() => navigate("/orders")}>
//             <FaShoppingCart /> My Orders
//           </button>
//         </div>
//       </header>

//       {/* Search Bar Section */}
//       <section className={styles.searchSection}
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100px", // Adjust the height as needed
//       }}>
//         <div className={styles.searchContainer}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           padding: "10px",
//           width: "50%",
//           maxWidth: "600px",
//           boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//         }}>
//           <input
//             type="text"
//             placeholder="Search Categories Here..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={styles.searchInput}
//             style={{
//               flex: "1",
//               border: "none",
//               outline: "none",
//               padding: "10px",
//               fontSize: "16px",
//             }}
//           />
//     <button className={styles.searchButton}
//       style={{
//         backgroundColor: "#007bff",
//         border: "none",
//         color: "white",
//         padding: "10px 20px",
//         cursor: "pointer",
//         borderRadius: "5px",
//       }}
//       onClick={handleSearch}
//     >            <FaSearch />
//           </button>
//         </div>
//       </section>

//       {/* Banner Section */}
//       <section className={styles.banner}>
//         <div className={styles.bannerText}>
//           <h2>Welcome to Smart Shop – Your Smartest Choice!</h2>
//           <p>Discover Deals That Define Smart Shopping</p>
//         </div>
//       </section>

//       {/* Slideshow Section */}
//       <section className={styles.slideshow}>
//         <div className={styles.slide}>
//           <img src={slides[currentSlide].image} alt={slides[currentSlide].caption} className={styles.slideImage} />
//           <div className={styles.slideCaption}>{slides[currentSlide].caption}</div>
//         </div>
//       </section>

//       {/* Category Grid */}
//       <section className={styles.categorySection}>
//         <h2 className={styles.sectionTitle}>Explore Categories</h2>
//         <div className={styles.categoryGrid}>
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               className={styles.categoryCard}
//               onClick={() => handleCategoryClick(category.route)}
//             >
//               <img src={category.image} alt={category.name} className={styles.categoryImage} />
//               <div className={styles.categoryName}>{category.name}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <footer
//   style={{
//     backgroundColor: "#14213d", // Background color
//     color: "#fff", // Text color set to white
//     padding: "20px", // Padding for the footer
//     textAlign: "center", // Center align text
//     fontSize: "18px", // Increased font size
//     width: "100%", // Full width
//     minHeight: "80px", // Increased minimum height for the footer
//     display: "flex", // Use flexbox
//     flexDirection: "column", // Stack items vertically
//     justifyContent: "center", // Center content vertically
//     boxSizing: "border-box", // Include padding in width/height calculations
//   }}
// >
//   <div style={{ marginBottom: "15px" }}>
//     <p>
//       <strong>About Us:</strong> ShopSmart is your one-stop destination for the
//       best deals on Clothing, Jewellery, Electronics, Groceries, Beauty &
//       Personal Care...
//     </p>
//     <p>We aim to provide a seamless shopping experience with top-notch features and customer support.</p>
//   </div>
//   <div style={{ marginBottom: "15px" }}>
//     <p>Follow us:</p>
//     <a
//       href="https://www.instagram.com/1234"
//       target="_blank"
//       style={{
//         color: "#f4c10f",
//         margin: "0 10px",
//         textDecoration: "none",
//       }}
//     >
//       Instagram
//     </a>{" "}
//     |{" "}
//     <a
//       href="https://www.facebook.com/1234"
//       target="_blank"
//       style={{
//         color: "#4267B2",
//         margin: "0 10px",
//         textDecoration: "none",
//       }}
//     >
//       Facebook
//     </a>{" "}
//     |{" "}
//     <a
//       href="https://www.twitter.com/1234"
//       target="_blank"
//       style={{
//         color: "#1DA1F2",
//         margin: "0 10px",
//         textDecoration: "none",
//       }}
//     >
//       Twitter
//     </a>
//   </div>
//   <div>
//     <p>
//       Need Help? Contact us at{" "}
//       <a href="mailto:support@shopsmart.com" style={{ color: "#4caf50" }}>
//         support@shopsmart.com
//       </a>
//     </p>
//     <p>&copy; 2024 ShopSmart. All rights reserved.</p>
//   </div>
// </footer>

//     </div>
//   );
// };


// export default HomePage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HomePage.module.css"; // Importing CSS Module
import { FaSignInAlt, FaShoppingCart, FaSearch } from "react-icons/fa";

const categories = [
  { name: "Electronics", image: "/assets/Electronics.jpg", route: "/electronics" },
  { name: "Clothing", image: "/assets/clothing.jpg", route: "/clothing" },
  { name: "Groceries", image: "/assets/groceries.jpg", route: "/groceries" },
  { name: "Beauty", image: "/assets/beauty.jpg", route: "/beauty" },
  { name: "Jewelry", image: "/assets/jewellery.jpg", route: "/jewelry" },
];

const slides = [
  { image: "/img/bannerbeauty.jpg", caption: "Glow Like Never Before: Beauty Awaits!" },
  { image: "/img/bannerclothing.jpg", caption: "Style Meets Comfort: Shop the Latest Trends!" },
  { image: "img/bannerelectronicss.jpg", caption: "Explore the Future: Unbeatable Deals on Electronics!" },
  { image: "/img/bannergroceries.jpg", caption: "Freshness Delivered to Your Doorstep!" },
  { image: "/img/jwellery.jpg", caption: "Sparkle with Elegance: Timeless Jewelry Awaits!" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Slideshow interval
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  const handleSearch = () => {
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (category) {
      navigate(category.route);
    } else {
      alert("No matching category found.");
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
        <img src="/assets/logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </div>
        <h1 className={styles.appName}>Smart Shop</h1>
        <div className={styles.userOptions}>
          <button className={styles.actionButton} onClick={() => navigate("/login")}>
            <FaSignInAlt /> Login
          </button>
        </div>
      </header>

      {/* Search Bar Section */}
      <section className={styles.searchSection} 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", // Adjust the height as needed
      }}>
        <div className={styles.searchContainer}
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          width: "50%",
          maxWidth: "600px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}>
          <input
            type="text"
            placeholder="Search Categories Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            style={{
              flex: "1",
              border: "none",
              outline: "none",
              padding: "10px",
              fontSize: "16px",
            }}
          />
          <button className={styles.searchButton} style={{
        backgroundColor: "#007bff",
        border: "none",
        color: "white",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
      }} onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </section>

      {/* Banner Section */}
      <section className={styles.banner}>
        <div className={styles.bannerText}>
          <h2>Welcome to Smart Shop – Your Smartest Choice!</h2>
          <p>Discover Deals That Define Smart Shopping</p>
        </div>
      </section>

      {/* Slideshow Section */}
      <section className={styles.slideshow}>
        <div className={styles.slide}>
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].caption}
            className={styles.slideImage}
          />
          <div className={styles.slideCaption}>{slides[currentSlide].caption}</div>
        </div>
      </section>

      {/* Category Grid */}
      <section className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>Explore Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category.route)}
            >
              <img src={category.image} alt={category.name} className={styles.categoryImage} />
              <div className={styles.categoryName}>{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
  style={{
    backgroundColor: "#14213d", // Background color
    color: "#fff", // Text color set to white
    padding: "20px", // Padding for the footer
    textAlign: "center", // Center align text
    fontSize: "18px", // Increased font size
    width: "100%", // Full width
    minHeight: "80px", // Increased minimum height for the footer
    display: "flex", // Use flexbox
    flexDirection: "column", // Stack items vertically
    justifyContent: "center", // Center content vertically
    boxSizing: "border-box", // Include padding in width/height calculations
  }}
>
  <div style={{ marginBottom: "15px" }}>
    <p>
      <strong>About Us:</strong> ShopSmart is your one-stop destination for the
      best deals on Clothing, Jewellery, Electronics, Groceries, Beauty &
      Personal Care...
    </p>
    <p>We aim to provide a seamless shopping experience with top-notch features and customer support.</p>
  </div>
  <div style={{ marginBottom: "15px" }}>
    <p>Follow us:</p>
    <a
      href="https://www.instagram.com/1234"
      target="_blank"
      style={{
        color: "#f4c10f",
        margin: "0 10px",
        textDecoration: "none",
      }}
    >
      Instagram
    </a>{" "}
    |{" "}
    <a
      href="https://www.facebook.com/1234"
      target="_blank"
      style={{
        color: "#4267B2",
        margin: "0 10px",
        textDecoration: "none",
      }}
    >
      Facebook
    </a>{" "}
    |{" "}
    <a
      href="https://www.twitter.com/1234"
      target="_blank"
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
      <a href="mailto:support@shopsmart.com" style={{ color: "#4caf50" }}>
        support@shopsmart.com
      </a>
    </p>
    <p>&copy; 2024 ShopSmart. All rights reserved.</p>
  </div>
</footer>
    
    </div>
  );
};

export default HomePage;
