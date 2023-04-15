import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { requestExploreAll } from "../../Api/requests";
import { OverlayContext } from "../../Helpers/OverlayContext";
import tinycolor from "tinycolor2";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import FilterPageSkeleton from "../../Components/SkeletonLoading/FilterPageSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { convertUSDToINR } from "../../Helpers/utils";

export default function FilterPage() {
  let sliderRef = useRef(null);
  const { setIsSizeGuideVisible } = useContext(OverlayContext);
  const [filteredArray, setFilteredArray] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [colorPalette, setColorPalette] = useState([]);
  const [shoesSortedByColors, setShoesSortedByColors] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [shoeData, setShoeData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading } = useQuery(
    "shoeDataByCategory",
    ({ pageParam = 1 }) =>
      axios({
        ...requestExploreAll,
        params: {
          ...requestExploreAll.params,
          page: pageParam,
          limit: 100,
        },
      }).then((res) => {
        setFilteredArray(res.data?.results);
        setShoeData(res.data?.results);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const predefinedColors = {
      Black: "#000000",
      White: "#FFFFFF",
      Red: "#FF0000",
      Green: "#008000",
      Blue: "#0000FF",
      Yellow: "#FFFF00",
      Purple: "#800080",
      Orange: "#FFA500",
      Pink: "#FFC0CB",
      Gray: "#808080",
      Brown: "#A52A2A",
      Teal: "#008080",
      Cyan: "#00FFFF",
      Navy: "#000080",
      Maroon: "#800000",
      Olive: "#808000",
      Gold: "#FFD700",
      Silver: "#C0C0C0",
      Beige: "#F5F5DC",
      Peach: "#FFE5B4",
    };

    var nearestColor = require("nearest-color").from(predefinedColors);

    const getColorCategory = (colorName) => {
      let hexCode, result;
      try {
        hexCode = tinycolor(colorName).toHex();
        console.log(colorName, hexCode);
        result = nearestColor(hexCode);
      } catch (error) {
        console.log(error);
      }
      return result.name;
    };

    const palette = [
      ...new Set(
        shoeData
          .map((shoe) => shoe.colorway.split("/"))
          .flat()
          .map((color) => color.trim())
          .filter((color) => color !== "")
          .map((color) => getColorCategory(color))
      ),
    ];

    setColorPalette(palette);

    const shoesWithNearestColors = shoeData.map((shoe) => {
      const colors = shoe.colorway.split("/");
      const nearestColors = colors
        .map((color) => getColorCategory(color.trim()))
        .filter((color, index, self) => self.indexOf(color) === index);

      return {
        ...shoe,
        nearestColors,
      };
    });

    setShoesSortedByColors(shoesWithNearestColors);

    console.log(palette);
    console.log(shoesWithNearestColors);
  }, [shoeData]);

  const filterShoesByBrand = (brand) => {
    let temp = shoeData;
    const filtered = temp?.filter(
      (shoe) => shoe.brand.toLowerCase() === brand.toLowerCase()
    );
    setFilteredArray(filtered);
  };

  console.log(colorPalette);

  const filterShoesByColor = (color) => {
    let temp = shoesSortedByColors;
    let tempFiltered = temp?.filter((shoe) =>
      shoe.nearestColors.includes(color)
    );
    setFilteredArray(tempFiltered);
  };

  console.log(filteredArray);

  console.log(data);

  return (
    <div className="filter-page-container">
      <div className="filter-page-container--list-layout">
        <div className="filter-page-container__header">
          <p className="no-of-results">{filteredArray?.length} results</p>
          <span
            onClick={() => {
              setFilteredArray(shoeData);
              setBrandName("");
            }}
          >
            Remove all filters
          </span>
        </div>
        <div className="filter-page-container__list">
          {isLoading ? (
            <FilterPageSkeleton />
          ) : (
            filteredArray?.map((item) => (
              <Link to={`/product/${item?.id}`}>
                <div key={item.id} className="list-item">
                  <div className="list-item--img">
                    <img
                      src={item.media.smallImageUrl}
                      alt={item.shoe + "-img"}
                    />
                  </div>
                  <div className="list-item--content">
                    <p>{item.name}</p>
                    <p className="item--name">{item.shoe}</p>
                    <span>{convertUSDToINR(item.retailPrice)}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="filter-page-container__filter">
        {!isSmallScreen ? (
          <div className="filter-page-container__filter--layout">
            <div className="filter-size-list">
              <div className="filter-size-list__header">
                <h4>Size - EU</h4>
                <span
                  onClick={() => {
                    setIsSizeGuideVisible(true);
                  }}
                >
                  Size Guide
                </span>
              </div>
              <div className="filter-size-list__body">
                <button>
                  <span>35</span>
                </button>
                <button>
                  <span>36</span>
                </button>
                <button>
                  <span>37</span>
                </button>
                <button>
                  <span>38</span>
                </button>
                <button>
                  <span>39</span>
                </button>
                <button>
                  <span>40</span>
                </button>
                <button>
                  <span>41</span>
                </button>
                <button>
                  <span>42</span>
                </button>
                <button>
                  <span>43</span>
                </button>
                <button>
                  <span>44</span>
                </button>
                <button>
                  <span>45</span>
                </button>
                <button>
                  <span>46</span>
                </button>
                <button>
                  <span>47</span>
                </button>
              </div>
            </div>
            <div className="filter-color-list">
              <div className="filter-color-list__header">
                <h4>Color</h4>
                <span></span>
              </div>
              <div className="filter-color-list__body">
                {colorPalette?.length === 0
                  ? Array(12)
                      .fill()
                      .map((_, index) => (
                        <button
                          className="placeholder--button"
                          style={{ display: "grid", placeItems: "center" }}
                          key={index}
                        >
                          <span>
                            <Skeleton
                              baseColor={"#ececec"}
                              width={"18px"}
                              height={"18px"}
                            />
                          </span>
                        </button>
                      ))
                  : colorPalette.map((color, index) => (
                      <button
                        onMouseOver={() =>
                          (document.querySelector(
                            ".filter-color-list__header span"
                          ).innerHTML = color === "Black" ? "Multi" : color)
                        }
                        onMouseLeave={() =>
                          (document.querySelector(
                            ".filter-color-list__header span"
                          ).innerHTML = "")
                        }
                        onClick={() => filterShoesByColor(color)}
                        key={index}
                      >
                        <span
                          style={{
                            background:
                              color === "Black"
                                ? "linear-gradient(to bottom right, red, orange, yellow, green, blue, indigo, violet)"
                                : "#" + tinycolor(color).toHex(),
                          }}
                        ></span>
                      </button>
                    ))}
              </div>
            </div>
            <div className="filter-brands-list">
              <div className="filter-brands-list__header">
                <h4>Brands</h4>
              </div>
              <div className="filter-brands-list__body">
                {isLoading
                  ? Array(5)
                      .fill()
                      .map((_, index) => (
                        <button key={index}>
                          <Skeleton
                            baseColor={"#ececec"}
                            width={"80px"}
                            height={"100%"}
                          />
                        </button>
                      ))
                  : [...new Set(shoeData.map((shoe) => shoe.brand))].map(
                      (brand, index) => (
                        <button
                          className={brandName === brand && "btn--active"}
                          key={index}
                          onClick={() => {
                            filterShoesByBrand(brand);
                            setBrandName(brand);
                          }}
                        >
                          <span style={{ textTransform: "capitalize" }}>
                            {brand}
                          </span>
                        </button>
                      )
                    )}
              </div>
            </div>
          </div>
        ) : (
          <div className="filter-page-container__filter--layout">
            <Slider
              ref={sliderRef}
              slidesToShow={1}
              slidesToScroll={1}
              infinite={false}
              afterChange={(e) => setSliderIndex(e)}
            >
              <div className="filter-size-list">
                <div className="filter-size-list__header">
                  <h4>Size - EU</h4>
                  <span onClick={() => setIsSizeGuideVisible(true)}>
                    Size Guide
                  </span>
                </div>
                <div className="filter-size-list__body">
                  <button>
                    <span>35</span>
                  </button>
                  <button>
                    <span>36</span>
                  </button>
                  <button>
                    <span>37</span>
                  </button>
                  <button>
                    <span>38</span>
                  </button>
                  <button>
                    <span>39</span>
                  </button>
                  <button>
                    <span>40</span>
                  </button>
                  <button>
                    <span>41</span>
                  </button>
                  <button>
                    <span>42</span>
                  </button>
                  <button>
                    <span>43</span>
                  </button>
                  <button>
                    <span>44</span>
                  </button>
                  <button>
                    <span>45</span>
                  </button>
                  <button>
                    <span>46</span>
                  </button>
                  <button>
                    <span>47</span>
                  </button>
                </div>
              </div>
              <div className="filter-color-list">
                <div className="filter-color-list__header">
                  <h4>Color</h4>
                  <span></span>
                </div>
                <div className="filter-color-list__body">
                  {colorPalette.map((color, index) => (
                    <button
                      onMouseOver={() =>
                        (document.querySelector(
                          ".filter-color-list__header span"
                        ).innerHTML = color === "Black" ? "Multi" : color)
                      }
                      onMouseLeave={() =>
                        (document.querySelector(
                          ".filter-color-list__header span"
                        ).innerHTML = "")
                      }
                      onClick={() => filterShoesByColor(color)}
                      key={index}
                    >
                      <span
                        style={{
                          background:
                            color === "Black"
                              ? "linear-gradient(to bottom right, red, orange, yellow, green, blue, indigo, violet)"
                              : "#" + tinycolor(color).toHex(),
                        }}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-brands-list">
                <div className="filter-brands-list__header">
                  <h4>Brands</h4>
                </div>
                <div className="filter-brands-list__body">
                  {[...new Set(shoeData.map((shoe) => shoe.brand))].map(
                    (brand, index) => (
                      <button
                        className={brandName === brand && "btn--active"}
                        key={index}
                        onClick={() => {
                          filterShoesByBrand(brand);
                          setBrandName(brand);
                        }}
                      >
                        <span style={{ textTransform: "capitalize" }}>
                          {brand}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </Slider>
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
                  sliderIndex === 2 && "disable--arrow"
                }`}
              >
                <FontAwesomeIcon
                  className="arrow--icon"
                  icon={faChevronRight}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
