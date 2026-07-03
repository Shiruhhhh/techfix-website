import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "./smoothScrollTo";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollTo(0);
  }, [pathname]);

  return null;
}
