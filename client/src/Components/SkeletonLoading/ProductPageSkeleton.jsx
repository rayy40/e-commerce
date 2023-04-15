import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductPageSkeleton() {
  return (
    <div className="product-page-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#ececec"}>
        <div className="product-page-container__product">
          <div className="product-container">
            {window.innerWidth > 1024 && (
              <Skeleton width={"100%"} height={"300px"} />
            )}
          </div>
        </div>
        <div className="product-page-container__detail--loading">
          <h2>
            <Skeleton width={"200px"} height={"100%"} />
          </h2>
          <p>
            <Skeleton width={"120px"} height={"100%"} />
          </p>
          <p>
            <Skeleton width={"80px"} height={"100%"} />
          </p>
          <button>
            <Skeleton width={"100%"} height={"60px"} />
          </button>
        </div>
      </SkeletonTheme>
    </div>
  );
}
