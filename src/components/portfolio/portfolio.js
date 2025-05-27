import { forwardRef, useRef } from "react";
import "./portfolio.scss";
// import { Carousel } from "primereact/carousel";
import { store } from "../../data.js";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ProjectItem(props) {
  const pathPrefix = "/assets/project-images/";
  return (
    <div className="project-bubble">
      <img src={`${pathPrefix}${props.project.coverImg}`}></img>
      <h4 className="title">{props.project.title}</h4>
      <p className="desc">{props.project.description}</p>
      <button className="view-project">View Project</button>
    </div>
  );
}
function ProjectModal(props) {
  return (
    <div className="modal">
      <div className="modal-container">
        <img></img>
        <h4>
          {props.project.title + props.companyName
            ? `@ ${props.companyName}`
            : ""}
        </h4>
        <p> {props.project.description}</p>
        <div>
          <p> Technologies: </p>
          {props.project.techStack.map((tech) => {
            return <div>{tech}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
function CustomLeftArrow({ onClick, ...rest }) {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button className="left-arrow" onClick={() => onClick()} />;
}
function CustomRightArrow({ onClick, ...rest }) {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button className="right-arrow" onClick={() => onClick()} />;
}
const Portfolio = forwardRef((props, ref) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 3,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
    },

    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
  };
  return (
    <section ref={ref} id="PORT">
      <h2 className="">[PRODUCTS I'VE WORKED ON]</h2>
      <h3 className="">A collection professional and personal projects.</h3>
      <Carousel
        className="carousel"
        draggable={true}
        responsive={responsive}
        showDots={true}
        dotListClass="dots"
        itemClass="carousel-item"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        keyBoardControl={true}
        swipeable={true}
      >
        {store.projects.map((project) => {
          return <ProjectItem project={project}></ProjectItem>;
        })}
      </Carousel>
    </section>
  );
});

export default Portfolio;
