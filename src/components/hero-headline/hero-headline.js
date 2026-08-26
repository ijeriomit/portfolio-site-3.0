import { useState, useEffect } from "react";
import "./hero-headline.scss";

const INTRO_TEXT = "HELLO, I'M IJERI OMITOGUN";
const HEADLINE_LINES = [
  { text: "I BUILD SOFTWARE",  accent: false },
  { text: "THAT SOLVES REAL",  accent: true  },
  { text: "BUSINESS PROBLEMS.", accent: false },
];
const SUBTITLE = "Full Stack Engineer specializing in scalable web applications, UX design, and AI-powered solutions.";

function useTypewriter(text, speed = 45, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let index = 0;
    let timeout;

    const start = setTimeout(() => {
      const tick = () => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index < text.length) {
          timeout = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function HeroHeadline() {
  const { displayed: introDisplayed, done: introDone } = useTypewriter(INTRO_TEXT, 55, 300);

  return (
    <div className="hero-headline">
      <h3 className="hero-headline__intro" aria-label={INTRO_TEXT}>
        <span aria-hidden="true">{introDisplayed}</span>
        <span className={"hero-headline__cursor" + (introDone ? " hero-headline__cursor--blink" : "")} aria-hidden="true">|</span>
      </h3>

      <h1 className={"hero-headline__title" + (introDone ? " hero-headline__title--visible" : "")} aria-label={HEADLINE_LINES.map(l => l.text).join(" ")}>
        {HEADLINE_LINES.map((line, i) => (
          <span
            key={i}
            className={"hero-headline__line" + (line.accent ? " hero-headline__line--accent" : "")}
          >
            {line.text}
          </span>
        ))}
      </h1>

      <p className={"hero-headline__subtitle" + (introDone ? " hero-headline__subtitle--visible" : "")}>
        {SUBTITLE}
      </p>
    </div>
  );
}
