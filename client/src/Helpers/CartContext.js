import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartData: null,
  setCartData: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getSubtotal: () => {},
});

export const CartProvider = (props) => {
  const [cartData, setCartData] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });

  // Get cart items from local storage on page load
  useEffect(() => {
    const storedCartData = localStorage.getItem("cart");
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  // Update cart items in local storage whenever cartData changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (item, quantity = 1) => {
    const index = cartData.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      const newCartData = [...cartData];
      setCartData([...cartData, { ...item, quantity: quantity }]);
      localStorage.setItem("cart", JSON.stringify(newCartData));
    } else {
      const newCartData = [...cartData];
      newCartData[index].quantity = quantity;
      setCartData(newCartData);
      localStorage.setItem("cart", JSON.stringify(newCartData));
    }
  };

  const removeFromCart = (item, deleteItem = false) => {
    const newCartData = [...cartData];
    const index = newCartData.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      if (deleteItem || newCartData[index].quantity === 1) {
        newCartData.splice(index, 1);
      } else {
        newCartData[index] = {
          ...newCartData[index],
          quantity: newCartData[index].quantity - 1,
        };
      }
      setCartData(newCartData);
      localStorage.setItem("cart", JSON.stringify(newCartData));
    }
  };

  const getSubtotal = () => {
    const exchangeRate = 82.84; // current exchange rate as of August 4th, 2023
    const subtotal = cartData.reduce((total, item) => {
      const convertedAmount = item.retailPrice * exchangeRate;
      const subTotalAmount = convertedAmount * item.quantity;
      return total + subTotalAmount;
    }, 0);
    const formattedAmount = subtotal.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount;
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        removeFromCart,
        addToCart,
        getSubtotal,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
