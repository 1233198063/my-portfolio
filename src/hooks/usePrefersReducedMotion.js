import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const read = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(QUERY).matches
    : false;

// Live value of the user's reduced-motion preference. JS-driven motion
// (timers, count-ups, pointer parallax) must check this; CSS motion uses the media query.
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(read);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const mql = window.matchMedia(QUERY);
    const onChange = (event) => setReduced(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
