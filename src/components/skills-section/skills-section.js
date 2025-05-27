import { forwardRef, useRef } from "react";
import "./skills-section.scss";
import { store } from "../../data.js";

const SkillsSection = forwardRef((props, ref) => {
  const skills = store.skills;
  return (
    <section id="SKILLS">
      <img
        className="image-bg"
        src="/assets/background-images/typing-hands.png"
        alt="laptop"
      ></img>
      <div className="green-tint"></div>
      <div className="black-tint"></div>
      <h2 className="title"> [Skills I Have]</h2>
      <div className="skills">
        <h3 className="f-title"> Front End Development</h3>
        <h3 className="l-title"> Back End Development</h3>
        <h3 className="d-title"> Tech & Tools</h3>
        {skills.frontEndSkills.map((skill, index) => {
          return (
            <p
              class="front-end"
              style={{
                gridRow:
                  index <= 3 ? (index + 2).toString() : (index - 2).toString(),
                gridColumn: index <= 3 ? "2" : "3",
              }}
            >
              {skill}
            </p>
          );
        })}
        {skills.backEndSkills.map((skill, index) => {
          return (
            <p
              class="back-end"
              style={{
                gridRow:
                  index <= 3 ? (index + 2).toString() : (index - 2).toString(),
                gridColumn: index <= 3 ? "4" : "5",
              }}
            >
              {skill}
            </p>
          );
        })}
        {skills.devSkills.map((skill, index) => {
          return (
            <p
              class="dev-tools"
              style={{
                gridRow:
                  index <= 3 ? (index + 2).toString() : (index - 2).toString(),
                gridColumn: index <= 3 ? "6" : "7",
              }}
            >
              {skill}
            </p>
          );
        })}
      </div>
    </section>
  );
});
export default SkillsSection;
