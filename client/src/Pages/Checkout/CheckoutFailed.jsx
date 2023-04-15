import React from "react";
import { Link } from "react-router-dom";

const CheckoutFailed = () => {
  return (
    <div className="checkout-container">
      <h3>Your order could not be placed.</h3>
      <p>Please enter the card details properly and try again.</p>
      <Link to="/">Go back to Home Page</Link>
    </div>
  );
};

export default CheckoutFailed;
