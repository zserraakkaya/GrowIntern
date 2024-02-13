// useState to keep track of active tab of categories
import React, { useState, useEffect } from "react";
// axios
import axios from "axios";
// link
import { Link } from "react-router-dom";
// css for Navbar.jsx
import "./Navbar.css";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faJedi,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// useCart Cart Context to show how many items are on the card at that moment
import { useCart } from "../../Context/CartContext";
// useAuth for signed in users
import { useAuth } from "../../Context/AuthContext";

export const Navbar = ({ setActiveCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const { cartItems } = useCart();

  const { isAuthenticated, signOut } = useAuth();

  const [activeCategory, setLocalActiveCategory] = useState("AllProducts");

  const uniqueCategories = [...new Set(products.map((item) => item.category))];

  const handleCategoryClick = (category) => {
    setLocalActiveCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faJedi} />
      </div>

      <div className="categories">
        <ul>
          <li>
            <a
              href="/"
              onClick={() => handleCategoryClick("AllProducts")}
              className={activeCategory === "AllProducts" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
              <hr
                className={activeCategory === "AllProducts" ? "active" : ""}
              />
            </a>
          </li>
          {uniqueCategories.map((category, index) => (
            <li key={index}>
              <Link
                to="/"
                onClick={() => handleCategoryClick(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <hr className={activeCategory === category ? "active" : ""} />
              </Link>
            </li>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/favorites">
                <button id="favorites">
                  Favorites
                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="profile">
        {isAuthenticated ? (
          <>
            <button onClick={signOut}>Sign Out</button>
            {/* Sell Now button */}
            <Link to="/sellproduct">
              <button>Sell Now!</button>
            </Link>
          </>
        ) : (
          // Sign In button
          <Link to="/signinsignup">
            <button>Sign In</button>
          </Link>
        )}
        <Link to="/cart" className="cart-icon">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </div>
  );
};
