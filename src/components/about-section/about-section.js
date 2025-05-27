import { forwardRef } from "react";
import "./about-section.scss";

const AboutSection = forwardRef((props, ref) => {
  return (
    <section id="ABOUT" ref={ref}>
      <img
        className="profile-pic"
        src="/assets/about-me-images/headshot.jpg"
        alt="profile picture"
      ></img>
      <div
        className={"about-me-content " + (props.loadContent ? "fade-in" : "")}
      >
        <h2> HI, I AM IJERI</h2>
        <h3> &lt;FullStack Developer | UX Designer/&gt;</h3>
        <p>
          Hello! I am a software engineer with a strong focus on creating
          user-friendly and visually engaging web applications. My journey
          started with a love for video games, which led me to discover my
          passion for web development over the years.
        </p>
        <p>
          I’ve worked on innovative projects at{" "}
          <strong>NAUTICS ROBOTICS</strong> and <strong>GOOGLE</strong>, honing
          my skills in designing intuitive UX and ensuring application
          performance and accessibility.
        </p>
        <p>
          While I specialize in front-end development, I’m always eager to
          explore new challenges in software engineering. If you’re looking for
          someone to bring your vision to life, let’s connect and create
          something extraordinary together!
        </p>
        <div className="socials">
          <a
            className="about-button"
            href="https://www.linkedin.com/in/ijeri-omitogun/"
            target="_blank"
            rel="noreferrer"
          >
            Email Me
          </a>
          <a
            className="about-button"
            href="https://www.linkedin.com/in/ijeri-omitogun/"
            target="_blank"
            rel="noreferrer"
          >
            Hire Me
          </a>
          <a
            className="white-filter icon-link"
            href="https://www.linkedin.com/in/ijeri-omitogun/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/link-images/linkedin.svg" alt="linkedin" />
          </a>
          <a
            className="white-filter icon-link"
            href="https://github.com/ijeriomit"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/link-images/github.svg" alt="github" />
          </a>
          <a
            className="white-filter icon-link"
            href="https://medium.com/@jeri-omit"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/link-images/medium.svg" alt="medium" />
          </a>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
