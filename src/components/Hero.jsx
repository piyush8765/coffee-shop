
import React from "react";
import "./Hero.css";
import coffeeHero from "../assets/coffee-hero.png";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <span className="hero-subtitle">
            <span className="subtitle-line"></span>
            WELCOME TO OUR COFFEE SHOP
          </span>

          <h1>
            Every Cup Tells
            <span>A Coffee Story.</span>
          </h1>

          <p className="hero-description">
            Experience the art of freshly brewed coffee.
            Rich aromas, handcrafted flavours and beautiful
            moments are waiting for you.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="hero-btn primary-btn">
              Explore Our Menu
              <span>↗</span>
            </a>

            <a href="#about" className="hero-btn secondary-btn">
              Discover Our Story
            </a>
          </div>

          {/* Bottom Highlights */}
          <div className="hero-highlights">

            <div className="highlight-item">
              <span className="highlight-icon">☕</span>
              <div>
                <h4>Freshly Brewed</h4>
                <p>Every Single Day</p>
              </div>
            </div>

            <div className="highlight-divider"></div>

            <div className="highlight-item">
              <span className="highlight-icon">✦</span>
              <div>
                <h4>Premium Beans</h4>
                <p>Quality In Every Cup</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Image */}
        <div className="hero-visual">

          <div className="hero-image-bg"></div>

          <div className="hero-image-wrapper">
            <img
              src={coffeeHero}
              alt="Freshly prepared coffee at our cafe"
            />
          </div>

          <div className="hero-floating-card">
            <span className="floating-star">✦</span>
            <div>
              <h4>Freshly Brewed</h4>
              <p>Made with love & passion</p>
            </div>
          </div>

          <div className="hero-side-text">
            CRAFTED WITH PASSION
          </div>

        </div>

      </div>

      <div className="hero-bottom-label">
        <span>01</span>
        <span className="label-line"></span>
        <span>WELCOME TO OUR WORLD</span>
      </div>

    </section>
  );
};

export default Hero;
