import { featuredProjects, additionalProject } from "../data/content";
import Reveal from "./Reveal";
import ProjectVisual from "./ProjectVisuals";
import Stats from "./Stats";
import "./Work.css";

// A project without a live link shows an honest status instead of a dead anchor.
function ProjectLink({ href, title }) {
  if (!href) {
    return <p className="project__status">Case study in progress</p>;
  }
  return (
    <a className="link-arrow" href={href} target="_blank" rel="noopener noreferrer">
      View {title} <span className="button__arrow" aria-hidden="true">→</span>
    </a>
  );
}

function FeaturedProject({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <Reveal
      as="article"
      className={`project${index % 2 === 1 ? " project--flip" : ""}`}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project__visual">
        <ProjectVisual name={project.visual} />
      </div>

      <div className="project__copy">
        <span className="project__num" aria-hidden="true">{number}</span>
        <p className="eyebrow">Featured</p>
        <h3 id={`${project.id}-title`} className="project__title">
          {project.title}
        </h3>
        <p className="project__meta">{project.org} · {project.period}</p>
        <p className="project__summary">{project.summary}</p>
        <Stats items={project.stats} />
        <ul className="project__highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="project__tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
        <ProjectLink href={project.href} title={project.title} />
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Products I&rsquo;ve designed and built</h2>
        </Reveal>

        <div className="work__list">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        <Reveal as="article" className="also" aria-labelledby="also-title">
          <p className="eyebrow">Also</p>
          <div className="also__body">
            <h3 id="also-title" className="also__title">{additionalProject.title}</h3>
            <p className="project__meta">{additionalProject.org} · {additionalProject.period}</p>
            <p className="also__summary">{additionalProject.summary}</p>
            <Stats items={additionalProject.stats} className="stats--inline" />
            <ul className="project__tags" aria-label="Technologies">
              {additionalProject.tags.map((tag) => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>
          </div>
          <ProjectLink href={additionalProject.href} title={additionalProject.title} />
        </Reveal>
      </div>
    </section>
  );
}
