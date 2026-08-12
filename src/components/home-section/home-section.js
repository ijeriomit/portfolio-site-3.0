import { forwardRef } from "react";
import "./home-section.scss";
import HeroHeadline from "../hero-headline/hero-headline.js";
import ProfileGraphic from "../profile-graphic/profile-graphic.js";
import LogoStrip from "../logo-strip/logo-strip.js";
import Button from "../shared/button/button.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const HomeSection = forwardRef((props, ref) => {
  return (
    <section id="HOME" ref={ref} className="home-section">
      <MatrixBackground />
      <div className="home-section__hero">
        <div className="home-section__content">
          <HeroHeadline />
          <div className="home-section__buttons">
            <Button variant="primary" href="#PORT">View My Work</Button>
            <Button variant="secondary" href="#CONTACT">Hire Me</Button>
          </div>
        </div>
        <ProfileGraphic />
      </div>
      <div className="home-section__logos">
        <LogoStrip />
      </div>
    </section>
  );
});

export default HomeSection;
