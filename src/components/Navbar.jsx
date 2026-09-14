import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const MOBILE_BREAKPOINT = 768;

const links = [
  { to: "/home", label: "home" },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // if the window gets resized past the mobile breakpoint while the menu is open
  // (rotating a tablet, say), close it — otherwise it'd get stuck open on desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="primary navigation">
        <NavLink to="/home" className="nav__logo" aria-label="sharan deepak — home" onClick={() => setMenuOpen(false)}>
          portfolio
        </NavLink>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav-links"
          aria-label={menuOpen ? "close menu" : "open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
        </button>

        <ul id="primary-nav-links" className={`nav__links ${menuOpen ? "nav__links--open" : ""}`} role="list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav__theme">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
