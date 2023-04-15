import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { requestShoesByName } from "../../Api/requests";
import { OverlayContext } from "../../Helpers/OverlayContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import GridLayout from "../../Components/GridLayout/GridLayout";
import GridLayoutSkeleton from "../../Components/SkeletonLoading/GridLayoutSkeleton";
import { SearchContext } from "../../Helpers/SearchContext";

const SearchPage = () => {
  const { name } = useParams();
  const history = useHistory();
  const { setIsSearchBarVisible } = useContext(OverlayContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    setIsSearchBarVisible(false);
  }, [setIsSearchBarVisible]);

  useEffect(() => {
    if (searchTerm !== "") {
      const timeoutId = setTimeout(() => {
        history.push(`/search/${searchTerm}`);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, history]);

  const { data, refetch, isLoading } = useQuery(
    ["shoeDataByName", name],
    () =>
      axios({
        ...requestShoesByName,
        params: {
          ...requestShoesByName.params,
          name: name,
        },
      }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (name !== undefined) {
      refetch();
    }
  }, [name, refetch]);

  console.log(data);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newSearchQuery = e.target.value;
      history.push(`/search/${newSearchQuery}`);
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-page-container__search">
        <div className="search-bar">
          <input
            onKeyDown={handleKeyDown}
            type="text"
            name="q"
            placeholder="Start typing what you're looking for"
            className="search-input"
            autoFocus={!name}
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="search-submit" type="submit">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      <div className="search-page-container__products">
        {isLoading ? (
          <GridLayoutSkeleton />
        ) : data?.results?.length > 0 ? (
          <GridLayout page={data} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15em",
            }}
            className="unavailbale-container"
          >
            <h2 style={{ color: "#333", fontWeight: "500" }}>
              No such product available.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
