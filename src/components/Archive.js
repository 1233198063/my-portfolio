import { archive } from "../data/content";
import Reveal from "./Reveal";
import "./Archive.css";

// Earlier projects live here as a quiet index, not as showcase cards.
export default function Archive() {
  return (
    <section
      id="archive"
      className="section archive"
      style={{ "--section-pad": "var(--space-8)" }}
      aria-labelledby="archive-title"
    >
      <div className="container">
        <Reveal>
          <p className="eyebrow">Archive</p>
          <h2 id="archive-title" className="archive__title">Earlier experiments</h2>
          <ul className="archive__list">
            {archive.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <span className="archive__name">{item.title}</span>
                  <span className="archive__tech">{item.tech}</span>
                  <span className="button__arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
