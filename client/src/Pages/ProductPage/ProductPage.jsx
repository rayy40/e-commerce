import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { requestShoesById, requestShoesByStyleId } from "../../Api/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faTruckFast,
  faMultiply,
  faChevronLeft,
  faChevronRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayContext } from "../../Helpers/OverlayContext";
import useComponentVisible from "../../Helpers/useClickedOutside";
import { CartContext } from "../../Helpers/CartContext";
import ProductPageSkeleton from "../../Components/SkeletonLoading/ProductPageSkeleton";
import CarouselSkeleton from "../../Components/SkeletonLoading/CarouselSkeleton";
import { Link } from "react-router-dom";
import { convertUSDToINR } from "../../Helpers/utils";
import Placeholder from "../../Assets/slider-placeholder";

const ProductPage = () => {
  const { id } = useParams();
  const { exchangeRef, selectSizeRef } = useComponentVisible(false);
  let sliderRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const {
    isExchangeComponentVisible,
    isSelectSizeVisible,
    setIsSizeGuideVisible,
    setIsSelectSizeVisible,
    setIsCartVisible,
    setIsExchangeComponentVisible,
    setIsCartPulledUp,
    isCartPulledUp,
  } = useContext(OverlayContext);
  const [size, setSize] = useState("-");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsTabletScreen(window.innerWidth < 768);
      setIsMobileScreen(window.innerWidth < 500);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading } = useQuery(
    "shoeDataById",
    () =>
      axios({
        ...requestShoesById,
        url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers/${id}`,
      }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: similarShoesData, isLoading: isSimilarShoesLoading } = useQuery(
    ["similarShoesData", id],
    () =>
      axios({
        ...requestShoesByStyleId,
        params: {
          ...requestShoesByStyleId.params,
          shoe: data?.results?.[0]?.shoe,
        },
      }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      enabled: !!data?.results?.[0]?.styleId,
    }
  );

  return (
    <div className="product-page-container__wrapper">
      {isLoading ? (
        <ProductPageSkeleton />
      ) : (
        <div className="product-page-container">
          <div className="product-page-container__product">
            <div className="product-container">
              {data?.results?.[0]?.media?.imageUrl ? (
                <img
                  style={{ aspectRatio: "1/0.7" }}
                  src={data?.results?.[0]?.media?.imageUrl}
                  alt={`${data?.results?.[0]?.name}-img`}
                />
              ) : (
                <Placeholder />
              )}
            </div>
          </div>
          <div
            className={`product-page-container__detail ${
              isCartPulledUp && "product-page-container__detail--active"
            }`}
          >
            <div className="product-page-container__detail__inner">
              <button
                onTouchStart={() => setIsCartPulledUp((v) => !v)}
                className="drag-top-button"
              ></button>
              <div className="product-detail">
                <h2>{data?.results?.[0]?.shoe}</h2>
                <p className="name">{data?.results?.[0]?.name}</p>
                <p>{convertUSDToINR(data?.results?.[0]?.retailPrice)}</p>
              </div>
              <button
                onClick={() => {
                  setIsSelectSizeVisible(true);
                  setIsCartPulledUp(false);
                }}
                className="select-size"
              >
                {size?.length > 2 ? size : "Select size"}
                <FontAwesomeIcon className="icon" icon={faCaretDown} />
              </button>
              <button
                disabled={size.length > 2 ? false : true}
                onClick={() => {
                  addToCart({ ...data?.results?.[0], size: size });
                  setIsCartVisible(true);
                }}
                className={`add-to-bag ${
                  size.length < 2 && "add-to-bag--disabled"
                }`}
              >
                Add to bag&nbsp;
                <FontAwesomeIcon className="icon" icon={faArrowRightLong} />
              </button>
              <span
                onClick={() => {
                  setIsSizeGuideVisible(true);
                  setIsCartPulledUp(false);
                }}
              >
                How to find my size
              </span>
              <div className="shipping-charges">
                <FontAwesomeIcon className="icon" icon={faTruckFast} />
                <div className="content">
                  <h4>Free and fast delivery</h4>
                  <p>
                    Orders placed before 23:30 are shipped the same day (Monday
                    - Friday). Enjoy free shipping on all orders above €150 in
                    the EU and the UK.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setIsExchangeComponentVisible(true);
                  setIsCartPulledUp(false);
                }}
                className="return-and-exchanges"
              >
                <svg
                  width="21"
                  height="21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.65951 8.30163c.33911 0 .61384.27486.61384.61414 0 .33901-.27476.61385-.61384.61385H5.37952l-.08847.00121c-1.11828.03056-2.14367.63907-2.70522 1.61147-.57607.9982-.57607 2.228-.00003 3.2261.57633.9981 1.64121 1.6128 2.79372 1.6128h6.62238l-2.36148-2.3666-.02923-.0374c-.16483-.2307-.14088-.5677.07399-.7826.2268-.2268.58992-.2409.83332-.0324l3.3996 3.4007.0324.0351c.2047.2403.1939.6019-.0329.8301l-3.4127 3.4127-.0381.041c-.1178.1171-.2633.1807-.4171.1866-.17087.0064-.33685-.0586-.45769-.1794-.12087-.1209-.18588-.2869-.17944-.458.00661-.1706.08436-.3313.21407-.4424l2.37526-2.3793H5.37951l-.09726-.0011c-1.55359-.0338-2.9804-.876-3.75978-2.2259-.795584-1.3779-.795584-3.0758 0-4.4537.7956-1.37805 2.26591-2.22697 3.85705-2.22697h1.27999ZM11.4236.749047c.228-.135724.5401-.103077.743.099824.2268.226799.2409.589919.0324.833269L9.84982 4.03542h6.62238l.1106.00137c1.1409.02832 2.2294.49402 3.0388 1.30316.835.83539 1.3042 1.9682 1.3042 3.14928 0 1.18119-.4691 2.31397-1.3043 3.14927-.8354.8353-1.9682 1.3046-3.1493 1.3046h-1.2799l-.042-.0015c-.3195-.0216-.5719-.2876-.5719-.6126 0-.3391.2748-.6139.6139-.6139h1.2799l.0885-.0012c1.1184-.0306 2.1438-.6391 2.7053-1.6116.576-.9981.576-2.2279 0-3.22599-.5763-.9981-1.6412-1.6128-2.7938-1.6128H9.84982l2.36158 2.36663.0292.03741c.1648.23062.1409.56765-.074.78251-.2268.22678-.5899.24087-.8332.03242L7.93369 5.08181l-.03233-.0351c-.20475-.24029-.19395-.60188.03286-.83012L11.3469.803937l.0374-.029192.0393-.025698Z"
                    fill="#333"
                  ></path>
                </svg>
                <div className="content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Easy returns</h4>
                    <svg
                      width="13"
                      height="14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.16677 10.2383V.979248h9.25903V10.2383H3.16677Zm1.38885-7.8702h6.48128v6.4813H4.55562V2.3681Z"
                        fill="#000"
                      ></path>
                      <path
                        d="M.425781 6.118H1.81463v5.5138h5.648v1.3888H.425781V6.118Z"
                        fill="#000"
                      ></path>
                    </svg>
                  </div>
                  <p>
                    Exchange or return your product(s) within 14 days of
                    receiving your order.
                  </p>
                </div>
              </div>
              {window.innerWidth < 1024 && (
                <div className="similar-items-container">
                  <div className="similar-items-container__header">
                    <h2>You might also like.</h2>
                  </div>
                  <div className="similar-items-container__body">
                    <ul>
                      {similarShoesData?.results?.map((item) => (
                        <li key={item?.id}>
                          <Link to={`/product/${item?.id}`}>
                            <div className="similar-items-container__body-item">
                              <div className="body-item--img">
                                {item.media.imageUrl ? (
                                  <img
                                    style={{ aspectRatio: "1/0.7" }}
                                    src={item.media.imageUrl}
                                    alt={item.shoe + "-img"}
                                  />
                                ) : (
                                  <Placeholder />
                                )}
                              </div>
                              <div className="body-item--content">
                                <p>{item.name}</p>
                                <p className="item--name">{item.shoe}</p>
                                <span>
                                  {convertUSDToINR(item?.retailPrice)}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            ref={selectSizeRef}
            className={`overlay-wrapper ${
              isSelectSizeVisible && "overlay-wrapper--active"
            }`}
          >
            <div className="overlay-wrapper__inner">
              <button onClick={() => setIsSelectSizeVisible(false)}></button>
              <div className="select-size__header">
                <h3>Select Size</h3>
                <FontAwesomeIcon
                  onClick={() => setIsSelectSizeVisible(false)}
                  className="icon"
                  icon={faMultiply}
                />
              </div>
              <div className="select-size__body">
                <ul>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 38 | US 5 | UK 4
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 39 | US 6 | UK 5
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 40 | US 7 | UK 6
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 41 | US 8 | UK 7
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 42 | US 9 | UK 8
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 43 | US 10 | UK 9
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 44 | US 11 | UK 10
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 45 | US 12 | UK 11
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 46 | US 13 | UK 12
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        setSize(e.target.innerHTML);
                        setIsSelectSizeVisible(false);
                      }}
                      className="size-btn"
                    >
                      EU 47 | US 14 | UK 13
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            ref={exchangeRef}
            className={`overlay-wrapper ${
              isExchangeComponentVisible && "overlay-wrapper--active"
            }`}
          >
            <div className="overlay-wrapper__inner">
              <button
                onClick={() => setIsExchangeComponentVisible(false)}
              ></button>
              <div className="return-and-exchanges__header">
                <h3>Returns & exchanges</h3>
                <FontAwesomeIcon
                  onClick={() => setIsExchangeComponentVisible(false)}
                  className="icon"
                  icon={faMultiply}
                />
              </div>
              <div className="return-and-exchanges__body">
                <p>You may return your order by sending it back to us.</p>
                <h4>Our return policy</h4>
                <ul>
                  <li>
                    Please return your order within 14 days of receiving it.
                  </li>
                  <li>
                    Make sure all items are clean and unworn. All original tags
                    and dust bags must be included.
                  </li>
                  <li>
                    The cost of a return is at your own expense, including
                    import duties.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {window.innerWidth > 1024 && (
        <div className="similar-items-container">
          <div className="similar-items-container__header">
            <h2>You might also like.</h2>
            <div className="arrow-container">
              <button
                onClick={() => sliderRef.current.slickPrev()}
                className={`arrow-btn left-arrow ${
                  sliderIndex === 0 && "disable--arrow"
                }`}
              >
                <FontAwesomeIcon className="arrow--icon" icon={faChevronLeft} />
              </button>
              <button
                onClick={() => sliderRef.current.slickNext()}
                className={`arrow-btn right-arrow ${
                  sliderIndex === 17 && "disable--arrow"
                }`}
              >
                <FontAwesomeIcon
                  className="arrow--icon"
                  icon={faChevronRight}
                />
              </button>
            </div>
          </div>
          <div className="similar-items-container__body">
            {isLoading && isSimilarShoesLoading ? (
              <div className="home-container__top-models__body--loading">
                {Array(isMobileScreen ? 1 : isTabletScreen ? 2 : 3)
                  .fill()
                  .map((_, index) => (
                    <CarouselSkeleton key={index + Math.random()} />
                  ))}
              </div>
            ) : (
              <Slider
                ref={sliderRef}
                slidesToShow={isMobileScreen ? 1 : isTabletScreen ? 2 : 3}
                slidesToScroll={1}
                infinite={false}
                centerMode={false}
                afterChange={(e) => setSliderIndex(e)}
              >
                {similarShoesData?.results?.map((item) => (
                  <Link to={`/product/${item?.id}`}>
                    <div
                      key={item.id}
                      className="similar-items-container__body-item"
                    >
                      <div className="body-item--img">
                        {item.media.imageUrl ? (
                          <img
                            style={{ aspectRatio: "1/0.7" }}
                            src={item.media.imageUrl}
                            alt={item.shoe + "-img"}
                          />
                        ) : (
                          <Placeholder />
                        )}
                      </div>
                      <div className="body-item--content">
                        <p>{item.name}</p>
                        <p className="item--name">{item.shoe}</p>
                        <span>{convertUSDToINR(item?.retailPrice)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
