
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">

      {/* Decorative Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">

          <path
            d="M0 0 H1440 V65
            C1300 110 1190 20 1050 60
            C900 105 820 25 680 65
            C540 110 440 15 300 55
            C180 95 90 20 0 55 Z"
            fill="#e98770"
          />

          <path
            d="M0 0 H1440 V35
            C1300 75 1200 15 1070 45
            C930 85 840 10 700 45
            C550 85 470 5 330 40
            C190 75 100 5 0 30 Z"
            fill="#496b57"
          />

        </svg>
      </div>

      {/* Footer Columns */}
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>
            Coffee Shop<span>.</span>
          </h2>

          <p>
            More than just coffee. A little warmth,
            a little happiness and a perfect cup
            made fresh for every moment.
          </p>

          {/* Social Icons */}
          <div className="footer-socials">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>QUICK LINKS</h3>

          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu">Our Menu</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Menu Categories */}
        <div className="footer-links">
          <h3>OUR MENU</h3>

          <a href="#menu">Hot Coffee</a>
          <a href="#menu">Cold Coffee</a>
          <a href="#menu">Special Coffee</a>
          <a href="#menu">Black Coffee</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>CONTACT US</h3>

          <p>
            <FaPhoneAlt />
            +91 XXXXX XXXXX
          </p>

          <p>
            <FaEnvelope />
            hello@coffeeshop.com
          </p>

          <p>
            <FaMapMarkerAlt />
            Your City, India
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Coffee Shop.
          All rights reserved.
        </p>

        <div>
          <a href="#contact">Privacy Policy</a>
          <a href="#contact">Terms of Service</a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
