import { useState } from "react";
import "./header.scss";

export default function Header(props) {
  const [menuOpen, toggleMenu] = useState(false);

  function menuClicked() {
    toggleMenu(!menuOpen);
  }
  return (
    <header id="HEADER">
      <a href="HOME" className="logo">
        {props.logoColor === "#000000" ? (
          <img
            className="logo-icon logo-spin"
            src="/assets/clip-art-images/ijeri-logo-icon-black.png"
            alt="logo"
          ></img>
        ) : (
          <img
            className="logo-icon logo-spin"
            src="/assets/clip-art-images/ijeri-logo-icon-green.png"
            alt="logo"
          ></img>
        )}
        <img
          className={
            "logo-text " +
            (props.logoCollapsed ? "logo-text-disappear" : "logo-text-appear")
          }
          style={{ color: props.logoColor }}
          src="/assets/clip-art-images/ijeri-logo-text.png"
          alt="logo"
        ></img>
      </a>
      <button onClick={menuClicked} className="hamburger-menu" type="button">
        {menuOpen ? (
          <img
            className="close-menu"
            src="/assets/clip-art-images/close.svg"
            alt="close"
          />
        ) : (
          <MenuSvg color={props.logoColor}> </MenuSvg>
        )}
      </button>
      {menuOpen ? <MenuNav></MenuNav> : null}
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
function MenuNav() {
  return (
    <nav className="menu">
      <a href="HOME" className="menu-link">
        Home
      </a>
      <a href="HOME" className="menu-link">
        About Me
      </a>
      <a href="HOME" className="menu-link">
        Projects
      </a>
      <a href="HOME" className="menu-link">
        Contact Me
      </a>
      <a
        href="https://docs.google.com/document/d/15fubGzf-Rreqq8O0Tqf6H907TP3SQPpqGes_3DVmTGc/edit?usp=drive_link"
        className="menu-link"
        target="_blank"
      >
        Resume
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
  );
}
