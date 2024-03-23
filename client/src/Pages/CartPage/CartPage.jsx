import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { CartContext } from "../../Helpers/CartContext";
import { OverlayContext } from "../../Helpers/OverlayContext";
import useComponentVisible from "../../Helpers/useClickedOutside";
import { Link } from "react-router-dom";
import PayButton from "../../Components/PayButton/PayButton";
import { convertUSDToINR } from "../../Helpers/utils";
import CartPlaceholder from "../../Assets/cart-placeholder";

const CartPage = () => {
  const history = useHistory();
  const { cartData, removeFromCart, getSubtotal, addToCart } =
    useContext(CartContext);
  const { dropDownRef, editProductRef } = useComponentVisible();
  const {
    isDropdownOpen,
    setIsDowndownOpen,
    setIsEditProductSeleted,
    isEditProductSelected,
  } = useContext(OverlayContext);
  const [dropDownIndex, setDropDownIndex] = useState(0);
  const [editProduct, setEditProduct] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div style={{ height: "100vh" }} className="loading-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className="cart-page-container">
      <div className="cart-page-container__left">
        <h3>Your bag</h3>
        <p onClick={() => history.goBack()}>
          <span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          Keep shopping
        </p>
      </div>
      <div className="cart-page-container__right">
        <div className="cart-table">
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Brand</td>
                <td>Color</td>
                <td>QTY</td>
                <td></td>
                <td>Price</td>
              </tr>
            </thead>
            {window.innerWidth > 767 && (
              <tbody>
                {cartData?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>
                      <Link to={`/product/${item?.id}`}>
                        <div className="product--detail">
                          <div className="product--img">
                            {item?.media?.thumbUrl ? (
                              <img
                                src={item?.media?.thumbUrl}
                                alt={`${item?.shoe}-img`}
                              />
                            ) : (
                              <CartPlaceholder />
                            )}
                          </div>
                          <p>{item?.title}</p>
                        </div>
                      </Link>
                    </td>
                    <td>{item?.brand}</td>
                    <td>{item?.colorway}</td>
                    <td>
                      <div className="quantity-container">
                        <div ref={dropDownRef} className="dropdown">
                          <button
                            onClick={() => {
                              setIsDowndownOpen((v) => !v);
                              setDropDownIndex(index + 1);
                            }}
                            className="dropbtn"
                          >
                            {item?.quantity}
                            <FontAwesomeIcon
                              className="icon"
                              icon={faChevronDown}
                            />
                          </button>
                          <div
                            className={`dropdown-content ${
                              dropDownIndex === index + 1 &&
                              isDropdownOpen &&
                              "dropdown-content--active"
                            }`}
                          >
                            <ul>
                              {Array.from(Array(10).keys()).map((qty) => (
                                <li
                                  key={Math.random() + qty}
                                  onClick={() => {
                                    addToCart(item, qty + 1);
                                    setIsDowndownOpen(false);
                                  }}
                                >
                                  <span>{qty + 1}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span onClick={() => removeFromCart(item, "deleteItem")}>
                        Remove
                      </span>
                    </td>
                    <td>{convertUSDToINR(item?.retailPrice)}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {window.innerWidth < 767 && (
            <div className="cart-table__extensive">
              <ul>
                {cartData?.map((item) => (
                  <li key={item?.id} className="cart-table__row">
                    <div className="cart-table__row--left">
                      <Link className="product" to={`/product/${item?.id}`}>
                        <div className="product--img">
                          <img
                            src={item?.media?.thumbUrl}
                            alt={`${item?.shoe}-img`}
                          />
                        </div>
                      </Link>
                      <div className="product-detail">
                        <p>
                          <span>{item?.quantity}x </span> {item?.title}
                        </p>
                        <p>{item?.brand}</p>
                        <p>{item?.colorway}</p>
                      </div>
                    </div>
                    <div className="cart-table__row--right">
                      <p>{convertUSDToINR(item?.retailPrice)}</p>
                      <p
                        onClick={() => {
                          setEditProduct(item);
                          setIsEditProductSeleted(true);
                        }}
                      >
                        Edit
                      </p>
                      <p onClick={() => removeFromCart(item, "deleteItem")}>
                        Remove
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {window.innerWidth < 767 && (
          <div
            ref={editProductRef}
            className={`modal-edit-cart ${
              isEditProductSelected && "modal-edit-cart--active"
            }`}
          >
            <div className="edit-cart">
              <div className="edit-cart__header">
                <h3>Edit</h3>
              </div>
              <div className="edit-cart__body">
                <div className="product">
                  <div className="product--left">
                    <div className="product-img">
                      <img
                        src={editProduct?.media?.thumbUrl}
                        alt={`${editProduct?.title}-img`}
                      />
                    </div>
                    <div className="product-detail">
                      <p>{editProduct?.title}</p>
                      <p>{editProduct?.brand}</p>
                      <p>{editProduct?.colorway}</p>
                    </div>
                  </div>
                  <div className="product--right">
                    <p>${editProduct?.retailPrice}</p>
                  </div>
                </div>
                <div className="quantity-container">
                  <div ref={dropDownRef} className="dropdown">
                    <button
                      onClick={() => {
                        setIsDowndownOpen((v) => !v);
                      }}
                      className="dropbtn"
                    >
                      {dropDownIndex + 1}
                      <FontAwesomeIcon className="icon" icon={faChevronDown} />
                    </button>
                    <div
                      className={`dropdown-content ${
                        isDropdownOpen && "dropdown-content--active"
                      }`}
                    >
                      <ul>
                        {Array.from(Array(10).keys()).map((qty) => (
                          <li
                            key={Math.random() + qty}
                            onClick={() => {
                              setDropDownIndex(qty);
                              setIsDowndownOpen(false);
                            }}
                          >
                            <span>{qty + 1}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart(editProduct, dropDownIndex + 1);
                    setIsEditProductSeleted(false);
                  }}
                  className="save-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="cart-summary">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>{getSubtotal()}</p>
          </div>
          <PayButton setIsLoading={setIsLoading} cartItems={cartData} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
