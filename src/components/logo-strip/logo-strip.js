import { useEffect, useRef, useState } from "react";
import "./logo-strip.scss";

const LOGOS = [
  { name: "IBM", src: `${process.env.PUBLIC_URL}/assets/clip-art-images/ibm-logo.svg`, alt: "IBM" },
  {
    name: "HashiCorp",
    src: `${process.env.PUBLIC_URL}/assets/clip-art-images/hashicorp-logo.svg`,
    alt: "HashiCorp",
    showName: true,
  },
  { name: "Google", src: null, alt: "Google", className: "google" },
  {
    name: "nauticus",
    src: `${process.env.PUBLIC_URL}/assets/clip-art-images/nauticus-wordmark.svg`,
    alt: "Nauticus Robotics",
    className: "nauticus",
  },
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
      <ul className="logo-strip__list">
        {LOGOS.map((logo, i) => (
          <li
            key={logo.name}
            className={`logo-strip__item${logo.className ? ` logo-strip__item--${logo.className}` : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {logo.src ? (
              <div className="logo-strip__wordmark">
                <img
                  src={logo.src}
                  alt={logo.showName ? "" : logo.alt}
                  aria-hidden={logo.showName ? "true" : undefined}
                  className="logo-strip__img"
                  loading="lazy"
                />
                {logo.showName && <span>{logo.name}</span>}
              </div>
            ) : (
              <span className={`logo-strip__placeholder logo-strip__placeholder--${logo.className}`} aria-label={logo.alt}>
                {logo.name}
                {logo.className === "nauticus" && <small>robotics</small>}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
