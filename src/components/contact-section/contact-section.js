import { forwardRef, useState } from "react";
import "./contact-section.scss";
import Button from "../shared/button/button.js";
import MatrixBackground from "../matrix-background/matrix-background.js";

const ContactSection = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | success

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    const nextErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("submitting");

    // Mock form submission delay
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  }

  return (
    <section ref={ref} id="CONTACT" className="contact-section">
      <MatrixBackground />
      <div className="contact-section__content">
        <div className="contact-section__intro">
          <div className="contact-section__hero-visual">
            <p className="contact-section__eyebrow">GET IN TOUCH</p>
            <img
              className="contact-section__memoji"
              src="/assets/clip-art-images/memoji-wave.svg"
              alt="Ijeri waving"
            />
          </div>
          <div className="contact-section__hero-copy">
            <h2 className="contact-section__headline">
              LET&apos;S WORK
              <br />
              <span className="contact-section__headline--accent">TOGETHER</span>
            </h2>
            <p className="contact-section__copy">
              Have a project in mind, a question, or just want to say hi? Feel free to reach out using the form or connect via socials.
            </p>
          </div>
        </div>

        <div className="contact-section__grid">
          {/* Left Column: Contact Cards & Socials */}
          <div className="contact-section__info">
            <div className="contact-section__cards">
              <div className="contact-card">
                <div className="contact-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-card__details">
                  <h3 className="contact-card__title">Email Me</h3>
                  <a href="mailto:ijeri.omitogun@gmail.com" className="contact-card__link">
                    ijeri.omitogun@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-card__details">
                  <h3 className="contact-card__title">Location</h3>
                  <p className="contact-card__text">Houston, TX / Remote</p>
                </div>
              </div>
            </div>

            <div className="contact-section__social-wrapper">
              <h3 className="contact-section__social-title">Connect</h3>
              <div className="contact-section__socials">
                <a className="social-link" href="https://www.linkedin.com/in/ijeri-omitogun/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <img src="/assets/link-images/linkedin.svg" alt="LinkedIn" />
                </a>
                <a className="social-link" href="https://github.com/ijeriomit" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <img src="/assets/link-images/github.svg" alt="GitHub" />
                </a>
                <a className="social-link" href="https://medium.com/@jeri-omit" target="_blank" rel="noreferrer" aria-label="Medium">
                  <img src="/assets/link-images/medium.svg" alt="Medium" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-section__form-container">
            {submitStatus === "success" ? (
              <div className="contact-section__success-msg" role="status">
                <div className="contact-section__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="contact-section__success-title">Message Sent!</h3>
                <p className="contact-section__success-desc">
                  Thank you for reaching out, Ijeri. I appreciate you taking the time to write, and will get back to you shortly.
                </p>
                <Button variant="secondary" onClick={() => setSubmitStatus("idle")}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__field">
                  <label htmlFor="contact-name" className="contact-form__label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={"contact-form__input" + (errors.name ? " contact-form__input--error" : "")}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="contact-form__error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-email" className="contact-form__label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={"contact-form__input" + (errors.email ? " contact-form__input--error" : "")}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="contact-form__error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-message" className="contact-form__label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={"contact-form__textarea" + (errors.message ? " contact-form__textarea--error" : "")}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, question, or opportunity..."
                    rows="5"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="contact-form__error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="contact-form__submit">
                  <Button type="submit" variant="primary" disabled={submitStatus === "submitting"}>
                    {submitStatus === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
