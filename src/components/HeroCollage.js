// Decorative hero composition: the two featured products in miniature, overlapping.
// Purely presentational (aria-hidden, not focusable); the interactive versions live in
// the Work section. Each card carries a --depth so the pointer parallax moves them apart.
const ROUTE =
  "M30 150 C 60 150, 70 100, 100 100 S 150 130, 170 120 S 205 55, 225 55 S 255 35, 275 32";

export default function HeroCollage() {
  return (
    <figure className="hero__art" aria-hidden="true">
      <div className="hc hc--map mock" style={{ "--depth": 14 }}>
        <svg viewBox="0 0 300 190" focusable="false">
          <path className="hc__ghost" d={ROUTE} />
          <path className="hc__route" d={ROUTE} pathLength="1" />
          {[[30, 150], [100, 100], [170, 120], [225, 55], [275, 32]].map(([x, y], i) => (
            <circle
              key={i}
              className={i === 3 ? "hc__node hc__node--on" : "hc__node"}
              cx={x}
              cy={y}
              r={i === 3 ? 10 : 7}
            />
          ))}
        </svg>
        <div className="hc__caption">
          <span className="mock__line mock__line--title" />
          <span className="mock__line mock__line--short" />
        </div>
      </div>

      <div className="hc hc--workspace mock" style={{ "--depth": 30 }}>
        <div className="mock__bar"><i /><i /><i /></div>
        <div className="hc__body">
          <div className="hc__queue">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className={`hc__row${n === 1 ? " is-on" : ""}`}>
                <span className="hc__dot" />
                <span className="mock__line" />
              </div>
            ))}
          </div>
          <div className="hc__detail">
            <span className="mock__line mock__line--title" />
            <span className="mock__line" />
            <div className="hc__draft">
              <span className="mock__pill mock__pill--accent">Needs review</span>
              <span className="mock__line" />
              <span className="mock__line mock__line--short" />
              <span className="hc__button">Approve &amp; send</span>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="hero__caption">Fig. 1 — selected work, in miniature</figcaption>
    </figure>
  );
}
