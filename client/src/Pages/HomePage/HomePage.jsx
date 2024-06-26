import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { requestNewIn } from "../../Api/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import MenCollections from "../../Assets/men-category.webp";
import WomenCollections from "../../Assets/women-category.jpg";
import CarouselSkeleton from "../../Components/SkeletonLoading/CarouselSkeleton";
import { Link } from "react-router-dom";
import { convertUSDToINR } from "../../Helpers/utils";
import Placeholder from "../../Assets/slider-placeholder";
import Error from "../../Components/Error/Error";

export default function HomePage() {
  const sliderRef = useRef(null);
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

  const {
    data: newInData,
    isLoading,
    error,
    isError,
  } = useQuery("data", () => axios(requestNewIn), {
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  if (isError) {
    return <Error error={error} />;
  }

  if (!newInData || newInData?.data?.results.length === 0) {
    return <Error error={"No data found"} />;
  }

  return (
    <div className="home-container">
      <div className="home-container__gender">
        <Link to={"/category/men"}>
          <div className="home-container__gender__box">
            <img src={MenCollections} alt="discover-man-clothing" />
            <div className="box--overlay__content">
              <h1>Man</h1>
              <p>Collections 2021</p>
            </div>
          </div>
        </Link>
        <Link to={"/category/women"}>
          <div className="home-container__gender__box">
            <img src={WomenCollections} alt="discover-woman-clothing" />
            <div className="box--overlay__content">
              <h1>Woman</h1>
              <p>Collections 2021</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="home-container__top-models">
        <div className="home-container__top-models__header">
          <h2>Our favorite models</h2>
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
              <FontAwesomeIcon className="arrow--icon" icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="home-container__top-models__body">
          {isLoading ? (
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
              afterChange={(e) => setSliderIndex(e)}
            >
              {newInData?.data?.results.map((item) => (
                <Link to={`/product/${item?.id}`}>
                  <div
                    key={item.id}
                    className="home-container__top-models__body-item"
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
                      <span>{convertUSDToINR(item.retailPrice)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}
