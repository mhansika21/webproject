import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Add product to wishlist only if not already added
  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  // Remove product from wishlist by productId
  const removeFromWishlist = (productId) => {
    console.log('Removing from wishlist:', productId);
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the Wishlist context easily
export const useWishlist = () => useContext(WishlistContext);
