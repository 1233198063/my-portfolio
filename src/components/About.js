import { about } from "../data/content";
import Reveal from "./Reveal";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__lead">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="about__statement">
            {about.intro}
          </h2>
        </Reveal>

        <Reveal className="about__side" delay={120}>
          <ul className="principles">
            {about.principles.map((item) => (
              <li key={item.title}>
                <h3 className="principles__title">{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>

          <div>
            <p className="eyebrow about__toolkit-label">Toolkit</p>
            <dl className="skills">
              {about.skills.map((group) => (
                <div key={group.label} className="skills__group">
                  <dt>{group.label}</dt>
                  <dd>
                    <ul className="toolkit">
                      {group.items.map((tool) => (
                        <li key={tool} className="tag">{tool}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
