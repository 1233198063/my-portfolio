import React from "react";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import "./App.css";

function App() {
  return (
    <div>
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

      <Element name="home" className="element">
        <h1>Home Section</h1>
      </Element>

      <Element name="about" className="element">
        <h1>About Section</h1>
      </Element>

      <Element name="work" className="element">
        <h1>Work Section</h1>
      </Element>

      <Element name="skills" className="element">
        <h1>Skills Section</h1>
      </Element>

      <Element name="contact" className="element">
        <h1>Contact Section</h1>
      </Element>
    </div>
  );
}

export default App;
