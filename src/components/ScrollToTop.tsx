import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function forceScrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.getElementById("main-content")?.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();

  useLayoutEffect(() => {
    forceScrollTop();
    const rafId = requestAnimationFrame(forceScrollTop);

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, hash, key]);

  return null;
}

