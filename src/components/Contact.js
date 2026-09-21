import { profile } from "../data/content";
import Reveal from "./Reveal";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <section id="contact" className="section contact" aria-labelledby="contact-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow contact__eyebrow">Contact</p>
            <h2 id="contact-title" className="contact__title">
              Let&rsquo;s build something <em>thoughtful</em>.
            </h2>
            <a className="contact__email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <ul className="contact__links">
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
