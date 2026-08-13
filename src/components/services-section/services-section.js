import { forwardRef, useState } from "react";
import "./services-section.scss";
import Button from "../shared/button/button.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "fullstack",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
        <polyline points="14,20 8,26 14,32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="34,20 40,26 34,32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="22" y1="18" x2="26" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "FULL STACK\nDEVELOPMENT",
    description: "End-to-end web applications that are scalable, secure, and built for performance.",
  },
  {
    id: "uiux",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="6" width="40" height="30" rx="3" stroke="currentColor" strokeWidth="2"/>
        <line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="2"/>
        <rect x="10" y="22" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="27" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="27" y1="26" x2="38" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="27" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "UI / UX\nDESIGN",
    description: "Intuitive, accessible, and engaging designs that users love and businesses rely on.",
  },
  {
    id: "ai",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
        <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11.5" y1="11.5" x2="17.5" y2="17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30.5" y1="30.5" x2="36.5" y2="36.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36.5" y1="11.5" x2="30.5" y2="17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="17.5" y1="30.5" x2="11.5" y2="36.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI & AUTOMATION\nSOLUTIONS",
    description: "AI-powered features and automation that streamline workflows and deliver intelligent experiences.",
  },
  {
    id: "consulting",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 38 Q6 28 24 28 Q42 28 42 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
        <line x1="36" y1="10" x2="44" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="22" x2="44" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "TECHNICAL\nCONSULTING",
    description: "Expert guidance to solve complex technical challenges and scale your product with confidence.",
  },
];

const CLIENT_TYPES = [
  {
    id: "startups",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16 4C16 4 26 8 26 18L16 28L6 18C6 8 16 4 16 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
        <circle cx="16" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "STARTUPS",
    description: "Build your MVP and scale with a solid foundation.",
  },
  {
    id: "businesses",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="12" width="26" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M10 12V8C10 5.8 13 4 16 4C19 4 22 5.8 22 8V12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        <line x1="3" y1="20" x2="29" y2="20" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="20" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "BUSINESSES",
    description: "Modernize systems and improve internal tools.",
  },
  {
    id: "agencies",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="10" cy="11" r="4" stroke="currentColor" strokeWidth="1.75"/>
        <circle cx="22" cy="11" r="4" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M3 27C3 21 7 19 10 19C13 19 15 20 16 21C17 20 19 19 22 19C25 19 29 21 29 27" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    title: "AGENCIES",
    description: "White-labeled development and extended teams.",
  },
  {
    id: "founders",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="16" cy="10" r="5.5" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M5 28C5 22 10 19 16 19C22 19 27 22 27 28" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    title: "FOUNDERS",
    description: "A technical partner to turn your vision into reality.",
  },
];

