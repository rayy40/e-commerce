import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const SearchProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {props.children}
    </SearchContext.Provider>
  );
};
