import "./home-section.scss";
import { forwardRef } from "react";

const HomeSection = forwardRef((props, ref) => {
  return (
    <section id="HOME" ref={ref} className="home-section">
      <MatrixBackground></MatrixBackground>
      <PageTitle></PageTitle>
    </section>
  );
});
function PageTitle() {
  return (
    <div className="page-title">
      <span className="fname">IJERI</span>
      <img
        src="/assets/clip-art-images/memoji-laptop.svg"
        alt="memoji laptop"
      ></img>
      <span className="lname">OMITOGUN</span>
    </div>
  );
}
function MatrixBackground() {
  return (
    <div className="section-bg">
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
  );
}
export default HomeSection;
