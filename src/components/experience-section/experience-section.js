import { forwardRef, useState, useEffect, useRef } from "react";
import "./experience-section.scss";
import MatrixBackground from "../matrix-background/matrix-background.js";

// ── Rich experience data ──────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    index: 1,
    companyName: "University of Houston",
    logo: `${process.env.PUBLIC_URL}/assets/experience-images/uh-logo.png`,
    jobTitle: "Bachelor of Science, Computer Science",
    startDate: "Aug 2015",
    endDate: "May 2019",
    location: "Houston, TX",
    description:
      "Earned a Bachelor of Science in Computer Science with minors in Mathematics and Management Information Systems.",
    image: {
      src: `${process.env.PUBLIC_URL}/assets/experience-images/uh-me.png`,
      alt: "Ijere Omitogun posing with the University of Houston cougar statue",
    },
    impactLabel: "ACADEMIC DETAILS",
    detailsLabel: "ACADEMIC STORY",
    technologiesLabel: "PROJECT TOOLS",
    impact: [
      { icon: "graduation-cap.svg", value: "B.S.", label: "Computer Science" },
      { icon: "code.svg", value: "CodeRED", label: "hackathon organizer" },
      { icon: "award.svg", value: "Dean's List", label: "academic recognition" },
    ],
    story: [
      "My computer science education established the technical foundation for my engineering career. Alongside the core degree, I studied Mathematics and Management Information Systems, earned a 3.22 GPA, and received Dean's List recognition.",
      "Outside the classroom, I volunteered with the CodeRED hackathon during my junior year and returned as an organizer during my senior year. I also built projects such as LAB, a 3D virtual chemistry laboratory, and Epoch, a 2D side-scrolling RPG using Unity and C#.",
    ],
    technologies: ["Unity", "C#", "JavaScript", "Python"],
    featuredProject: null,
  },
  {
    index: 2,
    companyName: "Nauticus Robotics",
    logo: `${process.env.PUBLIC_URL}/assets/experience-images/nauticus-logo.jpeg`,
    jobTitle: "Software Engineer",
    startDate: "Feb 2019",
    endDate: "Jun 2021",
    location: "Webster, TX",
    description:
      "Built software for subsea robotics and industrial safety systems across robotics, frontend development, automated testing, and hardware integration.",
    impact: [
      { icon: "presentation.svg", value: "Customer", label: "demos and field delivery" },
      { icon: "bot.svg", value: "Subsea", label: "robotic development" },
      { icon: "waves.svg", value: "Underwater", label: "testing and validation" },
    ],
    story: [
      "I joined Nauticus as a Software and QA Intern and grew into a full-time Software Engineer working across robotics, frontend development, testing, and hardware integration. I owned tool-pickup behavior for the 7-DOF Olympic Arm, using ROS and Python to translate perception data into physical robotic movement.",
      "The role expanded my ownership beyond robotics into product interfaces, automated testing, and field delivery. I led customer demonstrations, became scuba certified to support Aquanaut testing, and dove in NASA's Neutral Buoyancy Laboratory while helping validate the system underwater.",
    ],
    technologies: ["Vue.js", "JavaScript", "Python", "ROS", "Docker", "Selenium"],
    featuredProject: {
      title: "HaloGuard",
      description:
        "An industrial safety platform that tracked personnel around heavy machinery using Time-of-Flight cameras.",
      highlights: [
        "Captured and processed camera image data into video",
        "Synchronized feeds from eight cameras",
        "Built the playback interface for reviewing safety events",
      ],
    },
  },
  {
    index: 3,
    companyName: "Google LLC",
    logo: `${process.env.PUBLIC_URL}/assets/experience-images/google-logo.png`,
    jobTitle: "Software Engineer",
    startDate: "Nov 2021",
    endDate: "Mar 2024",
    location: "Austin, TX",
    description:
      "Built Angular and TypeScript features for Buying Hub, Google's company-wide procurement platform.",
    impact: [
      { icon: "rocket.svg", value: "Buying Hub", label: "enterprise procurement" },
      { icon: "search-check.svg", value: "Supplier Nexus", label: "centralized discovery" },
      { icon: "badge-check.svg", value: "Accessible", label: "frontend delivery" },
    ],
    story: [
      "At Google, I developed Angular and TypeScript features for Buying Hub, a company-wide platform that unified purchasing, contracts, supplier management, compliance, and risk workflows. The broader platform was credited internally with approximately $5 billion in first-year savings through consolidation and process improvements.",
      "I contributed frontend features to Supplier Nexus, a centralized discovery experience that gave employees access to supplier information previously spread across separate systems and workflows. I also solved complex state and API integration problems, built reusable WCAG-accessible components, and mentored engineering contractors across multiple time zones.",
    ],
    technologies: ["Angular", "TypeScript", "NgRx", "Reactive Forms", "REST APIs", "WCAG"],
    featuredProject: {
      title: "Buying Hub",
      description:
        "A unified internal platform for purchasing, contracts, suppliers, compliance, and risk-management workflows.",
      highlights: [
        "Contributed to supplier discovery and search experiences",
        "Developed complex procurement and compliance forms",
        "Integrated REST APIs with reliable frontend state",
      ],
    },
  },
  {
    index: 4,
    companyName: "HashiCorp at IBM",
    logos: [
      {
        src: `${process.env.PUBLIC_URL}/assets/clip-art-images/hashicorp-logo.svg`,
        alt: "HashiCorp logo",
      },
      { src: `${process.env.PUBLIC_URL}/assets/clip-art-images/ibm-logo.svg`, alt: "IBM logo" },
    ],
    jobTitle: "Software Engineer (Band 7)",
    startDate: "Feb 2024",
    endDate: "Present",
    location: "Austin, TX",
    description:
      "Build full-stack features for the HCP Terraform application using Ember.js and Ruby on Rails.",
    impact: [
      { icon: "code.svg", value: "Full-Stack", label: "product delivery" },
      { icon: "shield-check.svg", value: "Authorization", label: "architecture leadership" },
      { icon: "siren.svg", value: "Production", label: "on-call ownership" },
    ],
    story: [
      "At HashiCorp at IBM, I build full-stack HCP Terraform features across Ember interfaces, Rails models, controllers, serializers, REST APIs, and Pundit authorization policies. My work has expanded from frontend delivery into Rails development, authorization architecture, and independent project leadership.",
      "I progressed into independent project leadership by delivering enterprise RBAC and read-only auditing features, building organization recovery safeguards, and leading a cross-team authorization audit. I also own production reliability through automated testing, observability, incident response, and on-call support.",
    ],
    technologies: ["Ember.js", "Ruby on Rails", "RSpec", "QUnit", "Playwright", "Pundit", "Datadog"],
    featuredProject: {
      title: "HCP Terraform",
      description:
        "A customer-facing infrastructure lifecycle management platform for provisioning and managing infrastructure at scale.",
      highlights: [
        "Delivered full-stack features across Ember.js and Rails",
        "Built enterprise authorization and auditing workflows",
        "Improved organization recovery and production reliability",
      ],
    },
  },
  {
    index: 5,
    companyName: "Data Annotation",
    logo: `${process.env.PUBLIC_URL}/assets/experience-images/data-annotations-logo.jpg`,
    jobTitle: "AI Trainer (Contract)",
    startDate: "Apr 2024",
    endDate: "Present",
    location: "Remote",
    description:
      "Evaluate AI-generated code and provide structured feedback used to improve model correctness and software quality.",
    impact: [
      { icon: "brain-circuit.svg", value: "AI", label: "code evaluation" },
      { icon: "badge-check.svg", value: "Quality", label: "correctness review" },
      { icon: "code.svg", value: "Multi-Language", label: "technical assessment" },
    ],
    story: [
      "As an AI Trainer, I evaluate AI-generated code and compare alternative solutions for correctness, reasoning quality, efficiency, and maintainability. The work requires identifying subtle technical problems and explaining why an implementation succeeds or fails.",
      "I provide structured feedback across Python, JavaScript, PHP, C#, and other languages. This experience has strengthened my code-review skills and my understanding of AI-assisted development, model behavior, and generated-software quality.",
    ],
    technologies: ["Python", "JavaScript", "PHP", "C#"],
    featuredProject: null,
  },
];

