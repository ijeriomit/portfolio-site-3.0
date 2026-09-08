import { forwardRef } from "react";
import "./services-section.scss";
import Button from "../shared/button/button.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const SERVICES = [
  { id: "development", icon: "code", title: "WEBSITES & FULL-STACK APPLICATIONS", description: "Build and launch reliable digital products that support your customers, team, and business goals.", examples: ["Business websites and MVPs", "Portals, internal tools, and APIs", "Deployment and ongoing maintenance"] },
  { id: "design", icon: "design", title: "UI/UX DESIGN & IMPLEMENTATION", description: "Create clear, accessible interfaces and turn approved designs into responsive production experiences.", examples: ["New interface and workflow design", "UX reviews and responsive redesigns", "Accessibility and frontend implementation"] },
  { id: "improvement", icon: "architecture", title: "APPLICATION IMPROVEMENT & ARCHITECTURE", description: "Strengthen existing applications through focused technical improvements and dependable engineering practices.", examples: ["Modernization, performance, and architecture", "Authorization and reliability improvements", "Unit, E2E, Selenium, Playwright, and CI testing"] },
  { id: "consulting", icon: "consulting", title: "TECHNICAL CONSULTING", description: "Clarify complex technical problems and create a practical path from investigation to implementation.", examples: ["Technical and architecture audits", "Debugging, accessibility, and test strategy", "Implementation plans and engineering guidance"] },
];

const EXPECTATIONS = ["End-to-end delivery", "Accessible, responsive interfaces", "Automated testing and quality controls", "Deployment and post-launch support"];

const PROCESS = [
  { number: "01", title: "UNDERSTAND THE PROBLEM", description: "Align on goals, users, constraints, and the right outcome." },
  { number: "02", title: "DESIGN THE SOLUTION", description: "Plan and validate an approach focused on usability and maintainability." },
  { number: "03", title: "BUILD, TEST & LAUNCH", description: "Deliver production-ready work and support it beyond launch." },
];

function ServiceIcon({ type }) {
  const paths = {
    code: <><rect x="4" y="8" width="40" height="30" rx="3"/><path d="m16 19-7 6 7 6M32 19l7 6-7 6M27 16l-6 18"/></>,
    design: <><rect x="5" y="6" width="38" height="32" rx="3"/><path d="M5 16h38M12 23h12v9H12zM29 23h8M29 28h8M29 33h5"/></>,
    architecture: <><rect x="20" y="4" width="8" height="8" rx="1"/><rect x="5" y="34" width="9" height="9" rx="1"/><rect x="20" y="34" width="8" height="9" rx="1"/><rect x="34" y="34" width="9" height="9" rx="1"/><path d="M24 12v10M9.5 34v-8H38.5v8M24 22v12"/></>,
    consulting: <><circle cx="20" cy="17" r="8"/><path d="M5 41c0-10 7-15 15-15s15 5 15 15M34 10h9M34 17h9M34 24h6"/></>,
  };

  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</g></svg>;
}

const ServicesSection = forwardRef((props, ref) => (
  <section id="SERVICES" ref={ref} className="services-section">
    <MatrixBackground />
    <div className="services-section__content">
      <div className="services-section__top">
        <div className="services-section__hero">
          <p className="services-section__eyebrow">WHAT I DO</p>
          <h2 className="services-section__headline">BUILD. IMPROVE.<br />REDESIGN. <span>AUTOMATE.</span></h2>
          <p className="services-section__body">I help businesses design, build, modernize, and launch reliable digital products—from websites and applications to internal tools and test automation.</p>
          <div className="services-section__hero-actions">
            <Button variant="primary" href="#CONTACT">DISCUSS YOUR PROJECT</Button>
            <Button variant="secondary" href="#PORT">VIEW MY WORK</Button>
          </div>
        </div>

        <div className="services-section__expectations">
          <p className="services-section__eyebrow">WHAT YOU CAN EXPECT</p>
          <ul>{EXPECTATIONS.map((expectation) => <li key={expectation}><span aria-hidden="true">✓</span>{expectation}</li>)}</ul>
        </div>
      </div>

      <div className="services-section__services">
        <p className="services-section__eyebrow">HOW I CAN HELP</p>
        <div className="services-section__cards-grid">
          {SERVICES.map((service) => (
            <article key={service.id} className="services-section__card">
              <div className="services-section__card-icon"><ServiceIcon type={service.icon} /></div>
              <h3 className="services-section__card-title">{service.title}</h3>
              <p className="services-section__card-desc">{service.description}</p>
              <p className="services-section__card-label">TYPICAL WORK</p>
              <ul className="services-section__examples">{service.examples.map((example) => <li key={example}>{example}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>

      <div className="services-section__process">
        <p className="services-section__eyebrow">HOW WE'LL WORK</p>
        <ol>
          {PROCESS.map((step) => (
            <li key={step.number}>
              <span className="services-section__process-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
));

export default ServicesSection;
