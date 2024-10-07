import React, { useState, useEffect } from "react";
import { Link, Element } from "react-scroll";
import "./styles/styles.css";
import myPhoto from "./images/大证件照.jpg";
import htmlLogo from "./images/css.png";
import cssLogo from "./images/html.png";
import jsLogo from "./images/js.png";
import reactLogo from "./images/react.png";
import linkedin from "./images/linkedin.svg";
import github from "./images/logo.png";
import webDevelopment from "./images/app-development.png";
import reactPicture from "./images/react-picture.png";
import frontend from "./images/ux.png";
import nodeLogo from "./images/node.png";
import lessLogo from "./images/less.jpg";
import gitLogo from "./images/git.png";
import sassLogo from "./images/sass.png";
import tsLogo from "./images/ts.png";
import reduxLogo from "./images/redux.png";
import vacationProject from "./images/vacation.png";
import shopProject from "./images/eyewear.png";
import weatherProject from "./images/Weather.png";
import email from "./images/email.png";
import phone from "./images/phone.png";

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
        <div className="logo">
          <span className="thin-span">Yuexin</span>Li
        </div>
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

      {/* Home section */}
      <Element name="home" className="element home" data-section="home">
        <h1 className="introduce">
          Hi, I'm Yuexin Li
          <span class="material-symbols-outlined">handshake</span>
        </h1>

        <div className="content">
          <div className="position">
            WEB DEVELOPER
            <br />
            FRONTEND ENGINEER
            <br />
            REACT NATIVE DEVELOPER
            {/* <br/>BACKEND ENGINEER  */}
            {/* <br /> */}
            {/* FULLSTACK DEVELOPER */}
          </div>
          <img
            className="photo"
            src={myPhoto}
            alt="My formal business attire ID photo"
          />
          <ul className="skills-img">
            <li className="css-logo">
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
        </div>

        <div className="social-media">
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/yuexin-li-317401251/"
          >
            <img src={linkedin} alt="linkedin icon" />
          </a>

          <a className="github" href="https://github.com/1233198063">
            {/* <a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by Tahsin Tahil - Flaticon</a> */}
            <img src={github} alt="github icon"></img>
            {/* <a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by Tahsin Tahil - Flaticon</a> */}
          </a>
        </div>
      </Element>

      <Element name="about" className="element about" data-section="about">
        <h1>About Me</h1>
        <div className="about-cards">
          <div className="about-card">
            <div className="card-img">
              {/* <a href="https://www.flaticon.com/free-icons/development" title="development icons">Development icons created by Design Circle - Flaticon</a> */}
              <img src={webDevelopment} alt="" />
            </div>
            <div className="card-bottom">
              <div className="card-info card-info1">
                <h3 className="card-title">WEB DEVELOPER</h3>
                <p>
                  Experienced in building interactive and responsive web
                  applications, I specialize in front-end development with a
                  focus on React and modern JavaScript frameworks. My work
                  emphasizes creating smooth user experiences with clean,
                  maintainable code.
                </p>
              </div>
            </div>
          </div>

          <div className="about-card">
            <div className="card-img">
              {/* <a href="https://www.flaticon.com/free-icons/react" title="react icons">React icons created by Freepik - Flaticon</a> */}
              <img src={reactPicture} alt="" />
            </div>
            <div className="card-bottom">
              <div className="card-info">
                <h3 className="card-title">REACT NATIVE DEVELOPER</h3>
                <p>
                  Skilled in building high-performance applications using React
                  Native, I focus on delivering seamless cross-platform
                  experiences. Leveraging my expertise in JavaScript, I build
                  scalable solutions that ensure smooth user interactions and
                  optimal performance.
                </p>
              </div>
            </div>
          </div>

          <div className="about-card">
            <div className="card-img">
              {/* <a href="https://www.flaticon.com/free-icons/design" title="design icons">Design icons created by Freepik - Flaticon</a> */}
              <img src={frontend} alt="" />
            </div>
            <div className="card-bottom">
              <div className="card-info">
                <h3 className="card-title">FRONTEND ENGINEER</h3>
                <p>
                  I specialize in front-end development, focusing on React and
                  modern JavaScript frameworks. I implement clean, maintainable
                  code and prioritize user-centric design to create seamless,
                  responsive web experiences. I am passionate about the latest
                  technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>

      <Element name="work" className="element work" data-section="work">
        <h1>My Works</h1>

        <div className="browse-work">
          <a href="https://1233198063.github.io/vacation-web/">
            <div className="post">
              <div className="post-top">
                <img src={vacationProject} className="post-img"></img>
              </div>
              <div className="post-bottom">
                <div className="tech subtitle">JavaScript</div>
                <h3>Vacation Website - COVILLA</h3>
                <p>
                  Welcome to COVILLA, a family-oriented travel website designed
                  to help you plan your next vacation with ease. With a wide
                  range of destinations and hand-picked vacation packages, we
                  make it simple to find the perfect getaway for you and your
                  loved ones.
                </p>
              </div>
            </div>
          </a>

          <a href="https://1233198063.github.io/Weather-API-Platform/">
            <div className="post">
              <div className="post-top">
                <img src={weatherProject} className="post-img"></img>
              </div>
              <div className="post-bottom">
                <div className="tech subtitle">HTML CSS</div>
                <h3>Weather API Platform</h3>
                <p>
                  This is a platform for the Weatherstack API, providing users
                  with pricing plans, documentation, affiliate programs, blog
                  posts, and more to support their use of the Weatherstack API.
                </p>
              </div>
            </div>
          </a>

          <a href="">
            <div className="post">
              <div className="post-top">
                <img src={shopProject} className="post-img"></img>
              </div>
              <div className="post-bottom">
                <div className="tech subtitle">NodeJs</div>
                <h3>Online Eyewear Shopping Website</h3>
                <p>
                  This functional e-commerce platform lets users browse
                  products, add items to a cart, and make purchases. It
                  integrates Firebase for authentication and database
                  management, with Redux for state management and
                  styled-components for UI design.
                </p>
              </div>
            </div>
          </a>
        </div>
      </Element>

      <Element name="skills" className="element skills" data-section="skills">
        <h1>My Skills</h1>
        <div className="skills-icons">
          <div className="skills-icon node-js">
            <div className="circle">
              <img src={nodeLogo}></img>
            </div>
            <p>Node JS</p>
          </div>
          <div className="skills-icon less">
            <div className="circle">
              <img src={lessLogo}></img>
            </div>
            <p>less</p>
          </div>
          <div className="skills-icon git">
            <div className="circle">
              <img src={gitLogo}></img>
            </div>
            <p>git</p>
          </div>
          <div className="skills-icon html">
            <div className="circle">
              <img src={htmlLogo}></img>
            </div>
            <p>HTML</p>
          </div>
          <div className="skills-icon css">
            <div className="circle">
              <img src={cssLogo}></img>
            </div>
            <p>CSS</p>
          </div>
          <div className="skills-icon js">
            <div className="circle">
              <img src={jsLogo}></img>
            </div>
            <p>JavaScript</p>
          </div>
          <div className="skills-icon sass">
            <div className="circle">
              <img src={sassLogo}></img>
            </div>
            <p>Sass</p>
          </div>
          <div className="skills-icon ts">
            <div className="circle">
              <img src={tsLogo}></img>
            </div>
            <p>Typescript</p>
          </div>
          <div className="skills-icon redux">
            <div className="circle">
              <img src={reduxLogo}></img>
            </div>
            <p>Redux</p>
          </div>
        </div>
      </Element>

      <Element
        name="contact"
        className="element contact"
        data-section="contact"
      >
        <h1>Contact Me</h1>
        <div className="contact-cards">
          <div className="contact-card email-card">
            {/* <a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Uniconlabs - Flaticon</a> */}
            <img className="email" src={email}></img>
            <p>yuexinli1203@gmail.com</p>
          </div>
          <div className="contact-card phone-card">
            {/* <a href="https://www.flaticon.com/free-icons/cellphone" title="cellphone icons">Cellphone icons created by riajulislam - Flaticon</a> */}
            <img className="phone-number" src={phone}></img>
            <p>(925)-791-9319</p>
          </div>
        </div>
      </Element>
    </div>
  );
}

export default App;
