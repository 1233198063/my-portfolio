import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "../data/content";
import useActiveSection from "../hooks/useActiveSection";
import useTheme from "../hooks/useTheme";
import "./Header.css";

const sectionIds = navItems.map((item) => item.id);

// Sun for "switch to dawn", crescent for "switch to dusk". Hairline strokes to match the frame lines.
function ThemeIcon({ theme }) {
  return theme === "dark" ? (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const active = useActiveSection(sectionIds);
  const [theme, toggleTheme] = useTheme();
  const nextLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  // Escape closes the mobile menu and returns focus to its trigger.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top" onClick={() => setOpen(false)}>
          <span className="site-header__mark" aria-hidden="true" />
          {profile.name}
        </a>

        <nav aria-label="Primary">
          <ul id="primary-nav" className={`site-nav${open ? " is-open" : ""}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__theme"
          aria-label={nextLabel}
          title={nextLabel}
          onClick={toggleTheme}
        >
          <ThemeIcon theme={theme} />
        </button>

        <button
          ref={buttonRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
