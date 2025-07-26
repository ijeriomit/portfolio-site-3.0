import "./home-section.scss";
import { forwardRef, useRef } from "react";
import { MatrixBackground } from "../matrix-background/matrix-background";
const HomeSection = forwardRef((props, ref) => {
  return (
    <section id="HOME" ref={ref} className="home-section">
      <MatrixBackground></MatrixBackground>
      <PageTitle></PageTitle>
      <div className="buttons">
        <button className="button"> View Resume</button>
        <button className="button"> See My Work</button>
      </div>
    </section>
  );
});
function PageTitle() {
  const titleRef = useRef(null);
  let tiltThrottled = false;
  function handleMove(e) {
    const xVal = e.nativeEvent.layerX;
    const yVal = e.nativeEvent.layerY;
    const width = titleRef.current.clientWidth;
    const height = titleRef.current.clientHeight;
    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);
    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";
    if (!tiltThrottled) {
      titleRef.current.style.transform = string;
    }
    tiltThrottled = true;
    setTimeout(() => {
      tiltThrottled = false;
    }, 1000);
  }
  function handleMouseDown() {
    titleRef.current.style.transform =
      "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  }
  function handleMouseOut() {
    titleRef.current.style.transform =
      "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
  }
  function handleMouseUp() {
    titleRef.current.style.transform =
      "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  }
  return (
    <h1
      ref={titleRef}
      className="page-title"
      onMouseMove={handleMove}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <span className="fname">IJERI</span>
      <img
        src="/assets/clip-art-images/memoji-laptop.svg"
        alt="memoji laptop"
      ></img>
      <span className="lname ">OMITOGUN</span>
      <p className="sub-title"> Software Engineering Extraordinaire!</p>
    </h1>
  );
}
export default HomeSection;
