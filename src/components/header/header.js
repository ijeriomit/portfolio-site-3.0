import { useState } from "react";
import "./header.scss";
import variables from "../../global-styles/variables.scss";

export default function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  function menuClicked() {
    setMenuOpen(!menuOpen);
  }
  return (
    <header id="HEADER">
      <a href="HOME" className="logo">
        <img
          className={"logo-icon " + (props.flipLogo ? "logo-spin" : "")}
          src="/assets/clip-art-images/ijeri-logo-icon-gw.png"
          alt="logo"
        ></img>
        <img
          className={
            "logo-text whiter " +
            (props.flipLogo ? "logo-text-disappear" : "logo-text-appear")
          }
          src="/assets/clip-art-images/ijeri-logo-text.png"
          alt="logo"
        ></img>
      </a>
      {!menuOpen ? (
        <button
          onClick={menuClicked}
          onMouseOver={menuClicked}
          className="hamburger-menu"
          type="button"
        >
          <MenuSvg color={variables.secondaryColor}> </MenuSvg>
        </button>
      ) : (
        <nav onMouseLeave={menuClicked} className="menu">
          <a href="#HOME" className="menu-link">
            Home
          </a>
          <a href="#ABOUT" className="menu-link">
            About Me
          </a>
          <a href="#EXP" className="menu-link">
            Experience
          </a>
          <a href="#SKILLS" className="menu-link">
            Skills
          </a>
          <a href="#PORT" className="menu-link">
            Portfolio
          </a>
          <a href="#TEST" className="menu-link">
            Testimonials
          </a>
          <a href="#SKIL" className="menu-link">
            Contact
          </a>
          <div className="socials">
            <a
              className="white-filter social-link"
              href="https://www.linkedin.com/in/ijeri-omitogun/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/link-images/linkedin.svg" alt="linkedin" />
            </a>
            <a
              className="white-filter social-link"
              href="https://github.com/ijeriomit"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/link-images/github.svg" alt="github" />
            </a>
            <a
              className="white-filter social-link"
              href="https://medium.com/@jeri-omit"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/link-images/medium.svg" alt="medium" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuSvg(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 17L14 17"
        stroke={props.color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 12L18 12"
        stroke={props.color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 7L22 7"
        stroke={props.color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
