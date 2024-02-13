import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import { FavoriteProvider } from "./Context/FavoriteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <FavoriteProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoriteProvider>
  </AuthProvider>
);

reportWebVitals();
