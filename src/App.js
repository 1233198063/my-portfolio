import React, { useState, useEffect } from "react";
import { Link, Element } from "react-scroll";
import "./styles/styles.css";
import cssLogo from "./images/css.png";
import htmlLogo from "./images/html.png";
import jsLogo from "./images/js.png";
import reactLogo from "./images/react.png";

function App() {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const sections = document.querySelectorAll(".element");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("data-section");
      }
    });

    console.log(currentSection);
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* top navbar */}
      <nav>
        <ul>
          <li>
            <Link to="home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li>
            <Link to="work" smooth={true} duration={500}>
              Work
            </Link>
          </li>
          <li>
            <Link to="skills" smooth={true} duration={500}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right side dots */}
      <ul className="dot-nav">
        <li className={activeSection === "home" ? "dot active" : "dot"}></li>
        <li className={activeSection === "about" ? "dot active" : "dot"}></li>
        <li className={activeSection === "work" ? "dot active" : "dot"}></li>
        <li className={activeSection === "skills" ? "dot active" : "dot"}></li>
        <li className={activeSection === "contact" ? "dot active" : "dot"}></li>
      </ul>

      {/* home section */}
      <Element name="home" className="element" data-section="home">
        <h1>Home Section</h1>
        <div className="introduce">Hi, I'm Yuexin Li</div>
        <div className="skills">
          WEB DEVELOPER FRONTEND ENGINEER REACT NATIVE DEVELOPER BACKEND
          ENGINEER FULLSTACK DEVELOPER
        </div>
        <div className="photo"></div>
        <ul className="skills">
          <li>
            <img src={cssLogo} alt="CSS Logo" />
          </li>
          <li>
            <img src={htmlLogo} alt="HTML Logo" />
          </li>
          <li>
            <img src={jsLogo} alt="JavaScript Logo" />
          </li>
          <li>
            <img src={reactLogo} alt="React Logo" />
          </li>
        </ul>
      </Element>

      <Element name="about" className="element" data-section="about">
        <h1>About Section</h1>
      </Element>

      <Element name="work" className="element" data-section="work">
        <h1>Work Section</h1>
      </Element>

      <Element name="skills" className="element" data-section="skills">
        <h1>Skills Section</h1>
      </Element>

      <Element name="contact" className="element" data-section="contact">
        <h1>Contact Section</h1>
      </Element>
    </div>
  );
}

export default App;
