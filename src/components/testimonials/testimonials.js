import { forwardRef, useRef } from "react";
import { Carousel } from "primereact/carousel";
import { store } from "../../data.js";

import "./testimonials.scss";

function TextBubble(props) {
  // console.log("here: ", props);
  return (
    <div className="text-bubble">
      <div className="bubble">
        <p className="text">{props.text}</p>
      </div>
      <div className="person">
        <img
          className="photo"
          src={"/assets/about-me-images/" + props.imageSrc}
        ></img>
        <p className="name">{props.name}</p>
        <p className="title">{props.title}</p>
      </div>
    </div>
  );
}
const Testimonials = forwardRef((props, ref) => {
  const carousel = useRef(null);
  return (
    <section ref={ref} id="TEST">
      <h2 className="">[What PEOPLE SAY ABOUT ME]</h2>
      <h3 className="">Testimonials from colleagues</h3>
      <div className="iphone">
        <img
          className="memoji"
          src="/assets/clip-art-images/memoji-wave.svg"
          alt="wave-icon"
        ></img>
        <img
          className="outline"
          src="/assets/background-images/iphone4.png"
          alt="Iphone"
        ></img>
        <div className="white"></div>
      </div>
      <div className="testimonials">
        <Carousel
          onMouseEnter={() => {
            carousel.current.stopAutoplay();
          }}
          onMouseLeave={() => {
            carousel.current.startAutoplay();
          }}
          value={store.endorsements}
          ref={carousel}
          numVisible={2}
          numScroll={1}
          orientation="vertical"
          verticalViewPortHeight="900px"
          itemTemplate={TextBubble}
          autoplayInterval={10000}
          showNavigators={false}
          circular
        />
      </div>
      <a className="footer">
        <p className="contact">Contact Me - &gt; </p>
      </a>
    </section>
  );
});

export default Testimonials;
