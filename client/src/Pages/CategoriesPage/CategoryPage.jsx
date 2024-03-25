import React from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router";
import { requestExploreByCategory } from "../../Api/requests";
import NavSwitch from "../../Components/NavSwitch/NavSwitch";
import axios from "axios";
import GridLayout from "../../Components/GridLayout/GridLayout";
import GridLayoutSkeleton from "../../Components/SkeletonLoading/GridLayoutSkeleton";

export default function CategoryPage() {
  const { gender } = useParams();

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    ["shoeDataByCategory", gender],
    ({ pageParam = 1 }) =>
      axios({
        ...requestExploreByCategory,
        params: {
          ...requestExploreByCategory.params,
          page: pageParam,
          gender: gender,
        },
      }).then((res) => res.data),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.count / 15;
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
