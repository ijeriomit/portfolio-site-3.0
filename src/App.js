import { useState, useEffect, useRef } from "react";

import "./App.scss";
import Header from "./components/header/header.js";
import HomeSection from "./components/home-section/home-section.js";
import AboutSection from "./components/about-section/about-section.js";

function App() {
  const [logoColor, setLogoColor] = useState("#000000");
  const [logoCollapsed, setLogoCollapsed] = useState(false);
  const appRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

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
          setLogoColor("#2DAF7D");
          setLogoCollapsed(true);
        } else if (
          entry.target.id === homeRef.current.id &&
          entry.intersectionRatio > 0
        ) {
          setLogoColor("#000000");
          setLogoCollapsed(false);
        }
      });
    }, observerOptions);
    observer.observe(homeRef.current);
    observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, [homeRef, appRef, aboutRef, logoColor, logoCollapsed]);
  return (
    <div className="App" ref={appRef}>
      <Header
        id="header"
        logoColor={logoColor}
        logoCollapsed={logoCollapsed}
      ></Header>
      <HomeSection ref={homeRef}></HomeSection>
      <AboutSection ref={aboutRef}></AboutSection>
    </div>
  );
}

export default App;
