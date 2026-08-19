import { forwardRef, useMemo, useRef, useState } from "react";
import "./portfolio.scss";
import { store } from "../../data.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const PROJECT_CATEGORIES = ["Enterprise", "Cloud Infrastructure", "Robotics", "AI / ML", "Open Source", "Personal"];
const FILTERS = ["All Projects", ...PROJECT_CATEGORIES];

const PROJECT_META = {
  "Buying Hub": { category: "Enterprise", logo: "/assets/experience-images/google-logo.png", badge: null, sortOrder: 1 },
  "Olympic Arm": { category: "Robotics", logo: null, badge: null, sortOrder: 3 },
  Haloguard: { category: "Robotics", logo: null, badge: null, sortOrder: 5 },
  toolKITT: { category: "Robotics", logo: null, badge: null, sortOrder: 8 },
  LAB: { category: "Personal", logo: null, badge: null, sortOrder: 9 },
  Epoch: { category: "Personal", logo: null, badge: null, sortOrder: 10 },
  "Personal Portfolio": { category: "Open Source", logo: null, badge: null, sortOrder: 7 },
  "LeetCode Practice": { category: "Open Source", logo: null, badge: null, sortOrder: 11 },
  "ROS Video Recorder": { category: "Open Source", logo: null, badge: null, sortOrder: 6 },
  "Python Experiments": { category: "Personal", logo: null, badge: null, sortOrder: 12 },
  "Data Annotation Platform": { category: "AI / ML", logo: null, badge: null, sortOrder: 4 },
  "Terraform Cloud (Intern)": { category: "Cloud Infrastructure", logo: "/assets/link-images/bit.png", badge: null, sortOrder: 2 },
};

function trimDescription(description) {
  return description.replace(/<br\s*\/?>/g, " ").replace(/\s+/g, " ").trim();
}

function buildProjects() {
  const baseProjects = store.projects.map((project) => {
    const meta = PROJECT_META[project.title] || {};
    return {
      ...project,
      category: meta.category || "Personal",
      companyLabel: project.companyName || "Independent",
      summary: trimDescription(project.description),
      techTags: project.techStack || project.skills || [],
      logo: meta.logo,
      badge: meta.badge,
      sortOrder: meta.sortOrder || 99,
      image: `/assets/project-images/${project.coverImg}`,
    };
  });

  return [
    ...baseProjects,
    {
      title: "Terraform Cloud (Intern)",
      companyLabel: "HashiCorp",
      description:
        "Contributed to Terraform Cloud's automation and infrastructure management experience used by thousands of teams.",
      summary:
        "Contributed to Terraform Cloud's automation and infrastructure management experience used by thousands of teams.",
      techTags: ["Go", "React", "TypeScript", "PostgreSQL"],
      category: "Cloud Infrastructure",
      logo: "/assets/link-images/bit.png",
      badge: null,
      sortOrder: 2,
      image: "/assets/project-images/buying_hub_nav.png",
      url: "https://www.hashicorp.com/products/terraform",
    },
    {
      title: "Data Annotation Platform",
      companyLabel: "DataAnnotation",
      description:
        "Built internal tools and ML workflows to improve annotation quality and accelerate model training.",
      summary:
        "Built internal tools and ML workflows to improve annotation quality and accelerate model training.",
      techTags: ["Python", "FastAPI", "PostgreSQL", "MLflow"],
      category: "AI / ML",
      logo: null,
      badge: null,
      sortOrder: 4,
      image: "/assets/project-images/image-manip.png",
      url: "https://www.dataannotation.tech/",
    },
  ]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter((project, index, list) => list.findIndex((item) => item.title === project.title) === index);
}

function ProjectCard({ project, projectRef, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={"portfolio-section__card" + (isSelected ? " portfolio-section__card--selected" : "")}
      ref={projectRef}
      onClick={() => onSelect(project)}
    >
      <div className="portfolio-section__card-media">
        <img src={project.image} alt={project.title} className="portfolio-section__card-image" />
        {project.logo && <img src={project.logo} alt={`${project.companyLabel} logo`} className="portfolio-section__card-logo" />}
      </div>
      <div className="portfolio-section__card-content">
        <h3 className="portfolio-section__card-title">{project.title}</h3>
        <p className="portfolio-section__card-desc">{project.summary}</p>
      </div>
    </button>
  );
}