const EXPERIENCE_ORDER = [
  "University of Houston",
  "Nauticus Robotics",
  "Google LLC",
  "Data Annotation",
  "HashiCorp at IBM",
];

const ORDERED_EXPERIENCES = [...EXPERIENCES].sort(
  (a, b) =>
    EXPERIENCE_ORDER.indexOf(a.companyName) -
    EXPERIENCE_ORDER.indexOf(b.companyName)
);

const CompanyLogos = ({ experience }) => {
  const logos =
    experience.logos || [
      { src: experience.logo, alt: `${experience.companyName} logo` },
    ];

  return (
    <div className="exp-section__card-logos">
      {logos.map((logo) => (
        <img
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          className="exp-section__card-logo"
        />
      ))}
    </div>
  );
};

const ExperienceMedia = ({ image }) => {
  if (!image) return null;

  return (
    <div className="exp-section__card-media">
      <img src={image.src} alt={image.alt} />
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
const ExpSection = forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);  // desktop timeline

  const cardRefs  = useRef([]);
  const cardsPane = useRef(null);

  // ── Desktop: scroll listener on the cards pane ────────────────────────────
  useEffect(() => {
    const pane = cardsPane.current;
    if (!pane) return;
    let handoffInProgress = false;
    let handoffTimer;

    const findActive = () => {
      if (pane.scrollHeight <= pane.clientHeight) return;
      const triggerY = pane.getBoundingClientRect().top + pane.clientHeight * 0.25;
      let closest = 0, closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dist = Math.abs(card.getBoundingClientRect().top - triggerY);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };

    const handoffToServices = (event) => {
      if (event.deltaY <= 0 || handoffInProgress) return;

      const distanceFromBottom =
        pane.scrollHeight - pane.scrollTop - pane.clientHeight;
      if (distanceFromBottom > 4) return;

      const servicesSection = document.getElementById("SERVICES");
      if (!servicesSection) return;

      event.preventDefault();
      handoffInProgress = true;
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      handoffTimer = window.setTimeout(() => {
        handoffInProgress = false;
      }, 600);
    };

    findActive();
    pane.addEventListener("scroll", findActive, { passive: true });
    pane.addEventListener("wheel", handoffToServices, { passive: false });
    return () => {
      pane.removeEventListener("scroll", findActive);
      pane.removeEventListener("wheel", handoffToServices);
      window.clearTimeout(handoffTimer);
    };
  }, []);

  return (
    <section id="EXP" ref={ref} className="exp-section">
      <MatrixBackground />

      {/* ════════════════════════════════════════════════════════════════
          MOBILE LAYOUT — natural vertical scroll (hidden on desktop)
          ════════════════════════════════════════════════════════════ */}
      <div className="exp-section__mobile">
        {/* Hero header */}
        <div className="exp-section__mobile-header">
          <p className="exp-section__eyebrow">MY JOURNEY</p>
          <h2 className="exp-section__headline">
            A JOURNEY OF<br />
            <span className="exp-section__headline--accent">BUILDING IMPACT</span>
          </h2>
          <p className="exp-section__subhead">
            From robotics to enterprise software and AI,
            I've helped teams build products that solve
            complex problems and create real value.
          </p>
        </div>

        {/* Stacked experience cards */}
        <div className="exp-section__mobile-cards">
          {ORDERED_EXPERIENCES.map((exp, i) => (
            <div key={exp.companyName} className="exp-section__mobile-card">
              <span className="exp-section__card-counter">{String(i + 1).padStart(2, "0")} / {String(ORDERED_EXPERIENCES.length).padStart(2, "0")}</span>
              <div className="exp-section__card-title-row">
                <h2 className="exp-section__card-company">{exp.companyName}</h2>
                <CompanyLogos experience={exp} />
              </div>
              <p className="exp-section__card-role">{exp.jobTitle}</p>
              <div className="exp-section__card-meta">
                <span><img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/calendar.svg`} alt="" aria-hidden="true" />{exp.startDate} – {exp.endDate}</span>
                <span><img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/location-pin.svg`} alt="" aria-hidden="true" />{exp.location}</span>
              </div>
              <p className="exp-section__card-desc">{exp.description}</p>
              <div className="exp-section__impact">
                <h3 className="exp-section__sub-label">
                  {exp.impactLabel || "KEY IMPACT"}
                </h3>
                <div className="exp-section__impact-grid">
                  {exp.impact.map((item) => (
                    <div key={item.label} className="exp-section__impact-card">
                      <img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/${item.icon}`} alt="" aria-hidden="true" className="exp-section__impact-icon" />
                      <span className="exp-section__impact-value">{item.value}</span>
                      <span className="exp-section__impact-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="exp-section__tech-pills">
                {exp.technologies.map((t) => (
                  <span key={t} className="exp-section__tech-pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT — sticky left col + scrollable cards pane
          (hidden on mobile via CSS)
          ════════════════════════════════════════════════════════════ */}
      <div className="exp-section__desktop">

      {/* ── Left column: header + sticky timeline ── */}
      <div className="exp-section__left">
        <div className="exp-section__header">
          <p className="exp-section__eyebrow">MY JOURNEY</p>
          <h2 className="exp-section__headline">
            A JOURNEY OF<br />
            <span className="exp-section__headline--accent">BUILDING IMPACT</span>
          </h2>
          <p className="exp-section__subhead">
            From robotics to enterprise software and AI,
            I've helped teams build products that solve
            complex problems and create real value.
          </p>
        </div>

        {/* Sticky timeline — fixed viewport, active item centred */}
        <nav className="exp-section__timeline" aria-label="Experience timeline">
          <div className="exp-section__timeline-track">
            <ul
              className="exp-section__timeline-list"
            >
              {ORDERED_EXPERIENCES.map((exp, i) => (
                <li key={exp.companyName} className="exp-section__timeline-item-wrap">
                  <button
                    className={"exp-section__timeline-item" + (activeIndex === i ? " exp-section__timeline-item--active" : "")}
                    onClick={() => {
                      setActiveIndex(i);
                      cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    aria-current={activeIndex === i ? "true" : undefined}
                  >
                    <div className="exp-section__timeline-dot" />
                    <div className="exp-section__timeline-text">
                      <span className="exp-section__timeline-num">0{i + 1}</span>
                      <span className="exp-section__timeline-name">{exp.companyName}</span>
                      <span className="exp-section__timeline-dates">{exp.startDate} – {exp.endDate}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* ── Right column: scrolling experience cards ── */}
      <div className="exp-section__cards" ref={cardsPane}>
        {ORDERED_EXPERIENCES.map((exp, i) => (
          <article
            key={exp.companyName}
            className={"exp-section__card" + (activeIndex === i ? " exp-section__card--active" : "")}
            ref={(el) => (cardRefs.current[i] = el)}
            data-exp-index={i}
          >
            {/* Card header */}
            <div className="exp-section__card-header">
              <span className="exp-section__card-counter">{String(i + 1).padStart(2, "0")} / {String(ORDERED_EXPERIENCES.length).padStart(2, "0")}</span>
              <div className="exp-section__card-header-copy">
                <div className="exp-section__card-title-row">
                  <h2 className="exp-section__card-company">{exp.companyName}</h2>
                  <CompanyLogos experience={exp} />
                </div>
                <p className="exp-section__card-role">{exp.jobTitle}</p>
                <div className="exp-section__card-meta">
                  <span><img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/calendar.svg`} alt="" aria-hidden="true" />{exp.startDate} – {exp.endDate}</span>
                  <span><img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/location-pin.svg`} alt="" aria-hidden="true" />{exp.location}</span>
                </div>
                <p className="exp-section__card-desc">{exp.description}</p>
              </div>
              <ExperienceMedia image={exp.image} />
            </div>

            {/* Key impact */}
            <div className="exp-section__impact">
              <h3 className="exp-section__sub-label">
                {exp.impactLabel || "KEY IMPACT"}
              </h3>
              <div className="exp-section__impact-grid">
                {exp.impact.map((item) => (
                  <div key={item.label} className="exp-section__impact-card">
                    <img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/${item.icon}`} alt="" aria-hidden="true" className="exp-section__impact-icon" />
                    <span className="exp-section__impact-value">{item.value}</span>
                    <span className="exp-section__impact-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial content: story left, supporting evidence right */}
            <div className="exp-section__content-grid">
              <div className="exp-section__story">
                <h3 className="exp-section__sub-label">
                  {exp.detailsLabel || "THE STORY"}
                </h3>
                <div className="exp-section__story-copy">
                  {exp.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <aside className="exp-section__sidebar">
                <div className="exp-section__technologies">
                  <h3 className="exp-section__sub-label">
                    {exp.technologiesLabel || "TECHNOLOGIES"}
                  </h3>
                  <div className="exp-section__tech-pills">
                    {exp.technologies.map((t) => (
                      <span key={t} className="exp-section__tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
                {exp.featuredProject && (
                  <div className="exp-section__project">
                    <h3 className="exp-section__sub-label">FEATURED PROJECT</h3>
                    <div className="exp-section__project-card">
                      <div className="exp-section__project-body">
                        <h4 className="exp-section__project-title">{exp.featuredProject.title}</h4>
                        <p className="exp-section__project-desc">{exp.featuredProject.description}</p>
                        <ul className="exp-section__project-highlights">
                          {exp.featuredProject.highlights.map((h) => (
                            <li key={h}>
                              <img src={`${process.env.PUBLIC_URL}/assets/clip-art-images/check-mark.svg`} alt="" aria-hidden="true" className="exp-section__check" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </article>
        ))}
      </div>
      </div>{/* end .exp-section__desktop */}
    </section>
  );
});

export default ExpSection;
