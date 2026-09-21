import { education, publication } from "../data/content";
import Reveal from "./Reveal";
import "./Credentials.css";

export default function Credentials() {
  return (
    <section id="education" className="section section--tinted" aria-labelledby="education-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Education &amp; research</p>
          <h2 id="education-title">Where the foundations come from</h2>
        </Reveal>

        <div className="credentials">
          <Reveal as="article" className="credential">
            <p className="eyebrow">Education</p>
            <h3 className="credential__title">{education.school}</h3>
            <p className="credential__detail">{education.degree}</p>
            <p className="credential__meta">
              {education.gpa} · {education.graduated} · {education.location}
            </p>
          </Reveal>

          <Reveal as="article" className="credential" delay={120}>
            <p className="eyebrow">Publication</p>
            <h3 className="credential__title credential__title--paper">
              &ldquo;{publication.title}&rdquo;
            </h3>
            <p className="credential__detail">{publication.authors}</p>
            <p className="credential__meta">{publication.venue}</p>
            <a
              className="link-arrow credential__link"
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI {publication.doi} <span className="button__arrow" aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
