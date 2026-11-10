
import React, { useState } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventsMenuOpen, setEventsMenuOpen] = useState(false);
  const [coffeeMenuOpen, setCoffeeMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { user, logout, isLoggedIn } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
    setEventsMenuOpen(false);
    setCoffeeMenuOpen(false);
  };

  const handleHomeSection = (sectionId) => {
    closeMenu();

    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCoffeeCategory = (category) => {
    closeMenu();

    navigate("/", {
      state: {
        scrollTo: "menu",
        menuCategory: category,
      },
    });
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const handleCartClick = () => {
    closeMenu();
    navigate("/cart");
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">☕</span>

          <span className="logo-text">
            <strong>Coffee</strong>
            <span>HOUSE</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <div className={`navbar-dropdown ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-links">

            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>

            <li>
              <a
                href="/#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeSection("about");
                }}
              >
                About
              </a>
            </li>

            {/* Menu Dropdown */}
            <li className="events-nav-item menu-nav-item">

              <div className="events-nav-link">
                <a
                  href="/#menu"
                  onClick={(e) => {
                    e.preventDefault();
                    handleHomeSection("menu");
                  }}
                >
                  Menu
                </a>

                <button
                  className={`events-dropdown-toggle ${
                         coffeeMenuOpen ? "active" : ""
                       }`}
                  type="button"
                  onClick={() => setCoffeeMenuOpen(!coffeeMenuOpen)}
                  aria-label="Toggle Coffee Menu submenu"
                  aria-expanded={coffeeMenuOpen}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>

              <ul
                className={`events-submenu ${
                  coffeeMenuOpen ? "events-submenu-show" : ""
                }`}
              >
                <li>
                  <button
                    type="button"
                    onClick={() => handleCoffeeCategory("All Coffee")}
                  >
                    <span>01</span> All Coffee
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCoffeeCategory("Hot Coffee")}
                  >
                    <span>02</span> Hot Coffee
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCoffeeCategory("Cold Coffee")}
                  >
                    <span>03</span> Cold Coffee
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCoffeeCategory("Black Coffee")}
                  >
                    <span>04</span> Black Coffee
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCoffeeCategory("Special Coffee")}
                  >
                    <span>05</span> Special Coffee
                  </button>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="/#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeSection("gallery");
                }}
              >
                Gallery
              </a>
            </li>

            {/* Events Dropdown */}
            <li className="events-nav-item">

              <div className="events-nav-link">
                <Link to="/events" onClick={closeMenu}>
                  Events
                </Link>

                <button
                  className={`events-dropdown-toggle ${
                     coffeeMenuOpen ? "active" : ""
                      }`}
                  type="button"
                  onClick={() => setEventsMenuOpen(!eventsMenuOpen)}
                  aria-label="Toggle Events submenu"
                  aria-expanded={eventsMenuOpen}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>

              <ul
                className={`events-submenu ${
                  eventsMenuOpen ? "events-submenu-show" : ""
                }`}
              >
                <li>
                  <Link to="/events" onClick={closeMenu}>
                    <span>01</span> Events Home
                  </Link>
                </li>

                <li>
                  <Link to="/events/upcoming" onClick={closeMenu}>
                    <span>02</span> Upcoming Events
                  </Link>
                </li>

                <li>
                  <Link to="/events/gallery" onClick={closeMenu}>
                    <span>03</span> Event Gallery
                  </Link>
                </li>

                <li>
                  <Link to="/events/host" onClick={closeMenu}>
                    <span>04</span> Host an Event
                  </Link>
                </li>

                <li>
                  <Link to="/events/booking-guide" onClick={closeMenu}>
                    <span>05</span> Booking Guide & FAQs
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeSection("contact");
                }}
              >
                Contact
              </a>
            </li>

          </ul>

          {/* Actions */}
          <div className="navbar-actions">

            {isLoggedIn ? (
              <>
                <span className="user-name">
                  Hi, {user?.name}
                </span>

                {user?.role === "admin" && (
                  <button
                    className="login-btn"
                    onClick={() => {
                      closeMenu();
                      navigate("/admin");
                    }}
                    type="button"
                  >
                    Admin Dashboard
                  </button>
                )}

                {user?.role === "customer" && (
                  <button
                    className="login-btn"
                    onClick={() => {
                      closeMenu();
                      navigate("/customer-dashboard");
                    }}
                    type="button"
                  >
                    My Dashboard
                  </button>
                )}

                <button
                  className="login-btn"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="login-btn"
                onClick={() => {
                  closeMenu();
                  navigate("/login");
                }}
                type="button"
              >
                Login
              </button>
            )}

            {/* Cart */}
            <button
              className="cart-btn"
              onClick={handleCartClick}
              type="button"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Cart
              <span className="cart-count">{cartCount}</span>
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
