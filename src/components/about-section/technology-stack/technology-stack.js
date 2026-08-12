import { useState } from "react";
import "./technology-stack.scss";

const CATEGORIES = [
  "All Technologies",
  "Languages",
  "Frontend",
  "Backend",
  "DevOps & Cloud",
  "Databases",
  "Design & Tools",
];

const TECHNOLOGIES = [
  { name: "TypeScript",  category: "Languages"      },
  { name: "JavaScript",  category: "Languages"      },
  { name: "Python",      category: "Languages"      },
  { name: "Ruby",        category: "Languages"      },
  { name: "React",       category: "Frontend"       },
  { name: "Angular",     category: "Frontend"       },
  { name: "Vue.js",      category: "Frontend"       },
  { name: "SCSS/CSS",    category: "Frontend"       },
  { name: "Node.js",     category: "Backend"        },
  { name: "REST APIs",   category: "Backend"        },
  { name: "ROS",         category: "Backend"        },
  { name: "C#",          category: "Backend"        },
  { name: "Docker",      category: "DevOps & Cloud" },
  { name: "Git/CI CD",   category: "DevOps & Cloud" },
  { name: "SQL",         category: "Databases"      },
  { name: "NoSQL",       category: "Databases"      },
  { name: "Figma",       category: "Design & Tools" },
  { name: "Unity 3D",    category: "Design & Tools" },
];

export default function TechnologyStack() {
  const [activeFilter, setActiveFilter] = useState("All Technologies");

  const filtered = activeFilter === "All Technologies"
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => t.category === activeFilter);

  return (
    <div className="technology-stack">
      <h3 className="technology-stack__title">TECH STACK</h3>
      <div className="technology-stack__body">
        <ul className="technology-stack__filters" role="list">
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className={cat === "All Technologies" ? "technology-stack__filter-item--all" : ""}
            >
              <button
                className={"technology-stack__filter-btn" + (activeFilter === cat ? " technology-stack__filter-btn--active" : "")}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                <img src="/assets/clip-art-images/check-mark.svg" alt="" aria-hidden="true" className="technology-stack__filter-icon" />
                {cat}
              </button>
            </li>
          ))}
        </ul>
        <ul className="technology-stack__grid" role="list">
          {filtered.map((tech) => (
            <li key={tech.name} className="technology-stack__card">
              <img src="/assets/clip-art-images/check-mark.svg" alt="" aria-hidden="true" className="technology-stack__card-icon" />
              <span className="technology-stack__card-name">{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
