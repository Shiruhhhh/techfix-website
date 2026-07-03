import { useNavigate, useLocation } from "react-router-dom";
import { smoothScrollToElement } from "./smoothScrollTo";

// Returns a click handler that smooth-scrolls to an in-page anchor when on the
// home route, or navigates home first (then scrolls) when on another route.
export function useAnchorNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (hash) => (e) => {
    e?.preventDefault();
    const id = hash.replace(/^#/, "");
    if (location.pathname === "/") {
      smoothScrollToElement(document.getElementById(id));
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };
}
