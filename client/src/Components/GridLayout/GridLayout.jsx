import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { convertUSDToINR } from "../../Helpers/utils";

const GridLayout = ({ page, isLoading, hasNextPage, fetchNextPage }) => {
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (hasNextPage) fetchNextPage();
          }
        },
        { threshold: 0.5 } // set a threshold value of 0.5
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  return (
    <div className="grid-layout-container">
      {page?.results?.map((item, index) => (
        <li
          ref={page.results.length === index + 1 ? lastElementRef : null}
          key={item?.id}
        >
          <Link to={`/product/${item?.id}`}>
            <div className="grid-layout-item-container">
              <div className="grid-item--img">
                <img src={item.media.smallImageUrl} alt={item.shoe + "-img"} />
              </div>
              <div className="grid-item--content">
                <p>{item.name}</p>
                <p className="item--name">{item.shoe}</p>
                <span>{convertUSDToINR(item.retailPrice)}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default GridLayout;
