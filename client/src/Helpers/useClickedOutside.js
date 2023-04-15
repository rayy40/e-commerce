import { useEffect, useRef, useContext } from "react";
import { OverlayContext } from "./OverlayContext";

export default function useComponentVisible() {
  const {
    setIsCartVisible,
    setIsSearchBarVisible,
    setIsDowndownOpen,
    setIsSizeGuideVisible,
    setIsEditProductSeleted,
    setIsExchangeComponentVisible,
    setIsAccountBoxVisible,
  } = useContext(OverlayContext);
  const cartRef = useRef(null);
  const sizeGuideRef = useRef(null);
  const searchBarRef = useRef(null);
  const exchangeRef = useRef(null);
  const dropDownRef = useRef(null);
  const editProductRef = useRef(null);
  const accountBoxRef = useRef(null);

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartVisible(false);
    }
    if (sizeGuideRef.current && !sizeGuideRef.current.contains(event.target)) {
      setIsSizeGuideVisible(false);
    }
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsSearchBarVisible(false);
    }
    if (exchangeRef.current && !exchangeRef.current.contains(event.target)) {
      setIsExchangeComponentVisible(false);
    }
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsDowndownOpen(false);
    }
    if (
      accountBoxRef.current &&
      !accountBoxRef.current.contains(event.target)
    ) {
      setIsAccountBoxVisible(false);
    }
    if (
      editProductRef.current &&
      !editProductRef.current.contains(event.target)
    ) {
      setIsEditProductSeleted(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cartRef,
    sizeGuideRef,
    searchBarRef,
    dropDownRef,
    accountBoxRef,
    editProductRef,
  };
}
