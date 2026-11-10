
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCalendarAlt,
  FaImages,
  FaArrowRight,
  FaMusic,
  FaCoffee,
  FaUsers,
  FaGlassCheers,
} from "react-icons/fa";
import "./EventsGallery.css";

const galleryEvents = [
  {
    id: 1,
    title: "Live Music Nights",
    category: "Live Music",
    date: "Recent Event",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900",
    description: "Beautiful acoustic performances and memorable musical evenings.",
  },
  {
    id: 2,
    title: "Coffee Brewing Workshop",
    category: "Workshops",
    date: "Recent Event",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900",
    description: "Learning professional brewing techniques with coffee lovers.",
  },
  {
    id: 3,
    title: "Weekend Coffee Meetup",
    category: "Meetups",
    date: "Recent Event",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900",
    description: "A lovely gathering filled with conversations and coffee.",
  },
  {
    id: 4,
    title: "Coffee & Celebration Evening",
    category: "Special Events",
    date: "Recent Event",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900",
    description: "Celebrating special moments with great food and coffee.",
  },
  {
    id: 5,
    title: "Coffee Art Experience",
    category: "Workshops",
    date: "Past Event",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900",
    description: "Exploring creativity through beautiful latte art.",
  },
  {
    id: 6,
    title: "Cafe Community Gathering",
    category: "Meetups",
    date: "Past Event",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900",
    description: "Connecting people through coffee, stories and friendships.",
  },
  {
    id: 7,
    title: "Acoustic Evening",
    category: "Live Music",
    date: "Past Event",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900",
    description: "An evening of live music, warm coffee and good vibes.",
  },
  {
    id: 8,
    title: "Festive Cafe Celebration",
    category: "Special Events",
    date: "Past Event",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900",
    description: "A festive celebration with wonderful memories.",
  },
];

const categories = [
  "All Events",
  "Live Music",
  "Workshops",
  "Meetups",
  "Special Events",
];

function EventsGallery() {
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [search, setSearch] = useState("");

  const filteredEvents = galleryEvents.filter((event) => {
    const matchesCategory =
      activeFilter === "All Events" ||
      event.category === activeFilter;

    const searchableContent = [
      event.title,
      event.category,
      event.description,
      event.date,
    ]
      .join(" ")
      .toLowerCase();

    return (
      matchesCategory &&
      searchableContent.includes(search.trim().toLowerCase())
    );
  });

  return (
    <main className="events-gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <span className="gallery-eyebrow">
            <FaImages /> MEMORIES AT COFFEE HOUSE
          </span>

          <h1>
            Moments Worth <span>Remembering.</span>
          </h1>

          <p>
            Take a look back at the beautiful moments, wonderful people
            and unforgettable experiences we've shared together.
          </p>

          <div className="gallery-hero-buttons">
            <a href="#past-gallery" className="gallery-primary-btn">
              Explore Gallery <FaArrowRight />
            </a>

            <Link to="/events/upcoming" className="gallery-secondary-btn">
              Upcoming Events
            </Link>
          </div>
        </div>

        <div className="gallery-hero-image">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
            alt="Coffee House event gathering"
          />
          <div className="gallery-image-caption">
            <span>Good Coffee.</span>
            <span>Great Memories.</span>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="gallery-highlights">
        <div className="gallery-highlight-item">
          <FaCalendarAlt />
          <div>
            <h3>Memorable Events</h3>
            <p>Every gathering tells a story</p>
          </div>
        </div>

        <div className="gallery-highlight-item">
          <FaMusic />
          <div>
            <h3>Live Experiences</h3>
            <p>Music, fun and entertainment</p>
          </div>
        </div>

        <div className="gallery-highlight-item">
          <FaCoffee />
          <div>
            <h3>Coffee Moments</h3>
            <p>Good coffee brings us together</p>
          </div>
        </div>

        <div className="gallery-highlight-item">
          <FaUsers />
          <div>
            <h3>Our Community</h3>
            <p>People make every moment special</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="past-gallery-section" id="past-gallery">
        <div className="gallery-section-heading">
          <span>OUR EVENT MEMORIES</span>
          <h2>Past Events <em>Gallery</em></h2>
          <p>
            Explore the moments that made our Coffee House community special.
          </p>
        </div>

        <div className="gallery-search-wrapper">
          <FaSearch />
          <input
            type="text"
            placeholder="Search events, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="gallery-filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={activeFilter === category ? "active" : ""}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-results-count">
          Showing {filteredEvents.length} memories
        </div>

        <div className="past-events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <article className="past-event-card" key={event.id}>
                <div className="past-event-image">
                  <img src={event.image} alt={event.title} loading="lazy" />

                  <span className="past-event-category">
                    {event.category}
                  </span>

                  <div className="past-event-overlay">
                    <FaImages />
                    <span>Event Memory</span>
                  </div>
                </div>

                <div className="past-event-info">
                  <span className="past-event-date">
                    <FaCalendarAlt /> {event.date}
                  </span>

                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="gallery-no-results">
              <FaGlassCheers />
              <h3>No Memories Found</h3>
              <p>Try another search or select a different category.</p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All Events");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="gallery-bottom-cta">
        <div>
          <span>BE PART OF OUR NEXT STORY</span>
          <h2>Let's Create More Beautiful Memories.</h2>
          <p>
            Join us at our upcoming events and make your own Coffee House memories.
          </p>
        </div>

        <Link to="/events/upcoming">
          Explore Upcoming Events <FaArrowRight />
        </Link>
      </section>
    </main>
  );
}

export default EventsGallery;
