import { useState } from "react";
import "./header.scss";
import variables from "../../global-styles/variables.scss";
import Button from "../shared/button/button.js";

const NAV_LINKS = [
  { label: "Home",         href: "#HOME"    },
  { label: "About",        href: "#ABOUT"   },
  { label: "Experience",   href: "#EXP"     },
  { label: "Services",     href: "#SERVICES"},
  { label: "Projects",     href: "#PORT"    },
  { label: "Testimonials", href: "#TEST"    },
  { label: "Contact",      href: "#CONTACT" },
];

export default function Header({ flipLogo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header id="HEADER">
      <a href="#HOME" className="logo" aria-label="Go to home">
        <img
          className={"logo-icon " + (flipLogo ? "logo-spin" : "")}
          src="/assets/clip-art-images/ijeri-logo-icon-gw.png"
          alt="Ijeri logo icon"
        />
        <img
          className={"logo-text whiter " + (flipLogo ? "logo-text-disappear" : "logo-text-appear")}
          src="/assets/clip-art-images/ijeri-logo-text.png"
          alt="Ijeri logo text"
        />
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-cta">
        <Button variant="secondary" href="mailto:ijeri.omitogun@gmail.com">
          Let's Talk
        </Button>
      </div>

      <button
        className="hamburger-menu"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <MenuSvg color={variables.secondaryColor} />
      </button>

      {menuOpen && (
        <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-overlay__header">
            <a href="#HOME" className="logo" onClick={toggleMenu} aria-label="Go to home">
              <img className="logo-icon" src="/assets/clip-art-images/ijeri-logo-icon-gw.png" alt="Ijeri logo icon" />
            </a>
            <button className="mobile-overlay__close" type="button" aria-label="Close navigation menu" onClick={toggleMenu}>
              <CloseSvg color={variables.secondaryColor} />
            </button>
          </div>
          <nav className="mobile-overlay__links" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="mobile-overlay__link" onClick={toggleMenu}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mobile-overlay__socials">
            <a className="social-link" href="https://www.linkedin.com/in/ijeri-omitogun/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/assets/link-images/linkedin.svg" alt="LinkedIn" />
            </a>
            <a className="social-link" href="https://github.com/ijeriomit" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src="/assets/link-images/github.svg" alt="GitHub" />
            </a>
            <a className="social-link" href="https://medium.com/@jeri-omit" target="_blank" rel="noreferrer" aria-label="Medium">
              <img src="/assets/link-images/medium.svg" alt="Medium" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuSvg({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 17L14 17" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 12L18 12" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 7L22 7"  stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseSvg({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 6L6 18" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M6 6L18 18" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
