import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does not reset scroll on navigation. Without this, clicking
 * "Next module" at the bottom of one page lands you at the bottom of the next.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
