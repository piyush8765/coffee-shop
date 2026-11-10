
import React from "react";
import "./About.css";
import aboutImage from "../assets/coffee-about.png";

const About = () => {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* Left Image */}
        <div className="about-visual">

          <div className="about-image-frame">
            <img
              src={aboutImage}
              alt="Coffee being freshly prepared in our cafe"
            />
          </div>

          <div className="about-experience">
            <span className="experience-number">10+</span>
            <div>
              <strong>Years of</strong>
              <strong>Coffee Passion</strong>
            </div>
          </div>

          <div className="about-image-decoration"></div>

        </div>

        {/* Right Content */}
        <div className="about-content">

          <span className="about-subtitle">
            <span></span>
            OUR STORY
          </span>

          <h2>
            More Than Coffee,
            <em>It's an Experience.</em>
          </h2>

          <p className="about-intro">
            Great coffee brings people together. We believe every
            cup should tell a story of passion, quality and care.
          </p>

          <p className="about-description">
            From carefully selected coffee beans to every
            handcrafted cup, we focus on creating moments
            worth remembering. Whether you need a peaceful
            morning or a place to connect with friends,
            our cafe welcomes you.
          </p>

          {/* Highlights */}
          <div className="about-features">

            <div className="about-feature">
              <span className="feature-icon">✦</span>
              <div>
                <h4>Premium Coffee Beans</h4>
                <p>Carefully selected quality beans.</p>
              </div>
            </div>

            <div className="about-feature">
              <span className="feature-icon">☕</span>
              <div>
                <h4>Made With Passion</h4>
                <p>Every cup freshly prepared for you.</p>
              </div>
            </div>

          </div>

          <a href="#menu" className="about-button">
            Discover Our Menu
            <span>↗</span>
          </a>

        </div>

      </div>

      {/* Bottom Brand Statement */}
      <div className="about-bottom">
        <span>GOOD COFFEE</span>
        <span className="about-bottom-dot">✦</span>
        <span>GOOD PEOPLE</span>
        <span className="about-bottom-dot">✦</span>
        <span>GOOD MOMENTS</span>
      </div>

    </section>
  );
};

export default About;
