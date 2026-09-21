import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Experience from "./components/Experience";
import About from "./components/About";
import Credentials from "./components/Credentials";
import Archive from "./components/Archive";
import Contact from "./components/Contact";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
