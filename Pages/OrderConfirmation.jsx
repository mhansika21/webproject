import React from "react";
import { useLocation } from "react-router-dom";
import './CSS/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="order-confirmation-container">
      <h2>🎉 Thank you for your purchase!</h2>
      {orderId ? (
        <>
          <p>🧾 Your Order ID is: <strong>{orderId}</strong></p>
          <p>📦 Status: Processing</p>
        </>
      ) : (
        <p>⚠️ No order ID found. Please check your order history or try again.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
