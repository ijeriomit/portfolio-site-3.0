import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import "./portfolio.scss";
import { store } from "../../data.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const PROJECT_CATEGORIES = ["Enterprise", "Cloud", "Robotics", "Games", "Personal"];
const FILTERS = ["All Projects", ...PROJECT_CATEGORIES];
const GALLERY_INTERVAL = 6000;

function buildProjects() {
  return store.projects
    .map((project) => ({
      ...project,
      companyLabel: project.companyName || "Independent",
      media: (project.media?.length ? project.media : [project.coverImg]).map(
        (image) => `${process.env.PUBLIC_URL}/assets/project-images/${image}`
      ),
      image: `${process.env.PUBLIC_URL}/assets/project-images/${project.coverImg}`,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function ProjectCard({ project, projectRef, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={
        "portfolio-section__card" +
        (isSelected ? " portfolio-section__card--selected" : "")
      }
      ref={projectRef}
      aria-pressed={isSelected}
      onClick={() => onSelect(project)}
    >
      <div className="portfolio-section__card-media">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="portfolio-section__card-image"
        />
        {project.logo && (
          <img
            src={project.logo}
            alt=""
            className="portfolio-section__card-logo"
          />
        )}
        <div className="portfolio-section__card-overlay" aria-hidden="true">
          <p>{project.description}</p>
        </div>
      </div>
      <h3 className="portfolio-section__card-title">{project.title}</h3>
    </button>
  );
}

const Portfolio = forwardRef((props, ref) => {
  const projects = useMemo(() => buildProjects(), []);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const railRef = useRef(null);
  const projectRefs = useRef({});

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All Projects"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects]
  );

  const galleryImages = selectedProject.media;
  const selectedIndex = filteredProjects.findIndex(
    (project) => project.title === selectedProject.title
  );

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProject.title]);

  useEffect(() => {
    if (
      galleryImages.length < 2 ||
      isGalleryPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % galleryImages.length);
    }, GALLERY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [galleryImages.length, isGalleryPaused, selectedProject.title]);

  useEffect(() => {
    const selectLinkedProject = (event) => {
      const project = projects.find(
        (item) => item.title === event.detail?.projectTitle
      );
      if (!project) return;

      setActiveFilter("All Projects");
      setSelectedProject(project);
      requestAnimationFrame(() => scrollProjectIntoView(project.title));
    };

    window.addEventListener("portfolio:select-project", selectLinkedProject);
    return () =>
      window.removeEventListener("portfolio:select-project", selectLinkedProject);
  }, [projects]);

  function scrollProjectIntoView(title) {
    projectRefs.current[title]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function selectProject(project) {
    setSelectedProject(project);
    requestAnimationFrame(() => scrollProjectIntoView(project.title));
  }

  function handleFilterClick(filter) {
    const nextProjects =
      filter === "All Projects"
        ? projects
        : projects.filter((project) => project.category === filter);

    setActiveFilter(filter);
    if (nextProjects[0]) {
      setSelectedProject(nextProjects[0]);
      requestAnimationFrame(() => {
        railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      });
    }
  }

  function handleRailStep(direction) {
    const nextIndex = Math.min(
      Math.max(selectedIndex + direction, 0),
      filteredProjects.length - 1
    );
    const nextProject = filteredProjects[nextIndex];
    if (nextProject) selectProject(nextProject);
  }

  function handleGalleryStep(direction) {
    setActiveImageIndex((current) =>
      (current + direction + galleryImages.length) % galleryImages.length
    );
  }

  function handleGalleryBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsGalleryPaused(false);
    }
  }

  return (
    <section ref={ref} id="PORT" className="portfolio-section">
      <MatrixBackground />
      <div className="portfolio-section__content">
        <div className="portfolio-section__hero-grid">
          <header className="portfolio-section__intro">
            <p className="portfolio-section__eyebrow">ENGINEERING PORTFOLIO</p>
            <h2 className="portfolio-section__headline">
              I BUILD PRODUCTS
              <br />
              THAT SOLVE{" "}
              <span className="portfolio-section__headline--accent">
                REAL PROBLEMS.
              </span>
            </h2>
            <p className="portfolio-section__copy">
              Seven years building products across enterprise software, cloud
              infrastructure, robotics, and interactive experiences.
            </p>
            <p className="portfolio-section__proof">
              Products shipped across four industries · Full-stack engineering ·
              UI/UX and testing
            </p>
          </header>

          <article className="portfolio-section__featured">
            <div className="portfolio-section__featured-copy-column">
              <div className="portfolio-section__featured-heading">
                <p className="portfolio-section__eyebrow">SELECTED PROJECT</p>
                <h3 className="portfolio-section__featured-title">
                  {selectedProject.title}
                </h3>
                <p className="portfolio-section__featured-company">
                  {selectedProject.companyLabel}
                </p>
              </div>

              <div className="portfolio-section__detail-block">
                <h4>THE PRODUCT</h4>
                <p>{selectedProject.description}</p>
              </div>

              <div className="portfolio-section__detail-block">
                <h4>WHAT I WORKED ON</h4>
                <p>{selectedProject.workSummary}</p>
              </div>
            </div>

            <div className="portfolio-section__featured-media-column">
              <div
                className="portfolio-section__gallery"
                onMouseEnter={() => setIsGalleryPaused(true)}
                onMouseLeave={() => setIsGalleryPaused(false)}
                onFocus={() => setIsGalleryPaused(true)}
                onBlur={handleGalleryBlur}
              >
                <div className="portfolio-section__gallery-stage">
                  <img
                    src={galleryImages[activeImageIndex]}
                    alt={`${selectedProject.title} project view ${activeImageIndex + 1}`}
                    className="portfolio-section__featured-image"
                  />
                  {selectedProject.logo && (
                    <img
                      src={selectedProject.logo}
                      alt={`${selectedProject.companyLabel} logo`}
                      className="portfolio-section__featured-logo"
                    />
                  )}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="portfolio-section__gallery-arrow portfolio-section__gallery-arrow--previous"
                        aria-label={`Previous ${selectedProject.title} image`}
                        onClick={() => handleGalleryStep(-1)}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="portfolio-section__gallery-arrow portfolio-section__gallery-arrow--next"
                        aria-label={`Next ${selectedProject.title} image`}
                        onClick={() => handleGalleryStep(1)}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {galleryImages.length > 1 && (
                  <div className="portfolio-section__gallery-controls">
                    <div className="portfolio-section__gallery-dots" aria-label="Project images">
                      {galleryImages.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          className={
                            "portfolio-section__gallery-dot" +
                            (activeImageIndex === index
                              ? " portfolio-section__gallery-dot--active"
                              : "")
                          }
                          aria-label={`Show image ${index + 1} of ${galleryImages.length}`}
                          aria-current={activeImageIndex === index ? "true" : undefined}
                          onClick={() => setActiveImageIndex(index)}
                        />
                      ))}
                    </div>
                    <p className="portfolio-section__gallery-count">
                      IMAGE {activeImageIndex + 1} OF {galleryImages.length}
                    </p>
                  </div>
                )}
              </div>

              <div className="portfolio-section__detail-block portfolio-section__detail-block--technologies">
                <h4>TECHNOLOGIES</h4>
                <ul className="portfolio-section__tech-list" aria-label="Technologies used">
                  {selectedProject.techStack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>

        <div className="portfolio-section__controls">
          <div className="portfolio-section__filters" aria-label="Project categories">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={
                  "portfolio-section__filter" +
                  (activeFilter === filter
                    ? " portfolio-section__filter--active"
                    : "")
                }
                aria-pressed={activeFilter === filter}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="portfolio-section__project-count" aria-live="polite">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(filteredProjects.length).padStart(2, "0")}
          </p>
        </div>

        <div className="portfolio-section__rail-shell">
          <button
            type="button"
            className="portfolio-section__rail-arrow"
            aria-label="Show previous project"
            disabled={selectedIndex <= 0}
            onClick={() => handleRailStep(-1)}
          >
            ‹
          </button>
          <div className="portfolio-section__rail" ref={railRef}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                isSelected={selectedProject.title === project.title}
                onSelect={selectProject}
                projectRef={(node) => {
                  projectRefs.current[project.title] = node;
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="portfolio-section__rail-arrow"
            aria-label="Show next project"
            disabled={selectedIndex >= filteredProjects.length - 1}
            onClick={() => handleRailStep(1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
});

export default Portfolio;
