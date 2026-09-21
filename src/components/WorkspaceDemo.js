import { useEffect, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import "./Demos.css";

const CONVERSATIONS = ["Conversation 1", "Conversation 2", "Conversation 3", "Conversation 4"];
const DRAFT_MS = 1600;

const STATUS = {
  drafting: { pill: "Drafting…", tone: "sage", text: "Drafting a reply" },
  ready: { pill: "Needs review", tone: "accent", text: "Draft ready for review" },
  sent: { pill: "Sent", tone: "sage", text: "Reply approved and sent" },
  cancelled: { pill: "Cancelled", tone: "muted", text: "Drafting cancelled" },
};

// A small state machine that mirrors the real workspace's human-in-the-loop flow:
// the AI drafts, a person reviews, and can approve, cancel or retry.
export default function WorkspaceDemo() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(1);
  const [status, setStatus] = useState("ready");
  const [run, setRun] = useState(0); // bumps to restart drafting

  useEffect(() => {
    if (status !== "drafting") return undefined;
    const timer = setTimeout(() => setStatus("ready"), reduced ? 0 : DRAFT_MS);
    return () => clearTimeout(timer);
  }, [status, run, reduced]);

  const startDraft = () => {
    setStatus("drafting");
    setRun((n) => n + 1);
  };

  const select = (index) => {
    setActive(index);
    startDraft();
  };

  const view = STATUS[status];

  return (
    <div className="mock demo demo--workspace">
      <div className="mock__bar" aria-hidden="true">
        <i /><i /><i />
      </div>

      <div className="demo__body">
        <div className="demo__queue" role="group" aria-label="Conversation queue">
          {CONVERSATIONS.map((name, i) => (
            <button
              key={name}
              type="button"
              className={`demo__row${i === active ? " is-selected" : ""}`}
              aria-pressed={i === active}
              aria-label={name}
              onClick={() => select(i)}
            >
              <span className="demo__row-dot" />
              <span className="mock__line" />
            </button>
          ))}
        </div>

        <div className="demo__detail">
          <span className="mock__line mock__line--title" aria-hidden="true" />
          <span className="mock__line" aria-hidden="true" />

          <div className={`demo__draft demo__draft--${status}`}>
            <div className="demo__status" role="status" aria-live="polite">
              <span className={`mock__pill mock__pill--${view.tone}`}>{view.pill}</span>
              <span className="demo__sr">{view.text}</span>
            </div>
            <span className="mock__line demo__stream" aria-hidden="true" />
            <span className="mock__line mock__line--short demo__stream" aria-hidden="true" />
            <span className="mock__line demo__stream" aria-hidden="true" />

            <div className="demo__actions">
              {status === "drafting" && (
                <button type="button" className="demo__btn" onClick={() => setStatus("cancelled")}>
                  Cancel
                </button>
              )}
              {status === "ready" && (
                <>
                  <button type="button" className="demo__btn demo__btn--solid" onClick={() => setStatus("sent")}>
                    Approve &amp; send
                  </button>
                  <button type="button" className="demo__btn" onClick={startDraft}>
                    Regenerate
                  </button>
                </>
              )}
              {status === "cancelled" && (
                <button type="button" className="demo__btn demo__btn--solid" onClick={startDraft}>
                  Retry
                </button>
              )}
              {status === "sent" && (
                <button type="button" className="demo__btn" onClick={startDraft}>
                  Draft another
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
