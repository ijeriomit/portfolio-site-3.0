import { useState, useEffect, useRef } from "react";

import Header from "./components/header/header.js";
import HomeSection from "./components/home-section/home-section.js";
import AboutSection from "./components/about-section/about-section.js";
import ExpSection from "./components/experience-section/experience-section.js";
import SkillsSection from "./components/skills-section/skills-section.js";
import Portfolio from "./components/portfolio/portfolio.js";
import Testimonials from "./components/testimonials/testimonials.js";
import MatrixBackground from "./components/matrix-background/matrix-background";

function App() {
  const [flipLogo, setLogo] = useState(false);
  const [loadAboutContent, setLoadAboutContent] = useState(false);
  const [inExpSection, setInExpSection] = useState(false);
  const appRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const expRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.9],
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.target.id === aboutRef.current.id &&
          entry.intersectionRatio > 0.9
        ) {
          setLogo(true);
          setLoadAboutContent(true);
          setInExpSection(false);
        } else if (
          entry.target.id === homeRef.current.id &&
          entry.intersectionRatio > 0
        ) {
          setLogo(false);
          setLoadAboutContent(false);
          setInExpSection(false);
        } else if (
          entry.target.id === expRef.current.id &&
          entry.intersectionRatio > 0.1
        ) {
          setLogo(true);
          setInExpSection(true);
        }
      });
    }, observerOptions);
    observer.observe(homeRef.current);
    observer.observe(aboutRef.current);
    observer.observe(expRef.current);
    return () => observer.disconnect();
  }, [
    homeRef,
    appRef,
    aboutRef,
    expRef,
    flipLogo,
    loadAboutContent,
    inExpSection,
  ]);
  return (
    <div className="App" ref={appRef}>
      <Header id="header" flipLogo={flipLogo}></Header>
      <HomeSection ref={homeRef}></HomeSection>
      <MatrixBackground className="bg-1"></MatrixBackground>
      <AboutSection
        loadContent={loadAboutContent}
        ref={aboutRef}
      ></AboutSection>
      <ExpSection inView={inExpSection} ref={expRef}></ExpSection>
      <SkillsSection></SkillsSection>
      <Portfolio></Portfolio>
      <Testimonials></Testimonials>
    </div>
  );
}

export default App;
