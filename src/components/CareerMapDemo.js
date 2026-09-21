import { useLayoutEffect, useRef, useState } from "react";
import { careerMapStops } from "../data/content";
import "./Demos.css";

const ROUTE =
  "M48 250 C 90 250, 110 170, 150 170 S 220 220, 250 205 S 310 95, 340 95 S 400 60, 432 55";
const VIEW = { w: 480, h: 300 };
const POINTS = [
  { x: 48, y: 250 },
  { x: 150, y: 170 },
  { x: 250, y: 205 },
  { x: 340, y: 95 },
  { x: 432, y: 55 },
];

// Interactive miniature of the Career Path Map: pick a stop and the route
// extends to it; "Back" restores the previous stop, echoing the history-based
// state recovery in the real product.
export default function CareerMapDemo() {
  const [selected, setSelected] = useState(1);
  const [history, setHistory] = useState([]);
  const [fractions, setFractions] = useState(null);
  const routeRef = useRef(null);
  const stopRefs = useRef([]);

  // Measure how far along the route each stop sits so the drawn line ends on the node.
  useLayoutEffect(() => {
    const path = routeRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;
    const total = path.getTotalLength();
    if (!total) return;
    const steps = 240;
    setFractions(
      POINTS.map((point) => {
        let best = 0;
        let bestDistance = Infinity;
        for (let i = 0; i <= steps; i += 1) {
          const p = path.getPointAtLength((i / steps) * total);
          const d = (p.x - point.x) ** 2 + (p.y - point.y) ** 2;
          if (d < bestDistance) {
            bestDistance = d;
            best = i / steps;
          }
        }
        return best;
      })
    );
  }, []);

  const choose = (index) => {
    if (index === selected) return;
    setHistory((h) => [...h, selected]);
    setSelected(index);
  };

  const back = () => {
    if (history.length === 0) return;
    setSelected(history[history.length - 1]);
    setHistory(history.slice(0, -1));
  };

  const move = (event, index) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = Math.min(POINTS.length - 1, Math.max(0, index + keys[event.key]));
    stopRefs.current[next]?.focus();
    choose(next);
  };

  // Keep the drawn route in sync even before measurement finishes.
  const progress = fractions ? fractions[selected] : selected / (POINTS.length - 1);
  const stop = careerMapStops[selected];

  return (
    <div className="mock demo demo--map">
      <div className="demo__stage">
        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} aria-hidden="true" focusable="false">
          <path className="demo__route-ghost" d={ROUTE} />
          <path
            ref={routeRef}
            className="demo__route"
            d={ROUTE}
            pathLength="1"
            style={{ strokeDashoffset: 1 - progress }}
          />
        </svg>

        <div role="group" aria-label="Career path stops. Use arrow keys to move between stops.">
          {POINTS.map((point, i) => (
            <button
              key={careerMapStops[i].label}
              ref={(el) => { stopRefs.current[i] = el; }}
              type="button"
              className={`demo__stop${i === selected ? " is-active" : ""}${i < selected ? " is-passed" : ""}`}
              style={{ left: `${(point.x / VIEW.w) * 100}%`, top: `${(point.y / VIEW.h) * 100}%` }}
              aria-pressed={i === selected}
              aria-label={careerMapStops[i].label}
              tabIndex={i === selected ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(event) => move(event, i)}
            >
              <span className="demo__stop-dot" />
              <span className="demo__stop-label" aria-hidden="true">
                {careerMapStops[i].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="demo__caption">
        <div aria-live="polite">
          <p className="demo__caption-title">{stop.label}</p>
          <p className="demo__caption-text">{stop.text}</p>
        </div>
        <button type="button" className="demo__btn" onClick={back} disabled={history.length === 0}>
          ← Back
        </button>
      </div>
    </div>
  );
}
