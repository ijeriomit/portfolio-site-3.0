import { forwardRef, useMemo, useState } from "react";
import { store } from "../../data.js";
import Button from "../shared/button/button.js";
import MatrixBackground from "../matrix-background/matrix-background.js";
import "./testimonials.scss";

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function shuffle(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[swapIndex]] = [
      shuffledItems[swapIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

const CATEGORY_MAP = {
  Google: "Engineering Leaders",
  IBM: "Colleagues",
  HashiCorp: "Colleagues",
  Client: "Clients",
  "University of Michigan": "Professors & Mentors",
  "Nauticus Robotics": "Colleagues",
};

const Testimonials = forwardRef((props, ref) => {
  const testimonials = useMemo(
    () => shuffle(store.endorsements.map((endorsement) => ({
      ...endorsement,
      category: CATEGORY_MAP[endorsement.title.split(" at ").at(-1)] || "All Recommendations",
      company: endorsement.title.split(" at ").at(-1) || endorsement.title,
      role: endorsement.title.split(" at ")[0],
      id: slugify(endorsement.name),
    }))),
    []
  );

  const categories = useMemo(
    () => [
      "All Recommendations",
      "Engineering Leaders",
      "Colleagues",
      "Clients",
      "Professors & Mentors",
    ],
    []
  );

  const [activeCategory, setActiveCategory] = useState("All Recommendations");
  const filteredTestimonials = useMemo(
    () => activeCategory === "All Recommendations"
      ? testimonials
      : testimonials.filter((item) => item.category === activeCategory),
    [activeCategory, testimonials]
  );

  const [selectedId, setSelectedId] = useState(testimonials[0]?.id);
  const selectedTestimonial = filteredTestimonials.find((item) => item.id === selectedId) || filteredTestimonials[0] || testimonials[0];

  function handleSelectCategory(category) {
    setActiveCategory(category);
    const nextList = category === "All Recommendations"
      ? testimonials
      : testimonials.filter((item) => item.category === category);
    if (nextList[0]) {
      setSelectedId(nextList[0].id);
    }
  }

  return (
    <section ref={ref} id="TEST" className="testimonials-section">
      <MatrixBackground />
      <div className="testimonials-section__content">
        <div className="testimonials-section__showcase">
          <div className="testimonials-section__intro">
            <p className="testimonials-section__eyebrow">TESTIMONIALS</p>
            <h2 className="testimonials-section__headline">
              WHAT PEOPLE
              <br />
              <span className="testimonials-section__headline--accent">SAY ABOUT ME</span>
            </h2>
            <p className="testimonials-section__copy">
              Recommendations from colleagues and leaders I&apos;ve worked with across startups and enterprise teams.
            </p>
            <div className="testimonials-section__categories">
              <p className="testimonials-section__categories-label">CATEGORIES</p>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={"testimonials-section__category" + (activeCategory === category ? " testimonials-section__category--active" : "")}
                  onClick={() => handleSelectCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="testimonials-section__card" key={selectedTestimonial.id}>
            <p className="testimonials-section__quote-mark">“</p>
            <p className="testimonials-section__quote">{selectedTestimonial.text}</p>
            <div className="testimonials-section__person">
              <img className="testimonials-section__avatar" src={`/assets/about-me-images/${selectedTestimonial.imageSrc}`} alt={selectedTestimonial.name} />
              <div className="testimonials-section__person-text">
                <p className="testimonials-section__name">{selectedTestimonial.name}</p>
                <p className="testimonials-section__role">{selectedTestimonial.role}</p>
                <p className="testimonials-section__company">{selectedTestimonial.company}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-section__avatar-rail" aria-label="Testimonial navigation">
          {filteredTestimonials.map((item) => (
            <button
              key={item.id}
              type="button"
              className={"testimonials-section__avatar-button" + (selectedTestimonial.id === item.id ? " testimonials-section__avatar-button--active" : "")}
              onClick={() => setSelectedId(item.id)}
            >
              <img src={`/assets/about-me-images/${item.imageSrc}`} alt={item.name} className="testimonials-section__avatar-thumb" />
              <span className="testimonials-section__avatar-name">{item.name}</span>
              <span className="testimonials-section__avatar-company">{item.company}</span>
            </button>
          ))}
        </div>

        <div className="testimonials-section__cta">
          <div>
            <p className="testimonials-section__cta-title">Want to share your experience working with me?</p>
            <p className="testimonials-section__cta-copy">I&apos;d love to hear from you.</p>
          </div>
          <Button variant="primary" href="mailto:ijeri.omitogun@gmail.com?subject=Recommendation">Leave a Recommendation</Button>
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
