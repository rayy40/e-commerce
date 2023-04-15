import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import axios from "axios";

const AccountOverview = () => {
  const { authState } = useContext(AuthContext);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    if (authState?._id) {
      axios
        .get(`http://localhost:5000/account/order/${authState?._id}`)
        .then((res) => setOrderDetail(res.data))
        .catch((err) => console.log(err.message));
    }
  }, [authState]);

  console.log(orderDetail);

  const formatINR = (amount) => {
    const formattedAmount = amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount;
  };

  const uniqueAddresses = new Map();
  const filteredOrders = orderDetail.filter((order) => {
    const address = `${order?.shipping?.address?.line1} ${order?.shipping?.address?.line2} ${order?.shipping?.address?.city} ${order?.shipping?.address?.postal_code} ${order?.shipping?.address?.state} ${order?.shipping?.address?.country}`;
    if (uniqueAddresses.has(address)) {
      return false;
    } else {
      uniqueAddresses.set(address, true);
      return true;
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10em",
      }}
    >
      <section id="personal-information" className="account-overview-container">
        <div className="account__welcome-column">
          <h3>Welcome {authState?.firstName}</h3>
          <p>
            Here you can keep track of your recent activity, request
            return/exchange authorizations for orders you have received, and
            view and edit your account information or list of favorite items.
          </p>
          <Link to={"/"}>Contact</Link>
        </div>
        <div className="account__contact-column">
          <h4>Contact Information</h4>
          <div className="contact--details">
            <p>{`${authState?.firstName} ${authState?.lastName}`}</p>
            <p>{authState?.email}</p>
          </div>
        </div>
      </section>
      <section id="address" className="account-address-container">
        <h4>Address book</h4>
        <div className="address--details">
          {filteredOrders.map((order) => (
            <div key={order?._id} className="address">
              <p>{order?.shipping?.name}</p>
              <p>{order?.shipping?.address?.line1}</p>
              <p>{order?.shipping?.address?.line2}</p>
              <p>
                {order?.shipping?.address?.city} {order?.shipping?.postal_code}
              </p>
              <p>
                {order?.shipping?.address?.state},{" "}
                {order?.shipping?.address?.country}
              </p>
              <p>{order?.shipping?.phone}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="orders" className="account-orders-container">
        <h4>Orders</h4>
        <div className="order--details">
          {window.innerWidth < 1024 ? (
            orderDetail
              ?.filter((_, i) => i > 2)
              .map((order) => (
                <div className="order-row" key={order?._id}>
                  <p>Order #Id - {order?._id}</p>
                  <div className="item-detail">
                    <div className="item--img">
                      <img src={order?.products?.[0]?.images} alt="shoe-img" />
                    </div>
                    <Link to={`/product/${order?.products?.[0]?.productId}`}>
                      {order?.products?.[0]?.name}
                    </Link>
                  </div>
                  <div className="item-status">
                    <div className="item-status--row">
                      <p>Date: {order?.createdAt.substring(0, 10)}</p>
                      <p>Delivery Status: {order?.delivery_status}</p>
                    </div>
                    <div
                      style={{ textAlign: "right" }}
                      className="item-status--row"
                    >
                      <p>Amount</p>
                      <p>{formatINR(order?.total / 100)}</p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <table>
              <thead>
                <tr>
                  <td>Order</td>
                  <td>Date</td>
                  <td>Status</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {orderDetail
                  ?.filter((_, i) => i > 2)
                  .map((order) => (
                    <tr key={order?._id}>
                      <td>
                        <div className="item-detail">
                          <div className="item--img">
                            <img
                              src={order?.products?.[0]?.images}
                              alt="shoe-img"
                            />
                          </div>
                          <Link
                            to={`/product/${order?.products?.[0]?.productId}`}
                          >
                            {order?.products?.[0]?.name}
                          </Link>
                        </div>
                      </td>
                      <td>{order?.createdAt.substring(0, 10)}</td>
                      <td>{order?.delivery_status}</td>
                      <td>{formatINR(order?.total / 100)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default AccountOverview;
