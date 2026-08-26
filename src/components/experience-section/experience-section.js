import { forwardRef, useState, useEffect, useRef } from "react";
import "./experience-section.scss";
import Button from "../shared/button/button.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

// ── Rich experience data ──────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    index: 1,
    companyName: "University of Houston",
    logo: "/assets/experience-images/uh-logo.png",
    jobTitle: "Bachelor of Science, Computer Science",
    startDate: "2015",
    endDate: "2019",
    location: "Houston, TX",
    description:
      "Studied computer science with a focus on software engineering, algorithms, and systems design. Built foundational skills that launched a career in full-stack and frontend engineering.",
    impact: [
      { icon: "🎓", value: "B.S.", label: "Computer Science" },
      { icon: "⚡", value: "4 yrs", label: "of deep study" },
      { icon: "🏆", value: "Dean's", label: "List honoree" },
    ],
    responsibilities: [
      "Completed coursework in data structures, algorithms, and systems design",
      "Built web and software projects in JavaScript, Python, and C#",
      "Collaborated in team-based senior capstone projects",
      "Developed a 3D chemistry lab simulator in Unity as a capstone project",
    ],
    technologies: ["JavaScript", "Python", "C#", "Unity 3D", "HTML/CSS"],
    featuredProject: null,
    certifications: [],
  },
  {
    index: 2,
    companyName: "Nauticus Robotics",
    logo: "/assets/experience-images/nauticus-logo.jpeg",
    jobTitle: "Software Engineer",
    startDate: "2019",
    endDate: "2021",
    location: "Webster, TX",
    description:
      "Developed front-end interfaces for subsea robotic systems. Contributed to the Olympic Arm, Aquanaut, and HaloGuard safety platform, delivering real-time control UIs for offshore deployment.",
    impact: [
      { icon: "🤖", value: "3+", label: "products shipped" },
      { icon: "🌊", value: "Offshore", label: "deployments" },
      { icon: "🛡️", value: "Safety", label: "system launched" },
    ],
    responsibilities: [
      "Built front-end components with JavaScript and Vue.js for robotic control interfaces",
      "Contributed to UX design and automation for the Olympic Arm and Aquanaut",
      "Implemented an Automated User Testing Suite with Selenium in CI/CD pipelines",
      "Assisted in offshore software deployments and conducted customer demos",
    ],
    technologies: ["Vue.js", "JavaScript", "Python", "ROS", "Docker", "Selenium"],
    featuredProject: {
      title: "HaloGuard",
      image: "/assets/project-images/haloguard.png",
      description:
        "A personnel monitoring safety system integrating multiple cameras to detect people in industrial zones like oil rigs and factories.",
      highlights: [
        "Developed real-time video recording feature",
        "Built safety alert UI for offshore operators",
        "Integrated with ROS sensor pipeline",
      ],
      url: "https://nauticusrobotics.com/",
    },
    certifications: [],
  },
  {
    index: 3,
    companyName: "Google LLC",
    logo: "/assets/experience-images/google-logo.png",
    jobTitle: "Software Engineer",
    startDate: "Nov 2021",
    endDate: "Mar 2024",
    location: "Mountain View, CA",
    description:
      "I worked on Buying Hub, a procurement platform used across Google to simplify purchasing and drive efficiency at scale.",
    impact: [
      { icon: "💰", value: "$5B+", label: "in annual savings enabled" },
      { icon: "👥", value: "Millions", label: "of users supported globally" },
      { icon: "🚀", value: "End-to-End", label: "ownership from design to delivery" },
    ],
    responsibilities: [
      "Developed accessible, high-performance web applications using Angular, TypeScript, and Java",
      "Collaborated with cross-functional teams to deliver user-centered solutions",
      "Implemented features that improved procurement efficiency and transparency",
      "Mentored engineers and contributed to technical design reviews",
    ],
    technologies: ["Angular", "TypeScript", "Java", "Web Accessibility", "HTML", "SCSS", "gRPC"],
    featuredProject: {
      title: "Buying Hub",
      image: "/assets/project-images/supplier-nexus-art.png",
      description:
        "A centralized platform that streamlines how Google teams discover, request, and purchase goods and services.",
      highlights: [
        "Improved request-to-purchase cycle time by 35%",
        "Increased adoption through intuitive UX",
        "Ensured WCAG 2.1 AA compliance",
      ],
      url: "https://about.google/",
    },
    certifications: [
      { name: "Google Accessibility Certificate", icon: "🏅" },
      { name: "TypeScript Certification", icon: "📘" },
      { name: "Peer Bonus Recipient", icon: "⭐" },
      { name: "Spot Award Winner", icon: "🏆" },
    ],
  },
  {
    index: 4,
    companyName: "HashiCorp",
    logo: "/assets/clip-art-images/check-mark.svg",
    jobTitle: "Software Engineer (Band 7)",
    startDate: "Feb 2024",
    endDate: "Present",
    location: "Austin, TX",
    description:
      "Building the next generation of cloud infrastructure automation with Terraform Cloud.",
    impact: [
      { icon: "☁️", value: "Enterprise", label: "scale platform" },
      { icon: "📈", value: "Improved", label: "developer productivity" },
      { icon: "🔒", value: "Secure", label: "infrastructure at scale" },
    ],
    responsibilities: [
      "Designing and implementing UI features for Terraform Cloud",
      "Contributing to design systems and component libraries",
      "Collaborating with product and backend teams on infrastructure tooling",
      "Building accessible, performant React applications at enterprise scale",
    ],
    technologies: ["React", "TypeScript", "Go", "Terraform", "SCSS", "GraphQL"],
    featuredProject: null,
    certifications: [],
  },
  {
    index: 5,
    companyName: "Data Annotation",
    logo: "/assets/experience-images/data-annotations-logo.jpg",
    jobTitle: "AI Trainer (Contract)",
    startDate: "Apr 2024",
    endDate: "Present",
    location: "Remote",
    description:
      "Training AI models to improve coding capabilities and ensure high-quality code generation across multiple languages and frameworks.",
    impact: [
      { icon: "🤖", value: "AI", label: "model improvement" },
      { icon: "✅", value: "Quality", label: "code validation" },
      { icon: "📝", value: "100s", label: "of evaluations completed" },
    ],
    responsibilities: [
      "Trained AI chatbots to enhance coding capabilities",
      "Evaluated coding problems to measure AI progress and performance",
      "Authored clear code snippets and technical explanations",
      "Validated AI-generated code against correctness and performance standards",
    ],
    technologies: ["JavaScript", "Python", "TypeScript", "SQL"],
    featuredProject: null,
    certifications: [],
  },
];

