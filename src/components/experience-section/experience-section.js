import { forwardRef, useState, useEffect, useRef } from "react";
import "./experience-section.scss";
import { store } from "../../data.js";

const ExpSection = forwardRef((props, ref) => {
  const pathPrefix = "/assets/experience-images/";
  const experiences = store.experiences;
  const [activeImage, setActiveImage] = useState(
    `${pathPrefix}${experiences[0].image}`
  );
  const experienceRefs = useRef([]);
  const expSpread = 2.5;

  useEffect(() => {
    const observerOptions = {
      threshold: [0.2, 0.7],
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.7) {
          const image = experiences[parseInt(entry.target.id)].image;
          setActiveImage(`${pathPrefix}${image}`);
          entry.target.style.opacity = "100%";
        } else if (entry.intersectionRatio < 0.6) {
          entry.target.style.opacity = "50%";
        }
      });
    }, observerOptions);
    experienceRefs.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, [experienceRefs, activeImage]);

  return (
    <section id="EXP" ref={ref}>
      <h2 className={"title " + (props.inView ? "fixed" : "fixed")}>
        [Follow My Journey]
      </h2>
      <div className={"timeline-bg " + (props.inView ? "fixed" : "fixed")}>
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <img
        className="active-image"
        src={activeImage}
        alt="timeline image"
      ></img>
      <div className="experiences">
        {experiences.map((item, index) => (
          <div
            className="experience"
            key={index}
            id={`${index}`}
            ref={(element) => (experienceRefs.current[index] = element)}
            style={{ top: `${expSpread * index}%` }}
          >
            <div className="point"></div>

            <div className="exp-bubble">
              <img
                className="thumbnail"
                src={`${pathPrefix}${item.thumbnail}`}
              ></img>
              <h3 className="exp-title">{item.companyName}</h3>
              <h4 className="job-title">{item.jobTitle}</h4>
              <p className="date">
                {item.startDate} - {item.endDate}
              </p>
              <p className="exp-desc">{item.description} </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ExpSection;
