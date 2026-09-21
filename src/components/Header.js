import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "../data/content";
import useActiveSection from "../hooks/useActiveSection";
import "./Header.css";

const sectionIds = navItems.map((item) => item.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const active = useActiveSection(sectionIds);

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
      </div>
    </header>
  );
}
