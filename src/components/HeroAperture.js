// Decorative hero picture: a view through an arched window, the sun low over water.
// Drawn in SVG so it follows the theme (dusk in dark, dawn in light) through the --scene-*
// tokens. Layers carry a --depth that usePointerParallax (on the hero) turns into offsets.

const HORIZON = 330;
const SUN = { x: 200, y: 322, r: 30 };
const ARCH_INNER = "M28 520 V200 A172 172 0 0 1 372 200 V520 Z";
const ARCH_OUTER = "M16 520 V200 A184 184 0 0 1 384 200 V520";
const ARCH_LINE = "M28 520 V200 A172 172 0 0 1 372 200 V520";

// Park–Miller generator: the glitter path is identical on every render.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Sunlight on water: short strokes under the sun that widen and thin out toward the viewer.
const GLINTS = (() => {
  const rand = seeded(11);
  const strokes = [];
  for (let row = 0; row < 17; row += 1) {
    const y = HORIZON + 5 + row * 10.6 + rand() * 3;
    const spread = 5 + row * 2.4;
    const pieces = row < 4 ? 1 : 2;
    for (let p = 0; p < pieces; p += 1) {
      const width = ((12 + row * 2.8) * (0.5 + rand() * 0.7)) / pieces;
      strokes.push({
        x: SUN.x + (rand() - 0.5) * spread * 2 - width / 2,
        y,
        width,
        opacity: Math.max(0.2, 0.95 - row * 0.04 - rand() * 0.15),
        delay: `${-(rand() * 4).toFixed(2)}s`,
        duration: `${(2.2 + rand() * 2.8).toFixed(2)}s`,
      });
    }
  }
  return strokes;
})();

// Rays around the window: [angle in degrees, strength 0..1, length in rem]. Uneven on purpose.
const RAYS = [
  [9, 1, 17], [31, 0.55, 14], [52, 0.8, 16], [83, 1, 19], [107, 0.5, 13], [140, 0.9, 17], [174, 0.6, 15],
  [204, 1, 18], [231, 0.5, 13], [257, 0.85, 16], [291, 0.6, 14], [321, 1, 18], [347, 0.5, 13],
];

// Three birds at different distances. `rest` is where each one waits when motion is reduced.
const BIRDS = [
  { y: 120, scale: 1, duration: "46s", delay: "-15s", flap: "1.7s", rest: 236 },
  { y: 138, scale: 0.78, duration: "54s", delay: "-31s", flap: "1.4s", rest: 262 },
  { y: 104, scale: 0.6, duration: "62s", delay: "-6s", flap: "1.9s", rest: 150 },
];

const stop = (offset, color, opacity = 1) => (
  <stop offset={offset} style={{ stopColor: `var(${color})`, stopOpacity: opacity }} />
);

