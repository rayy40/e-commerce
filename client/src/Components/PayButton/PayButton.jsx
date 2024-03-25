import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";

const PayButton = ({ cartItems, setIsLoading }) => {
  const { authState } = useContext(AuthContext);

  const modifiedCartItems = cartItems.map((item) => {
    const { size, ...itemWithoutSize } = item;
    return itemWithoutSize;
  });

  const handleCheckout = () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/stripe/create-checkout-session`,
        {
          modifiedCartItems,
          userId: authState?._id,
        }
      )
      .then((res) => {
        if (res.data.url) {
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