const Portfolio = forwardRef((props, ref) => {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const railRef = useRef(null);
  const projectRefs = useRef({});
  const projects = useMemo(() => buildProjects(), []);
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProject = selectedProject || projects[0];

  function handleFilterClick(filter) {
    setActiveFilter(filter);
    const target = projectRefs.current[filter];
    const project = filter === "All Projects"
      ? projects[0]
      : projects.find((item) => item.category === filter);
    if (project) {
      setSelectedProject(project);
    }
    requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail || !target) return;
      rail.scrollTo({
        left: target.offsetLeft,
        behavior: "smooth",
      });
    });
  }

  return (
    <section ref={ref} id="PORT" className="portfolio-section">
      <MatrixBackground />
      <div className="portfolio-section__content">
        <div className="portfolio-section__hero-grid">
          <div className="portfolio-section__intro">
            <p className="portfolio-section__eyebrow">ENGINEERING PORTFOLIO</p>
            <h2 className="portfolio-section__headline">
              I BUILD PRODUCTS
              <br />
              THAT SOLVE <span className="portfolio-section__headline--accent">REAL PROBLEMS.</span>
            </h2>
            <p className="portfolio-section__copy">
              A collection of industrial, enterprise, and personal projects where I designed, built, and shipped impactful solutions.
            </p>
            <div className="portfolio-section__stats">
              <div className="portfolio-section__stat"><span className="portfolio-section__stat-value">15+</span><span className="portfolio-section__stat-label">Projects Built</span></div>
              <div className="portfolio-section__stat"><span className="portfolio-section__stat-value">4+</span><span className="portfolio-section__stat-label">Industries Served</span></div>
              <div className="portfolio-section__stat"><span className="portfolio-section__stat-value">5+</span><span className="portfolio-section__stat-label">Years Building</span></div>
              <div className="portfolio-section__stat"><span className="portfolio-section__stat-value">Global</span><span className="portfolio-section__stat-label">Impact</span></div>
            </div>
          </div>

          <div className="portfolio-section__featured">
            <article className="portfolio-section__featured-card">
              <div className="portfolio-section__featured-copy">
                <p className="portfolio-section__eyebrow">SELECTED PROJECT</p>
                <h3 className="portfolio-section__featured-title">{featuredProject.title}</h3>
                <p className="portfolio-section__featured-company">{featuredProject.companyLabel}</p>
                <p className="portfolio-section__featured-desc">{featuredProject.summary}</p>
              </div>
              <div className="portfolio-section__featured-media">
                <img src={featuredProject.image} alt={featuredProject.title} className="portfolio-section__featured-image" />
                {featuredProject.logo && <img src={featuredProject.logo} alt={`${featuredProject.companyLabel} logo`} className="portfolio-section__featured-logo" />}
              </div>
            </article>
          </div>
        </div>

        <div className="portfolio-section__controls">
          <div className="portfolio-section__filters" aria-label="Project categories">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={"portfolio-section__filter" + (activeFilter === filter ? " portfolio-section__filter--active" : "")}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="portfolio-section__sort">Sort by: <span>Latest</span></div>
        </div>

        <div className="portfolio-section__rail" ref={railRef}>
          {PROJECT_CATEGORIES.map((filter) => {
            const categoryProjects = projects.filter((project) => project.category === filter);
            if (categoryProjects.length === 0) {
              return null;
            }
            return categoryProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                isSelected={featuredProject.title === project.title}
                onSelect={setSelectedProject}
                projectRef={index === 0 ? (node) => {
                  projectRefs.current[filter] = node;
                  if (filter === PROJECT_CATEGORIES[0]) {
                    projectRefs.current["All Projects"] = node;
                  }
                } : undefined}
              />
            ));
          })}
        </div>
      </div>
    </section>
  );
});

export default Portfolio;