// ── Chevron icon ──────────────────────────────────────────────────────────────
function ChevronIcon({ open }) {
  return (
    <svg
      className={"services-section__chevron" + (open ? " services-section__chevron--open" : "")}
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    >
      <polyline points="4,6 8,10 12,6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const ServicesSection = forwardRef((props, ref) => {
  // Accordion state for mobile service rows
  const [openService, setOpenService] = useState(null);

  const toggleService = (id) => {
    setOpenService((prev) => (prev === id ? null : id));
  };

  return (
    <section id="SERVICES" ref={ref} className="services-section">
      <MatrixBackground />

      <div className="services-section__content">

        {/* ── TOP ROW: 2-col on desktop, stacked on mobile ─────────── */}
        <div className="services-section__top">

          {/* Left — What I Do */}
          <div className="services-section__hero">
            <p className="services-section__eyebrow">WHAT I DO</p>
            <h2 className="services-section__headline">
              SERVICES THAT<br />
              DRIVE <span className="services-section__headline--accent">REAL IMPACT.</span>
            </h2>
            <p className="services-section__body">
              I help startups, businesses, and enterprises turn ideas into
              scalable, high-quality software with exceptional user experiences.
            </p>
            <div className="services-section__hero-btns">
              <Button variant="primary" href="mailto:ijeri.omitogun@gmail.com">START A PROJECT →</Button>
              <Button variant="secondary" href="#PORTFOLIO">VIEW CASE STUDIES</Button>
            </div>
          </div>

          {/* Right — Who I Work With (desktop: vertical list; mobile: icon row) */}
          <div className="services-section__clients-panel">
            <p className="services-section__eyebrow">WHO I WORK WITH</p>

            {/* Desktop: vertical list */}
            <ul className="services-section__clients-list">
              {CLIENT_TYPES.map((c) => (
                <li key={c.id} className="services-section__client-row">
                  <div className="services-section__client-icon">{c.icon}</div>
                  <div className="services-section__client-text">
                    <span className="services-section__client-title">{c.title}</span>
                    <span className="services-section__client-desc">{c.description}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile: compact icon grid */}
            <div className="services-section__clients-icons">
              {CLIENT_TYPES.map((c) => (
                <div key={c.id} className="services-section__client-icon-item">
                  <div className="services-section__client-icon">{c.icon}</div>
                  <span className="services-section__client-title">{c.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW I CAN HELP ───────────────────────────────────────── */}
        <div className="services-section__services">
          <p className="services-section__eyebrow">HOW I CAN HELP</p>

          {/* Desktop: 4-column cards */}
          <div className="services-section__cards-grid">
            {SERVICES.map((svc) => (
              <article key={svc.id} className="services-section__card">
                <div className="services-section__card-icon">{svc.icon}</div>
                <h3 className="services-section__card-title">
                  {svc.title.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </h3>
                <p className="services-section__card-desc">{svc.description}</p>
                <a href="mailto:ijeri.omitogun@gmail.com" className="services-section__learn-more">
                  LEARN MORE →
                </a>
              </article>
            ))}
          </div>

          {/* Mobile: accordion rows */}
          <div className="services-section__accordion">
            {SERVICES.map((svc) => {
              const isOpen = openService === svc.id;
              return (
                <div key={svc.id} className={"services-section__acc-row" + (isOpen ? " services-section__acc-row--open" : "")}>
                  <button
                    className="services-section__acc-header"
                    onClick={() => toggleService(svc.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="services-section__card-icon">{svc.icon}</div>
                    <span className="services-section__acc-title">
                      {svc.title.replace("\n", " ")}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="services-section__acc-body">
                      <p className="services-section__card-desc">{svc.description}</p>
                      <a href="mailto:ijeri.omitogun@gmail.com" className="services-section__learn-more">
                        LEARN MORE →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM CTA ROW ───────────────────────────────────────── */}
        <div className="services-section__cta-row">

          {/* Left CTA — Have a project in mind? */}
          <div className="services-section__cta-card">
            <div className="services-section__cta-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 6H4C2.9 6 2 6.9 2 8V22C2 23.1 2.9 24 4 24H10L16 30L22 24H28C29.1 24 30 23.1 30 22V8C30 6.9 29.1 6 28 6Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
                <line x1="9" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="9" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="services-section__cta-text">
              <h3 className="services-section__cta-headline">Have a project in mind?</h3>
              <p className="services-section__cta-sub">Let's build something great together.</p>
            </div>
            <Button variant="primary" href="mailto:ijeri.omitogun@gmail.com">LET'S TALK →</Button>
          </div>

          {/* Right CTA — View My Work */}
          <div className="services-section__cta-card services-section__cta-card--work">
            <div className="services-section__cta-text">
              <p className="services-section__eyebrow" style={{ marginBottom: "0.5rem" }}>VIEW MY WORK</p>
              <h3 className="services-section__cta-headline">See how I've helped others solve real problems.</h3>
            </div>
            <Button variant="secondary" href="#PORTFOLIO">VIEW CASE STUDIES →</Button>
          </div>

        </div>
      </div>
    </section>
  );
});

export default ServicesSection;
