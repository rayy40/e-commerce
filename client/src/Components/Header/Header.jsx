import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faSearch,
  faMultiply,
} from "@fortawesome/free-solid-svg-icons";
import useComponentVisible from "../../Helpers/useClickedOutside";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { OverlayContext } from "../../Helpers/OverlayContext";
import logo from "../../Assets/next-logo.png";
import sizeGuide from "../../Assets/size-guide.gif";
import { CartContext } from "../../Helpers/CartContext";
import { AuthContext } from "../../Helpers/AuthContext";
import { SearchContext } from "../../Helpers/SearchContext";

export default function Header() {
  const { authState, user, logout } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);
  const { setSearchTerm } = useContext(SearchContext);
  const { sizeGuideRef, searchBarRef, cartRef, accountBoxRef } =
    useComponentVisible(false);
  const {
    isSearchBarVisible,
    isCartVisible,
    isSizeGuideVisible,
    isExchangeComponentVisible,
    isEditProductSelected,
    setIsCartVisible,
    setIsSearchBarVisible,
    setIsSizeGuideVisible,
    setIsAccountBoxVisible,
    isCartPulledUp,
    isAccountBoxVisible,
  } = useContext(OverlayContext);
  const history = useHistory();
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        document.querySelector(".header-container").classList.add("header--bg");
      } else {
        document
          .querySelector(".header-container")
          .classList.remove("header--bg");
      }
    });
    return () => {
      window.removeEventListener("scroll", () => console.log("Remove Scroll"));
    };
  }, []);

  const handleLogout = async (e) => {
    try {
      await logout(user);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`header-container ${
        (isSearchBarVisible ||
          isSizeGuideVisible ||
          isCartVisible ||
          isCartPulledUp ||
          isEditProductSelected ||
          isAccountBoxVisible ||
          isExchangeComponentVisible) &&
        "overlay-container"
      }`}
    >
      <div className="cursor remove--cursor">
        <i className="fas fa-times"></i>
      </div>
      <div className="header-container__main-menu">
        <ul className="mobile--nav-bar">
          <li
            onClick={() => {
              !isNavBarActive
                ? document
                    .querySelector(".header-overlay__nav-bar")
                    .classList.add("header-overlay__nav-bar--active")
                : document
                    .querySelector(".header-overlay__nav-bar")
                    .classList.remove("header-overlay__nav-bar--active");
              setIsNavBarActive((v) => !v);
            }}
          >
            <FontAwesomeIcon
              className="bars-icon"
              icon={isNavBarActive ? faMultiply : faBars}
            />
          </li>
          <li onClick={() => history.push("/")} style={{ zIndex: "2" }}>
            <img
              style={{ paddingTop: "0.25em" }}
              src={logo}
              alt="logo"
              className="logo"
            />
          </li>
          <li style={{ zIndex: "2" }}>
            {isCartVisible || isSizeGuideVisible ? (
              <FontAwesomeIcon
                onClick={() => {
                  setIsCartVisible(false);
                  setIsSizeGuideVisible(false);
                }}
                style={{ fontSize: "1.75rem", margin: "0 0.25em" }}
                icon={faMultiply}
              />
            ) : (
              <div onClick={() => setIsCartVisible(true)} className="cart">
                {cartData.reduce((total, item) => total + item.quantity, 0)}
              </div>
            )}
          </li>
        </ul>
        <ul className="desktop--nav-bar">
          <li onClick={() => history.push("/")}>
            <img src={logo} alt="logo" className="logo" />
          </li>
          <li>
            <Link
              className={pathname === "/category/men" ? "selected-link" : ""}
              to="/category/men"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/category/women" ? "selected-link" : ""}
              to="/category/women"
            >
              Women
            </Link>
          </li>
        </ul>
        <ul className="desktop--nav-bar">
          <li
            className="header-items--right"
            onClick={() => setIsSearchBarVisible(true)}
          >
            Search
          </li>
          <li
            onClick={() => setIsAccountBoxVisible(true)}
            className="header-items--right"
          >
            {authState?._id ? authState?.firstName : "My account"}
          </li>
          <li>
            <div onClick={() => setIsCartVisible(true)} className="cart">
              {cartData.reduce((total, item) => total + item.quantity, 0)}
            </div>
          </li>
        </ul>
      </div>
      <div
        ref={cartRef}
        className={`header-overlay__shopping-cart ${
          isCartVisible && "header-overlay__shopping-cart--active"
        }`}
      >
        <ShoppingCart />
      </div>
      <div
        ref={accountBoxRef}
        className={`header-overlay__account-box ${
          isAccountBoxVisible && "header-overlay__account-box--active"
        }`}
      >
        <div className="header-overlay__account-box__inner">
          <div className="account-box--content">
            {authState?._id ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <Link
                  style={{ width: "fit-content" }}
                  onClick={() => setIsAccountBoxVisible(false)}
                  to={"/account#personal-information"}
                >
                  Personal Information
                </Link>
                <Link
                  style={{ width: "fit-content" }}
                  onClick={() => setIsAccountBoxVisible(false)}
                  to={"/account#orders"}
                >
                  Orders
                </Link>
              </div>
            ) : (
              <p>
                Create an account or log in to view your orders, return or
                adjust your personal information.
              </p>
            )}
          </div>
          <div className="account-box--footer">
            {authState?._id ? (
              <p
                onClick={() => {
                  handleLogout();
                  setIsAccountBoxVisible(false);
                  history.push("/account/login");
                }}
                className="logout--link"
              >
                Logout
              </p>
            ) : (
              <Link
                onClick={() => setIsAccountBoxVisible(false)}
                to="/account/register"
              >
                Create account
              </Link>
            )}
            <Link
              style={{ appearance: "none" }}
              to={`/account${authState?._id ? "" : "/login"}`}
            >
              <button onClick={() => setIsAccountBoxVisible(false)}>
                {authState?._id ? "My account" : "Login"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="header-overlay__nav-bar">
        <div className="header-overlay__nav-bar__inner">
          <ul>
            <li
              onClick={() => {
                document
                  .querySelector(".header-overlay__nav-bar")
                  .classList.remove("header-overlay__nav-bar--active");
                setIsNavBarActive(false);
              }}
            >
              <Link to="/explore-all">Shop All</Link>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
            <li
              onClick={() => {
                document
                  .querySelector(".header-overlay__nav-bar")
                  .classList.remove("header-overlay__nav-bar--active");
                setIsNavBarActive(false);
              }}
            >
              <Link to="/category/men">Men</Link>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
            <li
              onClick={() => {
                document
                  .querySelector(".header-overlay__nav-bar")
                  .classList.remove("header-overlay__nav-bar--active");
                setIsNavBarActive(false);
              }}
            >
              <Link to="/category/women">Women</Link>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
            <li
              onClick={() => {
                document
                  .querySelector(".header-overlay__nav-bar")
                  .classList.remove("header-overlay__nav-bar--active");
                setIsNavBarActive(false);
              }}
            >
              <Link to="/search">Search</Link>
              <FontAwesomeIcon icon={faSearch} />
            </li>
          </ul>
          <Link
            onClick={() => {
              document
                .querySelector(".header-overlay__nav-bar")
                .classList.remove("header-overlay__nav-bar--active");
              setIsNavBarActive(false);
            }}
            className="account-link"
            to={`/account${authState?._id ? "" : "/login"}`}
          >
            {authState?._id ? authState?.firstName : "My Account"}
          </Link>
        </div>
      </div>
      <div
        ref={searchBarRef}
        className={`header-overlay__search-bar ${
          isSearchBarVisible && "header-overlay__search-bar--active"
        }`}
      >
        <div className="header-overlay-search__inner">
          <input
            onKeyDown={(e) =>
              e.key === "Enter" && history.push(`/search/${e.target.value}`)
            }
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            type="text"
            placeholder="Start typing what you're looking for"
            className="header-overlay-search__inner__input"
          />
        </div>
      </div>
      <div
        ref={sizeGuideRef}
        className={`header-overlay__size-guide ${
          isSizeGuideVisible && "header-overlay__size-guide--active"
        }`}
      >
        <div className="header-overlay__size-guide__inner">
          {/* <FontAwesomeIcon
            onClick={() => setIsSizeGuideVisible(false)}
            className="icon"
            icon={faMultiply}
          /> */}
          <div className="size-guide__table">
            <table>
              <thead>
                <tr>
                  <th>EU</th>
                  <th>36</th>
                  <th>37</th>
                  <th>38</th>
                  <th>39</th>
                  <th>40</th>
                  <th>41</th>
                  <th>42</th>
                  <th>43</th>
                  <th>44</th>
                  <th>45</th>
                  <th>46</th>
                  <th>47</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ paddingLeft: 0, textAlign: "left" }}>US M</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                  <td>12</td>
                  <td>13</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 0, textAlign: "left" }}>UK M</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                  <td>12</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 0, textAlign: "left" }}>CM</td>
                  <td>23,8</td>
                  <td>24,4</td>
                  <td>25,1</td>
                  <td>25,7</td>
                  <td>26,4</td>
                  <td>27</td>
                  <td>27,7</td>
                  <td>28,3</td>
                  <td>28,9</td>
                  <td>29,6</td>
                  <td>30,2</td>
                  <td>30,9</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="size-guide__info">
            <div className="size-guide__info-text">
              <h3>How to measure</h3>
              <p>
                Let’s find your perfect fit. Place a sheet of paper on the floor
                against the wall and put your feet (with socks) on it, heels
                against the wall. Make sure you lean on your feet with full
                power when measuring. Now you simply draw a line at the end of
                the biggest foot. Measure the distance with a ruler and find the
                size that matches it: see size table. Are you in between sizes?
                In that case, we suggest taking the bigger size.
              </p>
            </div>
            <div className="size-guide__info-img">
              <img src={sizeGuide} alt="size-guide" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
