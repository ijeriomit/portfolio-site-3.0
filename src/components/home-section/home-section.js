import "./home-section.scss";
import { forwardRef, useRef } from "react";

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
function MatrixBackground() {
  return (
    <div className="wrapper">
      <div className="section-bg-gradient">
        <span
          className="binary-code rain-animation"
          style={{ left: "4%" }}
        ></span>
        <span
          className="binary-code rain-animation-middle"
          style={{ left: "6%" }}
        ></span>
        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "8%" }}
        ></span>
        <span
          className="binary-code rain-animation-lower-middle"
          style={{ left: "10%" }}
        ></span>

        <span
          className="binary-code rain-animation"
          style={{ left: "14%" }}
        ></span>
        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "16%" }}
        ></span>
        <span
          className="binary-code rain-animation-lower-middle"
          style={{ left: "18%" }}
        ></span>
        <span
          className="binary-code rain-animation-middle"
          style={{ left: "20%" }}
        ></span>

        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "24%" }}
        ></span>
        <span
          className="binary-code rain-animation-lower-middle"
          style={{ left: "26%" }}
        ></span>
        <span
          className="binary-code rain-animation"
          style={{ left: "28%" }}
        ></span>
        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "30%" }}
        ></span>

        <span
          className="binary-code rain-animation-middle"
          style={{ left: "34%" }}
        ></span>
        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "36%" }}
        ></span>
        <span
          className="binary-code rain-animation"
          style={{ left: "38%" }}
        ></span>
        <span
          className="binary-code rain-animation-middle"
          style={{ left: "40%" }}
        ></span>
        <span
          className="binary-code rain-animation-lower-middle"
          style={{ left: "42%" }}
        ></span>
        <span
          className="binary-code rain-animation-middle"
          style={{ left: "44%" }}
        ></span>
        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "46%" }}
        ></span>
        <span
          className="binary-code rain-animation-middle"
          style={{ left: "50%" }}
        ></span>
        <span
          className="binary-code rain-animation"
          style={{ left: "52%" }}
        ></span>
        <span
          className="binary-code rain-animation-lower-middle"
          style={{ left: "54%" }}
        ></span>
        <span
          className="binary-code rain-animation"
          style={{ left: "56%" }}
        ></span>
        <span
          className="binary-code rain-animation-middle"
          style={{ left: "58%" }}
        ></span>
        <span
          className="binary-code rain-animation-upper-middle"
          style={{ left: "60%" }}
        ></span>
        <span
          className="binary-code rain-animation-lower-middle"
          style={{ left: "64%" }}
        ></span>
        <span
          className="binary-code rain-animation"
          style={{ left: "66%" }}
        ></span>
      </div>
      <div className="section-bg"></div>
    </div>
  );
}
export default HomeSection;
