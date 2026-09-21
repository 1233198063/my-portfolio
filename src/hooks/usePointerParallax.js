import { useEffect } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

// Writes --px / --py (each -1..1, relative to the viewport centre) onto the
// element so CSS can offset layers by depth. Only runs for fine pointers
// (mouse/trackpad) and never under reduced motion. One rAF per frame at most.
export default function usePointerParallax(ref) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const canHover =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!el || reduced || !canHover) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;

    const flush = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };

    const onMove = (event) => {
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, reduced]);
}
