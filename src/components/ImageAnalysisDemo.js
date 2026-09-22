import { useEffect, useMemo, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import "./Demos.css";

// Sample data only: invented file names, sign text and confidence values that
// illustrate the workflow. They are not measurements of the real platform.
const ITEMS = [
  { id: "a", file: "sign-014.jpg", text: "OPEN 24H", tilt: -7, raw: 74, clean: 96 },
  { id: "b", file: "sign-027.jpg", text: "CAFÉ LUNA", tilt: 5, raw: 88, clean: 97 },
  { id: "c", file: "sign-031.jpg", text: "SHOE REPAIR", tilt: -10, raw: 62, clean: 91 },
  { id: "d", file: "sign-046.jpg", text: "BOOKS & CO", tilt: 8, raw: 79, clean: 94 },
];

const STEP_MS = 700;

// Miniature of the batch-analysis workflow: run a batch, watch each image move
// through the queue, search the results, toggle preprocessing, export a report.
export default function ImageAnalysisDemo() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState("idle"); // idle | running | done | cancelled
  const [processed, setProcessed] = useState(0); // how many items are finished
  const [preprocess, setPreprocess] = useState(true);
  const [query, setQuery] = useState("");
  const [exported, setExported] = useState(false);

  // Advance one image at a time while running.
  useEffect(() => {
    if (phase !== "running") return undefined;
    const timer = setTimeout(() => {
      const next = processed + 1;
      setProcessed(next);
      if (next >= ITEMS.length) setPhase("done");
    }, reduced ? 0 : STEP_MS);
    return () => clearTimeout(timer);
  }, [phase, processed, reduced]);

  const run = () => {
    setProcessed(0);
    setExported(false);
    setPhase("running");
  };

  const cancel = () => setPhase("cancelled");

  const statusOf = (index) => {
    if (index < processed) return "done";
    if (phase === "running" && index === processed) return "analyzing";
    return "queued";
  };

  const confidence = (item) => (preprocess ? item.clean : item.raw);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.map((item, index) => ({ item, index })).filter(({ item, index }) => {
      if (!q) return true;
      const done = index < processed;
      return item.file.toLowerCase().includes(q) || (done && item.text.toLowerCase().includes(q));
    });
  }, [query, processed]);

  const finished = ITEMS.slice(0, processed);
  const average = finished.length
    ? Math.round(finished.reduce((sum, item) => sum + confidence(item), 0) / finished.length)
    : 0;

  const summary = {
    idle: "Add a batch to begin",
    running: `Analyzing ${Math.min(processed + 1, ITEMS.length)} of ${ITEMS.length}…`,
    done: `Batch complete · ${ITEMS.length} images · avg ${average}%`,
    cancelled: `Cancelled · ${processed} of ${ITEMS.length} analyzed`,
  }[phase];

  return (
    <div className="mock demo demo--analysis">
      <div className="mock__bar" aria-hidden="true">
        <i /><i /><i />
      </div>

      <div className="ia__toolbar">
        <label className="ia__search">
          <span className="demo__sr">Search results</span>
          <input
            type="search"
            value={query}
            placeholder="Search results…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={preprocess}
          className={`ia__switch${preprocess ? " is-on" : ""}`}
          onClick={() => setPreprocess((value) => !value)}
        >
          <span className="ia__switch-track" aria-hidden="true"><span /></span>
          Preprocess
        </button>
      </div>

      <ul className="ia__list" aria-label="Image batch">
        {rows.length === 0 && <li className="ia__empty">No matching results</li>}
        {rows.map(({ item, index }) => {
          const status = statusOf(index);
          return (
            <li key={item.id} className={`ia__row ia__row--${status}`}>
              <span
                className={`ia__thumb${preprocess ? " is-clean" : ""}`}
                style={{ "--tilt": `${item.tilt}deg` }}
                aria-hidden="true"
              >
                <i /><i />
              </span>
              <span className="ia__meta">
                <span className="ia__file">{item.file}</span>
                <span className="ia__text">{status === "done" ? item.text : "—"}</span>
              </span>
              <span className="ia__state">
                {status === "queued" && <span className="mock__pill mock__pill--muted">Queued</span>}
                {status === "analyzing" && <span className="ia__bar" aria-label="Analyzing"><i /></span>}
                {status === "done" && (
                  <span className={`mock__pill ${confidence(item) >= 85 ? "mock__pill--sage" : "mock__pill--accent"}`}>
                    {confidence(item)}%
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="ia__footer">
        <p className="ia__summary" role="status" aria-live="polite">
          {exported ? `report.csv ready · ${processed} rows` : summary}
        </p>
        <div className="demo__actions">
          {phase === "running" ? (
            <button type="button" className="demo__btn" onClick={cancel}>Cancel</button>
          ) : (
            <button type="button" className="demo__btn demo__btn--solid" onClick={run}>
              {phase === "idle" ? "Run batch" : "Run again"}
            </button>
          )}
          <button
            type="button"
            className="demo__btn"
            onClick={() => setExported(true)}
            disabled={processed === 0 || phase === "running"}
          >
            Export report
          </button>
        </div>
      </div>
    </div>
  );
}
