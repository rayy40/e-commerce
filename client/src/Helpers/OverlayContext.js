import { createContext, useState } from "react";

export const OverlayContext = createContext({
  isSearchBarVisible: false,
  isSizeGuideVisible: false,
  isSelectSizeVisible: false,
  isCartVisible: false,
  isCartPulledUp: false,
  isExchangeComponentVisible: false,
  isDropdownOpen: false,
  isAccountBoxVisible: false,
  isEditProductSelected: false,
  setIsSearchBarVisible: () => {},
  setIsAccountBoxVisible: () => {},
  setIsDowndownOpen: () => {},
  setIsExchangeComponentVisible: () => {},
  setIsSizeGuideVisible: () => {},
  setIsSelectSizeVisible: () => {},
  setIsEditProductSeleted: () => {},
  setIsCartVisible: () => {},
  setIsCartPulledUp: () => {},
});

export const OverlayProvider = (props) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCartPulledUp, setIsCartPulledUp] = useState(false);
  const [isSizeGuideVisible, setIsSizeGuideVisible] = useState(false);
  const [isSelectSizeVisible, setIsSelectSizeVisible] = useState(false);
  const [isExchangeComponentVisible, setIsExchangeComponentVisible] =
    useState(false);
  const [isDropdownOpen, setIsDowndownOpen] = useState(false);
  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false);
  const [isEditProductSelected, setIsEditProductSeleted] = useState(false);

  return (
    <OverlayContext.Provider
      value={{
        isSearchBarVisible,
        isSizeGuideVisible,
        isSelectSizeVisible,
        isCartVisible,
        isCartPulledUp,
        isAccountBoxVisible,
        isEditProductSelected,
        isExchangeComponentVisible,
        setIsExchangeComponentVisible,
        setIsAccountBoxVisible,
        setIsEditProductSeleted,
        setIsCartPulledUp,
        setIsCartVisible,
        setIsSizeGuideVisible,
        setIsSelectSizeVisible,
        setIsSearchBarVisible,
        isDropdownOpen,
        setIsDowndownOpen,
      }}
    >
      {props.children}
    </OverlayContext.Provider>
  );
};
