import { forwardRef } from "react";
import "./about-section.scss";
import ProfileImage from "./profile-image/profile-image.js";
import StatisticsRow from "./statistics-row/statistics-row.js";
import TechnologyStack from "./technology-stack/technology-stack.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const BULLETS = [
  "5+ years building production software",
  "Expert in frontend, backend, and DevOps",
  "UX focused and user obsessed",
  "Proven track record in enterprise environments",
];

const AboutSection = forwardRef((props, ref) => {
  return (
    <section id="ABOUT" ref={ref} className="about-section">

      {/* ── Hero row (matrix background scoped here) ── */}
      <div className="about-section__hero-wrapper">
        <MatrixBackground />
        <div className={"about-section__hero " + (props.loadContent ? "about-section__hero--visible" : "")}>
          <ProfileImage />
          <div className="about-section__intro">
            <p className="about-section__eyebrow">ABOUT ME</p>
            <h2 className="about-section__headline">
              I COMBINE CODE<br />
              WITH CREATIVITY<br />
              TO <span className="about-section__headline--accent">DELIVER IMPACT.</span>
            </h2>
            <p className="about-section__body">
              I'm a software engineer with a passion for building intuitive,
              accessible, and high-performing applications.
            </p>
            <ul className="about-section__bullets">
              {BULLETS.map((b) => (
                <li key={b} className="about-section__bullet">
                  <img
                    src="/assets/clip-art-images/check-mark.svg"
                    alt=""
                    aria-hidden="true"
                    className="about-section__bullet-icon"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Stats — shown on desktop, hidden on mobile ── */}
      <div className="about-section__stats-desktop">
        <StatisticsRow />
      </div>

      {/* ── Tech stack ──────────────────────────── */}
      <TechnologyStack />

    </section>
  );
});

export default AboutSection;