export default function HeroAperture() {
  return (
    <figure className="aperture" aria-hidden="true">
      <div className="aperture__halo" />
      <div className="aperture__rays" style={{ "--depth": -10 }}>
        {RAYS.map(([angle, strength, length]) => (
          <span
            key={angle}
            className="aperture__ray"
            style={{ "--a": `${angle}deg`, "--k": strength, "--len": `${length}rem` }}
          />
        ))}
      </div>

      <svg className="aperture__scene" viewBox="0 0 400 540" focusable="false">
        <defs>
          <linearGradient id="ap-sky" x1="0" y1="28" x2="0" y2={HORIZON} gradientUnits="userSpaceOnUse">
            {stop(0, "--scene-sky-top")}
            {stop(0.55, "--scene-sky-mid")}
            {stop(0.86, "--scene-sky-low")}
            {stop(1, "--scene-horizon")}
          </linearGradient>
          <linearGradient id="ap-water" x1="0" y1={HORIZON} x2="0" y2="520" gradientUnits="userSpaceOnUse">
            {stop(0, "--scene-water-top")}
            {stop(1, "--scene-water-low")}
          </linearGradient>
          <radialGradient id="ap-sun">
            {stop(0, "--scene-sun-core")}
            {stop(0.55, "--scene-sun-core")}
            {stop(1, "--scene-sun-edge")}
          </radialGradient>
          <radialGradient id="ap-halo">
            {stop(0, "--scene-horizon", 0.75)}
            {stop(0.4, "--scene-horizon", 0.25)}
            {stop(1, "--scene-horizon", 0)}
          </radialGradient>
          <clipPath id="ap-window">
            <path d={ARCH_INNER} />
          </clipPath>
          <clipPath id="ap-above-water">
            <rect x="-40" y="-40" width="480" height={HORIZON + 40} />
          </clipPath>
          <filter id="ap-soften" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <g className="ap-scene" clipPath="url(#ap-window)">
          <rect x="-40" y="0" width="480" height={HORIZON + 1} fill="url(#ap-sky)" />

          <g className="ap-depth" style={{ "--depth": 3 }}>
            <g className="ap-sun">
              <circle cx={SUN.x} cy={SUN.y} r="170" fill="url(#ap-halo)" />
              <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill="url(#ap-sun)" clipPath="url(#ap-above-water)" />
            </g>
          </g>

          {BIRDS.map((bird) => (
            <g key={bird.y} transform={`translate(0 ${bird.y}) scale(${bird.scale})`}>
              <g
                className="ap-bird"
                style={{
                  "--from": `${-24 / bird.scale}px`,
                  "--to": `${424 / bird.scale}px`,
                  "--rest": `${bird.rest / bird.scale}px`,
                  "--fly": bird.duration,
                  "--fly-delay": bird.delay,
                  "--flap": bird.flap,
                }}
              >
                <path className="ap-bird__wings" d="M-8 0 Q-4 -4.2 0 0 Q4 -4.2 8 0" />
              </g>
            </g>
          ))}

          <g className="ap-depth" style={{ "--depth": 5 }}>
            <path
              className="ap-ridge ap-ridge--far"
              d="M-20 331 V296 C 30 286, 80 290, 118 302 C 146 311, 172 322, 200 327 C 228 322, 262 306, 296 298 C 330 290, 380 286, 420 292 V331 Z"
            />
          </g>

          <rect x="-40" y={HORIZON} width="480" height="200" fill="url(#ap-water)" />
          <line className="ap-horizon" x1="-40" y1={HORIZON} x2="440" y2={HORIZON} />

          <g className="ap-depth" style={{ "--depth": 3 }}>
            <ellipse className="ap-column" cx={SUN.x} cy={HORIZON + 70} rx="46" ry="96" fill="url(#ap-halo)" />
            {GLINTS.map((g, i) => (
              <rect
                key={i}
                className="ap-glint"
                x={g.x.toFixed(1)}
                y={g.y.toFixed(1)}
                width={g.width.toFixed(1)}
                height="1.6"
                rx="0.8"
                style={{ "--o": g.opacity.toFixed(2), "--d": g.delay, "--t": g.duration }}
              />
            ))}
          </g>

          <g className="ap-depth" style={{ "--depth": 9 }}>
            <path className="ap-ridge" d="M-20 331 V306 C 20 298, 64 300, 100 313 C 120 321, 138 328, 156 331 Z" />
            <path className="ap-ridge" d="M420 331 V310 C 380 302, 334 308, 302 320 C 286 326, 272 330, 262 331 Z" />
          </g>

          <g className="ap-depth" style={{ "--depth": 13 }}>
            <g className="ap-mist ap-mist--a" filter="url(#ap-soften)">
              <ellipse cx="110" cy="322" rx="120" ry="6" />
              <ellipse cx="310" cy="336" rx="110" ry="5" />
            </g>
            <g className="ap-mist ap-mist--b" filter="url(#ap-soften)">
              <ellipse cx="230" cy="312" rx="150" ry="4.5" />
              <ellipse cx="60" cy="342" rx="90" ry="4" />
            </g>
          </g>
        </g>

        <path className="ap-frame" d={ARCH_OUTER} pathLength="1" />
        <path className="ap-frame ap-frame--inner" d={ARCH_LINE} pathLength="1" />
        <line className="ap-sill" x1="2" y1="520" x2="398" y2="520" />
      </svg>
    </figure>
  );
}