const ITEM_H = 96; // px — keep in sync with .exp-section__timeline-item height in SCSS

// ── Component ─────────────────────────────────────────────────────────────────
const ExpSection = forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);  // desktop timeline
  const cardRefs  = useRef([]);
  const cardsPane = useRef(null);

  // ── Desktop: scroll listener on the cards pane ────────────────────────────
  useEffect(() => {
    const pane = cardsPane.current;
    if (!pane) return;
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
    findActive();
    pane.addEventListener("scroll", findActive, { passive: true });
    return () => pane.removeEventListener("scroll", findActive);
  }, []);

  // Desktop timeline translateY
  const timelineOffset = -(activeIndex * ITEM_H) + ITEM_H;

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
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.companyName} className="exp-section__mobile-card">
              <span className="exp-section__card-counter">{String(i + 1).padStart(2, "0")} / {String(EXPERIENCES.length).padStart(2, "0")}</span>
              <div className="exp-section__card-title-row">
                <h3 className="exp-section__card-company">{exp.companyName}</h3>
                <img src={exp.logo} alt={exp.companyName + " logo"} className="exp-section__card-logo" />
              </div>
              <p className="exp-section__card-role">{exp.jobTitle}</p>
              <div className="exp-section__card-meta">
                <span>📅 {exp.startDate} – {exp.endDate}</span>
                <span>📍 {exp.location}</span>
              </div>
              <p className="exp-section__card-desc">{exp.description}</p>
              <div className="exp-section__impact">
                <h4 className="exp-section__sub-label">KEY IMPACT</h4>
                <div className="exp-section__impact-grid">
                  {exp.impact.map((item) => (
                    <div key={item.label} className="exp-section__impact-card">
                      <span className="exp-section__impact-icon">{item.icon}</span>
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
              style={{ transform: `translateY(${timelineOffset}px)` }}
            >
              {EXPERIENCES.map((exp, i) => (
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
                      <span className="exp-section__timeline-num">0{exp.index}</span>
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
        {EXPERIENCES.map((exp, i) => (
          <article
            key={exp.companyName}
            className={"exp-section__card" + (activeIndex === i ? " exp-section__card--active" : "")}
            ref={(el) => (cardRefs.current[i] = el)}
            data-exp-index={i}
          >
            {/* Card header */}
            <div className="exp-section__card-header">
              <span className="exp-section__card-counter">{String(i + 1).padStart(2, "0")} / {String(EXPERIENCES.length).padStart(2, "0")}</span>
              <div className="exp-section__card-title-row">
                <h3 className="exp-section__card-company">{exp.companyName}</h3>
                <img src={exp.logo} alt={exp.companyName + " logo"} className="exp-section__card-logo" />
              </div>
              <p className="exp-section__card-role">{exp.jobTitle}</p>
              <div className="exp-section__card-meta">
                <span>📅 {exp.startDate} – {exp.endDate}</span>
                <span>📍 {exp.location}</span>
              </div>
              <p className="exp-section__card-desc">{exp.description}</p>
            </div>

            {/* Key impact */}
            <div className="exp-section__impact">
              <h4 className="exp-section__sub-label">KEY IMPACT</h4>
              <div className="exp-section__impact-grid">
                {exp.impact.map((item) => (
                  <div key={item.label} className="exp-section__impact-card">
                    <span className="exp-section__impact-icon">{item.icon}</span>
                    <span className="exp-section__impact-value">{item.value}</span>
                    <span className="exp-section__impact-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities + Technologies */}
            <div className="exp-section__details">
              <div className="exp-section__responsibilities">
                <h4 className="exp-section__sub-label">RESPONSIBILITIES</h4>
                <ul className="exp-section__resp-list">
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="exp-section__resp-item">
                      <img src="/assets/clip-art-images/check-mark.svg" alt="" aria-hidden="true" className="exp-section__check" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="exp-section__technologies">
                <h4 className="exp-section__sub-label">TECHNOLOGIES</h4>
                <div className="exp-section__tech-pills">
                  {exp.technologies.map((t) => (
                    <span key={t} className="exp-section__tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured project */}
            {exp.featuredProject && (
              <div className="exp-section__project">
                <h4 className="exp-section__sub-label">FEATURED PROJECT</h4>
                <div className="exp-section__project-card">
                  <img
                    src={exp.featuredProject.image}
                    alt={exp.featuredProject.title}
                    className="exp-section__project-img"
                  />
                  <div className="exp-section__project-body">
                    <h5 className="exp-section__project-title">{exp.featuredProject.title}</h5>
                    <p className="exp-section__project-desc">{exp.featuredProject.description}</p>
                    <ul className="exp-section__project-highlights">
                      {exp.featuredProject.highlights.map((h) => (
                        <li key={h}>
                          <img src="/assets/clip-art-images/check-mark.svg" alt="" aria-hidden="true" className="exp-section__check" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Button variant="secondary" href={exp.featuredProject.url}>VIEW CASE STUDY →</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Certifications */}
            {exp.certifications.length > 0 && (
              <div className="exp-section__certs">
                <h4 className="exp-section__sub-label">CERTIFICATIONS & RECOGNITIONS</h4>
                <div className="exp-section__cert-grid">
                  {exp.certifications.map((c) => (
                    <div key={c.name} className="exp-section__cert-card">
                      <span className="exp-section__cert-icon">{c.icon}</span>
                      <span className="exp-section__cert-name">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
      </div>{/* end .exp-section__desktop */}
    </section>
  );
});

export default ExpSection;
