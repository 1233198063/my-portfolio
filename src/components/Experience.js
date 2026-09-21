import { useState } from "react";
import { experience } from "../data/content";
import Reveal from "./Reveal";
import "./Experience.css";

const VISIBLE_COUNT = 2;

// Each role shows its first bullets and folds the rest. The newest role starts open.
function Job({ job, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const lead = job.achievements.slice(0, VISIBLE_COUNT);
  const rest = job.achievements.slice(VISIBLE_COUNT);
  const moreId = `${job.company.replace(/\W+/g, "-").toLowerCase()}-more`;

  return (
    <Reveal as="li" className="job">
      <div className="job__meta">
        <p className="job__period">{job.period}</p>
        <p className="job__location">{job.location}</p>
      </div>
      <div className="job__body">
        <h3 className="job__company">{job.company}</h3>
        <p className="job__role">{job.role}</p>

        <ul className="job__achievements">
          {lead.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {rest.length > 0 && (
          <>
            {/* grid 0fr→1fr animates height without measuring; inert-like via visibility */}
            <div id={moreId} className={`job__more${open ? " is-open" : ""}`}>
              <ul className="job__achievements job__achievements--more">
                {rest.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="job__toggle"
              aria-expanded={open}
              aria-controls={moreId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="job__toggle-icon" aria-hidden="true" />
              {open ? "Show less" : `Show ${rest.length} more`}
            </button>
          </>
        )}

        <p className="job__stack">
          <span className="eyebrow">Tools</span> {job.stack}
        </p>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section section--tinted" aria-labelledby="experience-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">Where I&rsquo;ve worked</h2>
        </Reveal>

        <ol className="experience__list">
          {experience.map((job, index) => (
            <Job key={job.company} job={job} defaultOpen={index === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}
