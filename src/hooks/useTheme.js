import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

const STORAGE_KEY = "theme";
const THEME_COLOR = { dark: "#12110e", light: "#f1e6d0" };

// The theme lives on <html data-theme>, set before first paint by the inline script in
// public/index.html. Dark (dusk) is the default; light (dawn) is opt-in and remembered.
const readTheme = () =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "light"
    ? "light"
    : "dark";

export default function useTheme() {
  const reduced = usePrefersReducedMotion();
  const [theme, setTheme] = useState(readTheme);

  const toggle = useCallback(
    (event) => {
      const next = theme === "dark" ? "light" : "dark";

      const apply = () => {
        document.documentElement.dataset.theme = next;
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[next]);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch (error) {
          // Storage can be unavailable (private mode); the theme still applies for this visit.
        }
        flushSync(() => setTheme(next));
      };

      if (reduced || typeof document.startViewTransition !== "function") {
        apply();
        return;
      }

      // The new theme opens out of the toggle as a growing circle, like stepping through a round window.
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      // The page is a frozen snapshot during the transition; this lets the system cursor stand in
      // for the swallow cursor until it ends (see SwallowCursor.css).
      const root = document.documentElement;
      root.classList.add("is-switching-theme");
      const transition = document.startViewTransition(apply);
      const restoreCursor = () => root.classList.remove("is-switching-theme");
      transition.finished.then(restoreCursor, restoreCursor);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: 1100,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    },
    [theme, reduced]
  );

  return [theme, toggle];
}
