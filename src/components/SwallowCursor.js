import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import "./SwallowCursor.css";

// The beak is the hotspot. At rest the swallow points to the upper left, like an arrow cursor.
const REST_HEADING = (-135 * Math.PI) / 180;
const TURN_EASE = 0.16; // share of the remaining turn taken each frame
const IDLE_MS = 900; // still for this long and it turns back to rest
const HEADING_SPEED = 0.12; // px/ms; slower, careful movement keeps the heading steady
const FLAP_SPEED = 0.5; // px/ms; faster than this and the wings beat
const FLAP_HOLD_MS = 280;
const SETTLE_MS = 2200; // keep animating this long after the last movement

const CLICKABLE =
  'a[href], button:not(:disabled), [role="button"], [role="switch"], label, summary, select:not(:disabled)';
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="reset"]), textarea, [contenteditable="true"]';

// Signed smallest turn from one heading to another, in radians.
const turnBetween = (from, to) => {
  let delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
};

// One copy of the silhouette. Drawn twice: a stroked copy underneath gives the rim light,
// a filled copy on top hides the inner half of that stroke, so only the outline glows.
function Silhouette({ layer }) {
  return (
    <g className={`swallow__${layer}`}>
      <path d="M-17.5 -1.6 C -23 -2.6, -31 -5.4, -39 -8.6 C -33 -5.6, -28.4 -2.4, -25.5 0 C -28.4 2.4, -33 5.6, -39 8.6 C -31 5.4, -23 2.6, -17.5 1.6 Z" />
      <g className="swallow__wings">
        <path d="M-8 -2.7 C -6.6 -9.2, -11.4 -16.6, -27 -21.6 C -21 -15.6, -16.6 -8.8, -13.6 -2.5 Z" />
        <path d="M-8 2.7 C -6.6 9.2, -11.4 16.6, -27 21.6 C -21 15.6, -16.6 8.8, -13.6 2.5 Z" />
        {layer === "fill" && (
          <>
            <path className="swallow__feather" d="M-9.6 -3.9 C -10.8 -9.6, -15.2 -15, -24 -19.6" />
            <path className="swallow__feather" d="M-9.6 3.9 C -10.8 9.6, -15.2 15, -24 19.6" />
          </>
        )}
      </g>
      <path d="M0 0 C -1.4 -1.9, -4.2 -3, -7.4 -2.9 C -11.5 -2.7, -15.5 -2, -19 -1.1 L -19 1.1 C -15.5 2, -11.5 2.7, -7.4 2.9 C -4.2 3, -1.4 1.9, 0 0 Z" />
    </g>
  );
}

// A small ink swallow replaces the mouse pointer. It flies toward wherever the pointer moves,
// beats its wings when moving fast, glides and turns back to rest when still, and carries a
// spark of light at its beak over anything clickable. Mouse only: touch, forced-colors and
// non-hover devices keep the system cursor. Under reduced motion it follows without turning.
export default function SwallowCursor() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.matchMedia !== "function") return undefined;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(forced-colors: active)").matches
    ) {
      return undefined;
    }

    const root = document.documentElement;
    const s = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: REST_HEADING,
      target: REST_HEADING,
      lastTime: 0,
      lastMove: 0,
      flapUntil: 0,
    };
    let frame = 0;

    const render = () => {
      frame = 0;
      const now = performance.now();
      if (!reduced) {
        if (now - s.lastMove > IDLE_MS) s.target = REST_HEADING;
        s.angle += turnBetween(s.angle, s.target) * TURN_EASE;
      }
      el.classList.toggle("is-flying", !reduced && now < s.flapUntil);
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.angle}rad)`;
      if (now - s.lastMove < SETTLE_MS) frame = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event) => {
      if (event.pointerType !== "mouse") {
        el.classList.add("is-away");
        return;
      }
      const dt = event.timeStamp - s.lastTime;
      const dx = event.clientX - s.x;
      const dy = event.clientY - s.y;
      if (s.lastTime && dt > 0 && dt < 120) {
        s.vx = s.vx * 0.6 + (dx / dt) * 0.4;
        s.vy = s.vy * 0.6 + (dy / dt) * 0.4;
      }
      const speed = Math.hypot(s.vx, s.vy);
      if (speed > HEADING_SPEED) s.target = Math.atan2(s.vy, s.vx);
      if (speed > FLAP_SPEED) s.flapUntil = performance.now() + FLAP_HOLD_MS;

      s.x = event.clientX;
      s.y = event.clientY;
      s.lastTime = event.timeStamp;
      s.lastMove = performance.now();

      if (!root.classList.contains("has-swallow")) root.classList.add("has-swallow");
      el.classList.remove("is-away");
      schedule();
    };

    // What is under the pointer decides the swallow's pose.
    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const inText = !!target?.closest(TEXT_FIELD);
      el.classList.toggle("is-text", inText);
      el.classList.toggle("is-pointer", !inText && !!target?.closest(CLICKABLE));
      if (event.pointerType === "mouse") el.classList.remove("is-away");
    };

    const onOut = (event) => {
      if (!event.relatedTarget) el.classList.add("is-away"); // left the window
    };
    const onDown = (event) => {
      if (event.pointerType === "mouse") el.classList.add("is-down");
    };
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
      root.classList.remove("has-swallow");
    };
  }, [reduced]);

  return (
    <div ref={ref} className="swallow" aria-hidden="true">
      <div className="swallow__bird">
        <svg viewBox="-40 -22 44 44" focusable="false">
          <defs>
            <radialGradient id="swallow-wash" cx="-11" cy="0" r="27" gradientUnits="userSpaceOnUse">
              <stop offset="0" style={{ stopColor: "var(--swallow-ink)", stopOpacity: 1 }} />
              <stop offset="0.55" style={{ stopColor: "var(--swallow-ink)", stopOpacity: 0.96 }} />
              <stop offset="1" style={{ stopColor: "var(--swallow-ink)", stopOpacity: 0.62 }} />
            </radialGradient>
          </defs>
          <Silhouette layer="rim" />
          <Silhouette layer="fill" />
          <ellipse className="swallow__mark" cx="-2.7" cy="0" rx="1.25" ry="1.05" />
          <circle className="swallow__spark" cx="1.1" cy="0" r="2.5" />
        </svg>
      </div>
    </div>
  );
}
