import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import "./SwallowCursor.css";

// The beak (drawing origin) is the hotspot in both views.
//  - "side" (default): a swallow in profile. It faces left or right with the motion and pitches
//    its nose up or down; at rest it faces left, nose raised, so the beak is the upper-left tip.
//  - "top": the earlier view from above. It turns to point its beak along the motion; at rest it
//    points to the upper left like an arrow cursor.
const TOP_REST_HEADING = (-135 * Math.PI) / 180;
const SIDE_REST_PITCH = (-30 * Math.PI) / 180;
const SIDE_MAX_PITCH = (45 * Math.PI) / 180;
const TURN_EASE = 0.16; // share of the remaining turn taken each frame
const FLIP_EASE = 0.22; // the side view turns around a little faster than it pitches
const IDLE_MS = 900; // still for this long and it returns to rest
const HEADING_SPEED = 0.12; // px/ms; slower, careful movement keeps the heading steady
const FLIP_SPEED = 0.2; // px/ms of horizontal motion needed to turn the side view around
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

const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));

// Each view is drawn twice: a stroked copy underneath gives the rim light, and a filled copy on
// top hides the inner half of that stroke, so only the outer outline glows.

function TopSilhouette({ layer }) {
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

function TopSwallow() {
  return (
    <>
      <TopSilhouette layer="rim" />
      <TopSilhouette layer="fill" />
      <ellipse className="swallow__mark" cx="-2.7" cy="0" rx="1.25" ry="1.05" />
    </>
  );
}

// Side view, facing right. Wings are drawn with the shoulder at their own origin so CSS can
// rotate them about it: the far wing sits behind the body, the near wing over it.
const SIDE_WING =
  "M0.6 -0.2 C -3.6 -4, -12.4 -6.6, -24.8 -7.4 C -17 -4.4, -9.6 -1.6, -5.8 0.9 C -3.4 1.4, -0.8 0.8, 0.6 -0.2 Z";

function SideSilhouette({ layer }) {
  const fill = layer === "fill";
  return (
    <g className={`swallow__${layer}`}>
      <g transform="translate(-8.6 -2.4) scale(0.92)">
        <path className="swallow__wing swallow__wing--far" d={SIDE_WING} />
      </g>
      <path d="M-18.8 -0.9 C -24.5 -1.8, -31.5 -3, -39.5 -4.8 C -32.5 -2.2, -27 -0.4, -24 0.6 C -27.5 1.6, -32.5 3, -38 5 C -31 2.6, -24.5 1.8, -19.6 1.4 Z" />
      <path d="M0 0.3 C -0.9 -0.2, -1.8 -0.7, -2.6 -1.1 C -3.3 -2.7, -5.6 -3.5, -7.8 -3.1 C -11.2 -2.5, -15.6 -1.5, -19.6 -0.7 L -20.2 1 C -16.2 2.6, -11.6 4, -8 3.9 C -5.4 3.8, -3.4 2.8, -2.4 1.5 C -1.6 1.1, -0.8 0.7, 0 0.3 Z" />
      {fill && (
        <>
          <path
            className="swallow__belly"
            d="M-3.2 2.3 C -4.8 3.4, -6.6 3.85, -8.6 3.85 C -12 3.75, -15.8 2.6, -19.2 1.2 C -15.4 1.5, -11.6 1.7, -8.4 1.5 C -6.4 1.4, -4.6 1.7, -3.2 2.3 Z"
          />
          <ellipse className="swallow__mark" cx="-3" cy="1.25" rx="1.45" ry="1" transform="rotate(28 -3 1.25)" />
          <circle className="swallow__eye" cx="-4.7" cy="-0.95" r="0.6" />
        </>
      )}
      <g transform="translate(-7.6 -2)">
        <path className="swallow__wing swallow__wing--near" d={SIDE_WING} />
      </g>
    </g>
  );
}

function SideSwallow() {
  return (
    <>
      <SideSilhouette layer="rim" />
      <SideSilhouette layer="fill" />
    </>
  );
}

// A small ink swallow replaces the mouse pointer. It flies with the pointer's motion, beats its
// wings when moving fast, glides and returns to rest when still, and carries a spark of light at
// its beak over anything clickable. Mouse only: touch, forced-colors and non-hover devices keep
// the system cursor. Under reduced motion it follows the pointer but holds its rest pose.
export default function SwallowCursor({ view = "side" }) {
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

    const side = view === "side";
    const root = document.documentElement;
    const s = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      // top view
      angle: TOP_REST_HEADING,
      target: TOP_REST_HEADING,
      // side view: facing is the horizontal scale (-1 faces left, 1 faces right)
      facing: -1,
      facingTarget: -1,
      pitch: SIDE_REST_PITCH,
      pitchTarget: SIDE_REST_PITCH,
      lastTime: 0,
      lastMove: 0,
      flapUntil: 0,
    };
    let frame = 0;

    const render = () => {
      frame = 0;
      const now = performance.now();
      const idle = now - s.lastMove > IDLE_MS;
      let pose;
      if (side) {
        if (!reduced) {
          if (idle) {
            s.facingTarget = -1;
            s.pitchTarget = SIDE_REST_PITCH;
          }
          s.facing += (s.facingTarget - s.facing) * FLIP_EASE;
          s.pitch += (s.pitchTarget - s.pitch) * TURN_EASE;
        }
        pose = `scale(${s.facing.toFixed(3)}, 1) rotate(${s.pitch.toFixed(4)}rad)`;
      } else {
        if (!reduced) {
          if (idle) s.target = TOP_REST_HEADING;
          s.angle += turnBetween(s.angle, s.target) * TURN_EASE;
        }
        pose = `rotate(${s.angle.toFixed(4)}rad)`;
      }
      el.classList.toggle("is-flying", !reduced && now < s.flapUntil);
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) ${pose}`;
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
      if (side) {
        if (Math.abs(s.vx) > FLIP_SPEED) s.facingTarget = Math.sign(s.vx);
        // Pitch is measured as if facing right; the horizontal flip mirrors it for the left.
        if (speed > HEADING_SPEED) s.pitchTarget = clamp(Math.atan2(s.vy, Math.abs(s.vx)), SIDE_MAX_PITCH);
      } else if (speed > HEADING_SPEED) {
        s.target = Math.atan2(s.vy, s.vx);
      }
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
  }, [reduced, view]);

  return (
    <div ref={ref} className={`swallow swallow--${view}`} aria-hidden="true">
      <div className="swallow__bird">
        <svg viewBox="-40 -22 44 44" focusable="false">
          <defs>
            <radialGradient id="swallow-wash" cx="-11" cy="0" r="27" gradientUnits="userSpaceOnUse">
              <stop offset="0" style={{ stopColor: "var(--swallow-ink)", stopOpacity: 1 }} />
              <stop offset="0.55" style={{ stopColor: "var(--swallow-ink)", stopOpacity: 0.96 }} />
              <stop offset="1" style={{ stopColor: "var(--swallow-ink)", stopOpacity: 0.62 }} />
            </radialGradient>
          </defs>
          {view === "side" ? <SideSwallow /> : <TopSwallow />}
          <circle className="swallow__spark" cx="1.1" cy="0" r="2.5" />
        </svg>
      </div>
    </div>
  );
}
