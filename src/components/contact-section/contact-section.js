import { forwardRef } from "react";
import "./contact-section.scss";
import MatrixBackground from "../matrix-background/matrix-background.js";

const ContactSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="CONTACT" className="contact-section">
      <MatrixBackground />
      <div className="contact-section__content">
        <div className="contact-section__intro">
          <div className="contact-section__hero-visual">
            <p className="contact-section__eyebrow">GET IN TOUCH</p>
            <img
              className="contact-section__memoji"
              src="/assets/clip-art-images/memoji-wave.svg"
              alt="Ijeri waving"
            />
          </div>
          <div className="contact-section__hero-copy">
            <h2 className="contact-section__headline">
              LET&apos;S WORK
              <br />
              <span className="contact-section__headline--accent">TOGETHER</span>
            </h2>
            <p className="contact-section__copy">
              Have a project in mind, a question, or just want to say hi? Feel free to reach out by email or connect via socials.
            </p>
          </div>
        </div>

        <div className="contact-section__connect">
          <div className="contact-section__cards">
            <a className="contact-card" href="mailto:ijeriomitogun@gmail.com" target="_blank" rel="noopener noreferrer">
              <div className="contact-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="m2 6 10 7 10-7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="contact-card__details">
                <h3 className="contact-card__title">Email Me</h3>
                <span className="contact-card__text">ijeriomitogun@gmail.com</span>
              </div>
            </a>
            {[
              { name: "LinkedIn", detail: "ijeri-omitogun", href: "https://www.linkedin.com/in/ijeri-omitogun/", icon: "linkedin" },
              { name: "GitHub", detail: "ijeriomit", href: "https://github.com/ijeriomit", icon: "github" },
              { name: "Medium", detail: "@jeri-omit", href: "https://medium.com/@jeri-omit", icon: "medium" },
              { name: "Upwork", detail: "Hire me on Upwork", href: "https://www.upwork.com/freelancers/~01ab9cbeb573306870?mp_source=share", icon: "upwork" },
            ].map((link) => (
              <a key={link.name} className="contact-card" href={link.href} target="_blank" rel="noreferrer">
                <div className="contact-card__icon" aria-hidden="true">
                  <img src={`/assets/link-images/${link.icon}.svg`} alt="" />
                </div>
                <div className="contact-card__details">
                  <h3 className="contact-card__title">{link.name}</h3>
                  <span className="contact-card__text">{link.detail}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
