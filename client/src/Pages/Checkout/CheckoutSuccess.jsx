import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="checkout-container">
      <h3>Your order has been placed successfully.</h3>
      <Link to="/">Coninue Shopping</Link>
    </div>
  );
};

export default CheckoutSuccess;
