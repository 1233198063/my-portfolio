import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import "./Atmosphere.css";

// Light falling in from the upper right, as if through a tall window. Each beam's centre line
// crosses the top edge at x (fraction of viewport width) and tilts clockwise by `angle` degrees,
// so it lands toward the lower left. The same numbers drive the CSS beams and the dust glints.
const BEAMS = [
  { x: 0.74, angle: 30, width: 0.13, alpha: 1, breathe: "17s" },
  { x: 0.88, angle: 33, width: 0.06, alpha: 0.75, breathe: "23s" },
  { x: 1.04, angle: 31, width: 0.2, alpha: 0.85, breathe: "29s" },
];
const BEAM_TOP = -0.1; // beams start just above the viewport (fraction of height)

const FRAME_MS = 33; // ~30fps is plenty for slow dust
const SPOT_EASE = 0.08;

const random = (min, max) => min + Math.random() * (max - min);

const makeMote = (w, h) => ({
  x: random(0, w),
  y: random(0, h),
  r: random(0.5, 1.7),
  vx: random(-0.06, 0.06),
  vy: random(-0.09, 0.02), // dust in sunlight mostly floats upward, slowly
  base: random(0.08, 0.22),
  phase: random(0, Math.PI * 2),
});

// How brightly a point sits inside the beams: 1 on a beam's centre line, 0 outside it.
function beamLight(px, py, w, h) {
  let light = 0;
  for (const beam of BEAMS) {
    const rad = (beam.angle * Math.PI) / 180;
    const dx = -Math.sin(rad);
    const dy = Math.cos(rad);
    const ax = beam.x * w;
    const ay = BEAM_TOP * h;
    const across = Math.abs((px - ax) * dy - (py - ay) * dx);
    const along = (px - ax) * dx + (py - ay) * dy;
    const half = (beam.width * w) / 2;
    if (across < half && along > 0) {
      const core = 1 - across / half;
      const fade = Math.max(0, 1 - along / (h * 1.25));
      light = Math.max(light, core * core * fade * beam.alpha);
    }
  }
  return light;
}

// Fixed, decorative layers behind (and one above) the page. Everything is aria-hidden and
// ignores the pointer. Dust and the cursor light only run for users who welcome motion,
// on devices with a real pointer for the latter, and pause while the tab is hidden.
export default function Atmosphere() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // No matchMedia means no real rendering environment (e.g. tests): skip the canvas entirely.
    if (!canvas || reduced || typeof window.matchMedia !== "function") return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const spot = spotRef.current;

    let w = 0;
    let h = 0;
    let motes = [];
    let dust = "244, 217, 160";
    let frame = 0;
    let last = 0;
    let time = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, seen: false };

    const readDust = () => {
      dust = getComputedStyle(document.documentElement).getPropertyValue("--dust-rgb").trim() || dust;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(12, Math.min(42, Math.round((w * h) / 36000)));
      motes = motes.slice(0, count);
      while (motes.length < count) motes.push(makeMote(w, h));
    };

    const draw = (now) => {
      frame = requestAnimationFrame(draw);
      if (now - last < FRAME_MS) return;
      const dt = Math.min(64, now - (last || now)) / 16;
      last = now;
      time += dt;

      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += (m.vx + Math.sin(time * 0.01 + m.phase) * 0.05) * dt;
        m.y += m.vy * dt;
        if (m.y < -10) m.y = h + 10;
        if (m.y > h + 10) m.y = -10;
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        const lit = beamLight(m.x, m.y, w, h);
        const twinkle = 0.75 + Math.sin(time * 0.05 + m.phase * 3) * 0.25;
        const alpha = Math.min(0.95, m.base + lit * 0.8 * twinkle);
        const radius = m.r * (1 + lit * 0.9);

        if (lit > 0.25) {
          ctx.fillStyle = `rgba(${dust}, ${alpha * 0.18})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${dust}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // The cursor carries a soft warm light that trails a little behind it.
      if (spot && pointer.seen) {
        pointer.x += (pointer.tx - pointer.x) * SPOT_EASE * dt;
        pointer.y += (pointer.ty - pointer.y) * SPOT_EASE * dt;
        spot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      }
    };

    const onPointer = (event) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      if (!pointer.seen) {
        pointer.seen = true;
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        spot.classList.add("is-on");
      }
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };

    const themeObserver = new MutationObserver(readDust);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    readDust();
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && spot) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      spot?.classList.remove("is-on");
      ctx.clearRect(0, 0, w, h);
    };
  }, [reduced]);

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__mist atmosphere__mist--a" />
      <div className="atmosphere__mist atmosphere__mist--b" />
      {BEAMS.map((beam) => (
        <div
          key={beam.x}
          className="atmosphere__beam"
          style={{
            "--beam-x": beam.x,
            "--beam-angle": `${beam.angle}deg`,
            "--beam-width": beam.width,
            "--beam-strength": beam.alpha,
            "--beam-breathe": beam.breathe,
          }}
        />
      ))}
      <div ref={spotRef} className="atmosphere__spot" />
      <canvas ref={canvasRef} className="atmosphere__dust" />
      <div className="atmosphere__grain" />
    </div>
  );
}
