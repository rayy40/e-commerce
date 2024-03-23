import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FilterPageSkeleton() {
  return (
    <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#ececec"}>
      {Array(20)
        .fill()
        .map((_, index) => (
          <div
            style={{
              width: window.innerWidth < 767 ? "100%" : "calc(50% - 1em)",
            }}
            key={index}
            className="list-item"
          >
            <div style={{ aspectRatio: "1/1" }} className="list-item--img">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
            <div className="list-item--content">
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
        ))}
    </SkeletonTheme>
  );
}
