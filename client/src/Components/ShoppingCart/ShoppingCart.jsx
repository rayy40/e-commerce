import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { CartContext } from "../../Helpers/CartContext";
import { Link } from "react-router-dom";
import { OverlayContext } from "../../Helpers/OverlayContext";
import { convertUSDToINR } from "../../Helpers/utils";

const ShoppingCart = () => {
  const { cartData, removeFromCart, getSubtotal } = useContext(CartContext);
  const { setIsCartVisible } = useContext(OverlayContext);

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-container__items">
        <ul>
          {cartData?.map((item, index) => (
            <li key={index}>
              <Link
                onClick={() => setIsCartVisible(false)}
                to={`/product/${item?.id}`}
                className="item"
              >
                <div className="item-img">
                  <img src={item?.media?.thumbUrl} alt={`${item?.shoe}-img`} />
                </div>
                <div className="item-detail">
                  <p className="item-name">{item?.shoe}</p>
                  <p>
                    <span>{item?.quantity}x </span>
                    {item?.brand}
                  </p>
                </div>
              </Link>
              <div className="item-price">
                <p>{convertUSDToINR(item?.retailPrice)}</p>
                <span onClick={() => removeFromCart(item)}>Remove</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="shopping-cart-container__checkout">
        <ul style={{ borderTop: cartData?.length > 0 && "1px solid #e4e4e4" }}>
          {cartData?.length > 0 ? (
            <li>
              <p>Subtotal:</p>
              <p>{getSubtotal()}</p>
            </li>
          ) : (
            <li style={{ fontSize: "0.925rem", border: "none transparent" }}>
              Your bag is currently empty
            </li>
          )}
          <li
            style={{ paddingBottom: window.innerWidth < 1024 ? "0" : "1.25em" }}
          >
            <div className="checkout-btn-container">
              <Link to="/cart">
                <button
                  onClick={() => setIsCartVisible(false)}
                  className="checkout-btn"
                >
                  Checkout
                  <FontAwesomeIcon className="icon" icon={faArrowRightLong} />
                </button>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingCart;
