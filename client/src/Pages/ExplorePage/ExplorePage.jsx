import React from "react";
import { useInfiniteQuery } from "react-query";
import { requestExploreAll } from "../../Api/requests";
import NavSwitch from "../../Components/NavSwitch/NavSwitch";
import axios from "axios";
import GridLayout from "../../Components/GridLayout/GridLayout";
import GridLayoutSkeleton from "../../Components/SkeletonLoading/GridLayoutSkeleton";

export default function ExplorePage() {
  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    "shoeData",
    ({ pageParam = 1 }) =>
      axios({
        ...requestExploreAll,
        params: {
          ...requestExploreAll.params,
          page: pageParam,
        },
      }).then((res) => res.data),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.count / 20;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );

  return (
    <div className="explore-page-container">
      {isLoading ? (
        <GridLayoutSkeleton />
      ) : (
        data?.pages?.map((page, idx) => (
          <GridLayout
            page={page}
            key={idx}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
          />
        ))
      )}
      <NavSwitch />
    </div>
  );
}
