import { useEffect, useRef, useState } from "react";
import "./logo-strip.scss";

const LOGOS = [
  { name: "IBM",               src: null, alt: "IBM"               },
  { name: "HashiCorp",         src: null, alt: "HashiCorp"         },
  { name: "Google",            src: null, alt: "Google"            },
  { name: "Nauticus Robotics", src: null, alt: "Nauticus Robotics" },
];

export default function LogoStrip() {
  const stripRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stripRef}
      className={"logo-strip" + (visible ? " logo-strip--visible" : "")}
    >
      <span className="logo-strip__label">TRUSTED BY</span>
      <ul className="logo-strip__list" role="list">
        {LOGOS.map((logo, i) => (
          <li
            key={logo.name}
            className="logo-strip__item"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.alt}
                className="logo-strip__img"
                loading="lazy"
              />
            ) : (
              <span className="logo-strip__placeholder" aria-label={logo.alt}>
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
