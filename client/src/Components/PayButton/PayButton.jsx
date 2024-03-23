import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";
import { CartContext } from "../../Helpers/CartContext";

const PayButton = ({ cartItems, setIsLoading }) => {
  const { authState } = useContext(AuthContext);
  const { setCartData } = useContext(CartContext);

  const handleCheckout = () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/stripe/create-checkout-session`,
        {
          cartItems,
          userId: authState?._id,
        }
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.url) {
          setCartData([]);
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <button onClick={() => handleCheckout()} className="checkout-btn">
      Checkout <FontAwesomeIcon className="icon" icon={faArrowRight} />
    </button>
  );
};

export default PayButton;
