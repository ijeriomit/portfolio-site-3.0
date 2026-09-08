import { useEffect, useState } from "react";
import "./header.scss";
import variables from "../../global-styles/variables.scss";
import Button from "../shared/button/button.js";

const NAV_LINKS = [
  { label: "Home", href: "#HOME" },
  { label: "About", href: "#ABOUT" },
  { label: "Experience", href: "#EXP" },
  { label: "Services", href: "#SERVICES" },
  { label: "Portfolio", href: "#PORT" },
  { label: "Testimonials", href: "#TEST" },
  { label: "Contact", href: "#CONTACT" },
];

export default function Header({ flipLogo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) =>
      document.getElementById(href.slice(1))
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: document.querySelector(".App"),
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header id="HEADER">
      <a href="#HOME" className="logo" aria-label="Go to home">
        <img
          className={"logo-icon " + (flipLogo ? "logo-spin" : "")}
          src={`${process.env.PUBLIC_URL}/assets/clip-art-images/Ijeri-logo-icon-gw.png`}
          alt="Ijeri logo icon"
        />
        <img
          className={
            "logo-text whiter " +
            (flipLogo ? "logo-text-disappear" : "logo-text-appear")
          }
          src={`${process.env.PUBLIC_URL}/assets/clip-art-images/ijeri-logo-text.png`}
          alt="Ijeri logo text"
        />
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={
              "nav-link" +
              (activeSection === link.href.slice(1) ? " nav-link--active" : "")
            }
            aria-current={
              activeSection === link.href.slice(1) ? "page" : undefined
            }
            onClick={() => setActiveSection(link.href.slice(1))}
          >
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
        <div
          className="mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-overlay__header">
            <a
              href="#HOME"
              className="logo"
              onClick={toggleMenu}
              aria-label="Go to home"
            >
              <img
                className="logo-icon"
                src={`${process.env.PUBLIC_URL}/assets/clip-art-images/Ijeri-logo-icon-gw.png`}
                alt="Ijeri logo icon"
              />
            </a>
            <button
              className="mobile-overlay__close"
              type="button"
              aria-label="Close navigation menu"
              onClick={toggleMenu}
            >
              <CloseSvg color={variables.secondaryColor} />
            </button>
          </div>
          <nav className="mobile-overlay__links" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  "mobile-overlay__link" +
                  (activeSection === link.href.slice(1)
                    ? " mobile-overlay__link--active"
                    : "")
                }
                aria-current={
                  activeSection === link.href.slice(1) ? "page" : undefined
                }
                onClick={() => {
                  setActiveSection(link.href.slice(1));
                  toggleMenu();
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mobile-overlay__socials">
            <a
              className="social-link"
              href="https://www.linkedin.com/in/ijeri-omitogun/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src={`${process.env.PUBLIC_URL}/assets/link-images/linkedin.svg`} alt="LinkedIn" />
            </a>
            <a
              className="social-link"
              href="https://github.com/ijeriomit"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <img src={`${process.env.PUBLIC_URL}/assets/link-images/github.svg`} alt="GitHub" />
            </a>
            <a
              className="social-link"
              href="https://medium.com/@jeri-omit"
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
            >
              <img src={`${process.env.PUBLIC_URL}/assets/link-images/medium.svg`} alt="Medium" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuSvg({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 17L14 17"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 12L18 12"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 7L22 7"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseSvg({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 6L18 18"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
