import React, { createContext, useState, useEffect } from 'react';
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

// Default cart structure
const getDefaultCart = () => {
  return {};
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartSize, setCartSize] = useState(0);

  // Update total cart item count whenever cartItems changes
  useEffect(() => {
    const size = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    setCartSize(size);
  }, [cartItems]);

  // Add item to cart
  const addToCart = (itemId, size) => {
    const key = `Rs{itemId}_Rs{size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: {
        id: itemId,
        size,
        quantity: prev[key] ? prev[key].quantity + 1 : 1,
      },
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId, size) => {
    const key = `Rs{itemId}_Rs{size}`;
    setCartItems((prev) => {
      if (!prev[key]) return prev;

      const newQty = prev[key].quantity - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }

      return {
        ...prev,
        [key]: {
          ...prev[key],
          quantity: newQty,
        },
      };
    });
  };

  const contextValue = {
    all_product,
    cartItems,
    cartSize,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
