import { useEffect, useState } from "react";
import "./technology-stack.scss";

const CATEGORIES = [
  "All Technologies",
  "Frontend",
  "Backend",
  "Testing",
  "Tools",
];

const TECHNOLOGIES = [
  { name: "TypeScript", category: "Frontend", logo: "typescript-logo.svg" },
  { name: "JavaScript", category: "Frontend", logo: "javascript-logo.svg" },
  { name: "React", category: "Frontend", logo: "react-logo.svg" },
  { name: "Angular", category: "Frontend", logo: "angular-logo.svg" },
  { name: "Ember.js", category: "Frontend", logo: "ember-logo.svg" },
  { name: "Vue.js", category: "Frontend", logo: "vue-logo.svg" },
  { name: "SCSS/CSS", category: "Frontend", logo: "scss-logo.svg" },
  { name: "Python", category: "Backend", logo: "python-logo.svg" },
  { name: "Rails", category: "Backend", logo: "ruby-logo.svg" },
  { name: "Node.js", category: "Backend", logo: "nodejs-logo.svg" },
  { name: "REST APIs", category: "Backend", monogram: "API" },
  { name: "C#", category: "Backend", logo: "csharp-logo.svg" },
  { name: "QUnit", category: "Testing", logo: "qunit-logo.svg" },
  { name: "RSpec", category: "Testing", logo: "rspec-logo.svg" },
  { name: "Playwright", category: "Testing", logo: "playwright-logo.svg" },
  { name: "Selenium", category: "Testing", logo: "selenium-logo.svg" },
  { name: "Mocha/Chai", category: "Testing", logo: "mocha-logo.svg" },
  { name: "Docker", category: "Tools", logo: "docker-logo.svg" },
  {
    name: "Git/GitHub",
    category: "Tools",
    logo: "../link-images/github.svg",
    invertLogo: true,
  },
  { name: "Figma", category: "Tools", logo: "figma-logo.svg" },
  { name: "Unity 3D", category: "Tools", logo: "unity-logo.svg" },
  { name: "ROS", category: "Tools", logo: "ros-logo.svg" },
  {
    name: "AI Agents",
    category: "Tools",
    logo: "ai-agents-logo.svg",
    invertLogo: true,
  },
];

export default function TechnologyStack() {
  const [activeFilter, setActiveFilter] = useState("All Technologies");
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 600px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 600px)");
    const updateViewport = () => setIsMobile(media.matches);
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  const selectedCategory =
    isMobile && activeFilter === "All Technologies" ? "Frontend" : activeFilter;
  const categories = isMobile ? CATEGORIES.slice(1) : CATEGORIES;

  const filtered =
    selectedCategory === "All Technologies"
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((t) => t.category === selectedCategory);

  function selectFilter(category) {
    setActiveFilter(category);
  }

  return (
    <div className="technology-stack">
      <h3 className="technology-stack__title">TECH STACK</h3>
      <div className="technology-stack__body">
        <ul className="technology-stack__filters" >
          {categories.map((cat) => (
            <li
              key={cat}
              className={
                cat === "All Technologies"
                  ? "technology-stack__filter-item--all"
                  : ""
              }
            >
              <button
                className={
                  "technology-stack__filter-btn" +
                  (selectedCategory === cat
                    ? " technology-stack__filter-btn--active"
                    : "")
                }
                onClick={() => selectFilter(cat)}
                aria-pressed={selectedCategory === cat}
              >
                <img
                  src="/assets/clip-art-images/check-mark.svg"
                  alt=""
                  aria-hidden="true"
                  className="technology-stack__filter-icon"
                />
                {cat}
              </button>
            </li>
          ))}
        </ul>
        <div className="technology-stack__collection">
          <ul className="technology-stack__grid" aria-label={`${selectedCategory} technologies`}>
            {filtered.map((tech) => (
              <li key={tech.name} className="technology-stack__card">
                {tech.logo ? (
                  <img
                    src={`/assets/clip-art-images/${tech.logo}`}
                    alt=""
                    aria-hidden="true"
                    className={`technology-stack__card-icon technology-stack__card-icon--logo${tech.invertLogo ? " technology-stack__card-icon--inverted" : ""}`}
                  />
                ) : (
                  <span className="technology-stack__card-monogram" aria-hidden="true">
                    {tech.monogram}
                  </span>
                )}
                <span className="technology-stack__card-name">{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
