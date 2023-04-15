import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function GridLayoutSkeleton() {
  return (
    <div className="grid-layout-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#ececec"}>
        {Array(20)
          .fill()
          .map((_, index) => (
            <li key={index}>
              <div className="grid-layout-item-container">
                <div className="grid-item--img">
                  <Skeleton width={"100%"} height={"300px"} />
                </div>
              </div>
              <div style={{ marginTop: "1em" }} className="grid-item--content">
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
            </li>
          ))}
      </SkeletonTheme>
    </div>
  );
}
