
import React, { useState } from "react";
import "./Contact.css";
import coffeeImage from "../assets/coffee-about.png";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaPaperPlane,
  FaExternalLinkAlt,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setSubmitted(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-shell">

        {/* Section Intro */}
        <div className="contact-intro">
          <span className="contact-kicker">
            <span></span> LET'S CONNECT
          </span>

          <h2>
            Every great coffee
            <br />
            starts with a <em>hello.</em>
          </h2>

          <p>
            Questions, reservations or just a little coffee talk?
            We're always happy to hear from you.
          </p>
        </div>

        {/* Main Contact Layout */}
        <div className="contact-grid">

          {/* Left Visual */}
          <div className="contact-visual">
            <img
              src={coffeeImage}
              alt="Freshly brewed coffee at our cafe"
            />

            <div className="contact-visual-shade"></div>

            <div className="contact-visual-content">
              <span className="visual-tag">YOUR COZY CORNER</span>

              <h3>
                Good coffee.
                <br />
                Great conversations.
              </h3>

              <p>
                Come in, slow down and enjoy a cup made just for you.
              </p>

              <a href="#contact-form" className="visual-link">
                TALK TO US <FaArrowRight />
              </a>
            </div>

            <div className="visual-bottom-note">
              <span>BREWED WITH LOVE</span>
              <span>EST. 2026</span>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form-panel" id="contact-form">
            <div className="form-heading">
              <span>DROP US A MESSAGE</span>
              <h3>We'd love to hear from you.</h3>
              <p>
                Fill in the details below and we'll be in touch.
              </p>
            </div>

            {submitted && (
              <div className="contact-success">
                Thank you! Your message has been received.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-field-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What would you like to talk about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit">
                Send Message <FaPaperPlane />
              </button>
            </form>

            <div className="contact-form-foot">
              <span>WE'LL GET BACK TO YOU SOON</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* Location and Map */}
        <div className="contact-location-section">
          <div className="location-heading">
            <div>
              <span>COME FIND US</span>
              <h3>
                Your coffee spot <em>awaits.</em>
              </h3>
              <p>
                Find your way to our cafe and enjoy a fresh cup
                in a warm and welcoming atmosphere.
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=coffee+shop"
              target="_blank"
              rel="noreferrer"
              className="location-direction-link"
            >
              Get Directions <FaExternalLinkAlt />
            </a>
          </div>

          <div className="contact-map">
            <iframe
              title="Find our coffee shop on Google Maps"
              src="https://www.google.com/maps?q=coffee%20shop&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Bottom Contact Information */}
        <div className="contact-bottom">

          <div className="contact-bottom-item">
            <div className="bottom-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <span>COME VISIT</span>
              <h4>Your City, India</h4>
            </div>
          </div>

          <div className="contact-bottom-item">
            <div className="bottom-icon">
              <FaPhoneAlt />
            </div>
            <div>
              <span>GIVE US A CALL</span>
              <h4>+91 XXXXX XXXXX</h4>
            </div>
          </div>

          <div className="contact-bottom-item">
            <div className="bottom-icon">
              <FaEnvelope />
            </div>
            <div>
              <span>WRITE TO US</span>
              <h4>hello@coffeecorner.in</h4>
            </div>
          </div>

          <div className="contact-bottom-item">
            <div className="bottom-icon">
              <FaClock />
            </div>
            <div>
              <span>OPEN DAILY</span>
              <h4>08 AM – 10 PM</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
