import "./home-section.scss";
export default function HomeSection() {
  return (
    <div className="home-section">
      <MatrixBackground></MatrixBackground>
      <PageTitle></PageTitle>
    </div>
  );
}

function PageTitle() {
  return (
    <div class="page-title">
      <span>IJERI</span>
      <img src="../../assets/clip-art-images/memoji-laptop.svg"></img>
      <span>OMITOGUN</span>
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
        className="binary-code rain-animation-middle "
        style={{ left: "8%" }}
      ></span>
      <span
        className="binary-code rain-animation-upper-middle"
        style={{ left: "10%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "14%" }}
      ></span>

      <span
        className="binary-code rain-animation"
        style={{ left: "18%" }}
      ></span>
      <span
        className="binary-code rain-animation-upper-middle"
        style={{ left: "20%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "22%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "24%" }}
      ></span>

      <span
        className="binary-code rain-animation-upper-middle"
        style={{ left: "28%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "32%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "36%" }}
      ></span>
      <span
        className="binary-code rain-animation-upper-middle"
        style={{ left: "38%" }}
      ></span>

      <span
        className="binary-code rain-animation-middle"
        style={{ left: "54%" }}
      ></span>
      <span
        className="binary-code rain-animation-upper-middle"
        style={{ left: "58%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "60%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "64%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "68%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "72%" }}
      ></span>
      <span
        className="binary-code rain-animation-upper-middle"
        style={{ left: "74%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "78%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "82%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "86%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "88%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "90%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "92%" }}
      ></span>
      <span
        className="binary-code rain-animation-middle"
        style={{ left: "94%" }}
      ></span>
      <span
        className="binary-code rain-animation"
        style={{ left: "96%" }}
      ></span>
    </div>
  );
}
