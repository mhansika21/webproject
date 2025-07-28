
import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Shop from "./Pages/Shop";
import Footer from "./Components/Footer/Footer";
import Wishlist from "./Pages/Wishlist"; // 🔹 import wishlist
import { WishlistProvider } from "./Context/WishlistContext"; // 🔹 wrap context
//import Wishlist from "./Pages/Wishlist";

function App() {
  return (
    <div>
      <BrowserRouter>
        <WishlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCategory category="men" />} />
            <Route path="/womens" element={<ShopCategory category="women" />} />
            <Route path="/kids" element={<ShopCategory category="kid" />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/wishlist" element={<Wishlist />} /> {/* 🔹 new route */}
          </Routes>
          <Footer />
        </WishlistProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
