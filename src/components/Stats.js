import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const DURATION = 1100;
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

// Splits "30–35%" into ["", "30", "–", "35", "%"]; odd indexes are the numbers.
const tokenize = (value) => value.split(/(\d+(?:\.\d+)?)/);

// Counts every number inside `value` up from zero once it scrolls into view.
// role="img" + aria-label gives assistive tech the final value at once, and there is
// no second hidden copy of the text, so selecting and copying yields the value once.
function CountUp({ value }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === "undefined") {
      setProgress(1);
      return undefined;
    }

    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(easeOutCubic(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const shown = tokenize(value)
    .map((part, i) => (i % 2 === 1 ? String(Math.round(Number(part) * progress)) : part))
    .join("");

  return (
    <span ref={ref} role="img" aria-label={value}>
      {shown}
    </span>
  );
}

// Big-number callouts. The resume marks several figures as approximate,
// so labels carry that qualifier rather than the numbers being rounded up.
export default function Stats({ items, className = "" }) {
  if (!items || items.length === 0) return null;
  return (
    <dl className={`stats ${className}`.trim()}>
      {items.map((item) => (
        <div key={item.label} className="stat">
          <dt className="stat__label">{item.label}</dt>
          <dd className="stat__value">
            <CountUp value={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
