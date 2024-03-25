import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Helpers/CartContext";

const CheckoutSuccess = () => {
  const { setCartData } = useContext(CartContext);

  useEffect(() => {
    setCartData([]);
    localStorage.removeItem("cart");
  }, [setCartData]);

  return (
    <div className="checkout-container">
      <h3>Your order has been placed successfully.</h3>
      <Link to="/">Coninue Shopping</Link>
    </div>
  );
};

export default CheckoutSuccess;
