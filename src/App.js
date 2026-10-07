import Atmosphere from "./components/Atmosphere";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Experience from "./components/Experience";
import About from "./components/About";
import Credentials from "./components/Credentials";
import Archive from "./components/Archive";
import Contact from "./components/Contact";
import SwallowCursor from "./components/SwallowCursor";

function App() {
  return (
    <>
      <Atmosphere />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Credentials />
        <Archive />
      </main>
      <Contact />
      <SwallowCursor />
    </>
  );
}

export default App;
