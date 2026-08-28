import { forwardRef } from "react";
import "./about-section.scss";
import ProfileImage from "./profile-image/profile-image.js";
import TechnologyStack from "./technology-stack/technology-stack.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const BULLETS = [
  "Frontend architecture and full-stack product development",
  "Accessible interfaces designed around WCAG standards",
  "Automated testing and production reliability",
  "Enterprise SaaS, business platforms, and robotics",
];

const AboutSection = forwardRef((props, ref) => {
  return (
    <section id="ABOUT" ref={ref} className="about-section">
      {/* ── Hero row (matrix background scoped here) ── */}
      <div className="about-section__hero-wrapper">
        <MatrixBackground />
        <div
          className={
            "about-section__hero " +
            (props.loadContent ? "about-section__hero--visible" : "")
          }
        >
          <ProfileImage />
          <div className="about-section__intro">
            <h3 className="about-section__eyebrow">ABOUT ME</h3>
            <h2 className="about-section__headline">
              I COMBINE CODE
              <br />
              WITH CREATIVITY
              <br />
              TO{" "}
              <span className="about-section__headline--accent">
                DELIVER IMPACT.
              </span>
            </h2>
            <p className="about-section__body">
              I'm a full stack software engineer with 7 years of experience
              building enterprise SaaS, internal business platforms, and
              robotics software.
            </p>
            <ul className="about-section__bullets">
              {BULLETS.map((b) => (
                <li key={b} className="about-section__bullet">
                  <span
                    aria-hidden="true"
                    className="about-section__bullet-icon"
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Tech stack ──────────────────────────── */}
      <TechnologyStack />
    </section>
  );
});

export default AboutSection;
