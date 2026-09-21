import { useRef } from "react";
import { profile } from "../data/content";
import usePointerParallax from "../hooks/usePointerParallax";
import HeroCollage from "./HeroCollage";
import "./Hero.css";
import "./WorkMock.css";

// Each word rises in on its own delay (--i) for a staggered headline entrance.
const Word = ({ i, className = "", children }) => (
  <span className={`hero__word ${className}`.trim()} style={{ "--i": i }}>
    {children}
  </span>
);

export default function Hero() {
  const heroRef = useRef(null);
  usePointerParallax(heroRef);

  return (
    <section ref={heroRef} id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <b>{profile.name}</b> — {profile.role}
          </p>

          <h1 id="hero-title" className="hero__title">
            <Word i={0}>Interfaces</Word>{" "}
            <Word i={1}>that</Word>{" "}
            <Word i={2}>make</Word>{" "}
            <Word i={3} className="hero__em">
              complicated work
            </Word>{" "}
            <Word i={4}>feel</Word>{" "}
            <Word i={5}>calm.</Word>
          </h1>

          <p className="hero__lede">
            I design and build AI-assisted products in code, where typography,
            motion and system state are worked out in the prototype, not lost in
            handoff.
          </p>

          <div className="hero__actions">
            <a className="button button--solid" href="#work">
              See selected work <span className="button__arrow" aria-hidden="true">→</span>
            </a>
            <a className="button" href={`mailto:${profile.email}`}>
              Say hello
            </a>
          </div>
        </div>

        <HeroCollage />
      </div>

      <div className="container">
        <dl className="hero__facts">
          <div>
            <dt className="eyebrow">Focus</dt>
            <dd>{profile.focus}</dd>
          </div>
          <div>
            <dt className="eyebrow">Stack</dt>
            <dd>{profile.stack}</dd>
          </div>
          <div>
            <dt className="eyebrow">Elsewhere</dt>
            <dd>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              {" · "}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
