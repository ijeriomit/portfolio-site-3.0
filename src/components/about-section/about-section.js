import { forwardRef } from "react";
import "./about-section.scss";

const AboutSection = forwardRef((props, ref) => {
  return <section id="ABOUT" ref={ref}></section>;
});

export default AboutSection;
