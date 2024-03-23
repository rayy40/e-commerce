import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CarouselSkeleton() {
  return (
    <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#ececec"}>
      <div className="home-container__top-models__body-item">
        <div style={{ aspectRatio: "1/0.75" }} className="body-item--img">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
        <div className="body-item--content">
          <p>
            <Skeleton width={"120px"} height={"100%"} />
          </p>
          <p>
            <Skeleton width={"120px"} height={"100%"} />
          </p>
          <span>
            <Skeleton width={"60px"} height={"100%"} />
          </span>
        </div>
      </div>
    </SkeletonTheme>
  );
}
