"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    // Prevent the browser from restoring the previous scroll position on reload.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If the page was opened with a leftover hash (e.g. #search) from a previous
    // session, strip it and start from the very top.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
