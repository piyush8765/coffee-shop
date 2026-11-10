
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaArrowRight,
  FaMusic,
  FaMugHot,
  FaUsers,
  FaGlassCheers,
} from "react-icons/fa";

import "./UpcomingEvents.css";

const events = [
  {
    id: "01",
    title: "Live Music Nights",
    category: "Live Music",
    date: "Every Saturday",
    time: "6:00 PM - 9:00 PM",
    location: "Coffee House",
    price: "Free Entry",
    description:
      "Enjoy soulful acoustic music, delicious coffee and beautiful evenings with your favourite people.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=85",
    icon: <FaMusic />,
  },
  {
    id: "02",
    title: "Coffee Brewing Workshop",
    category: "Workshops",
    date: "Every Sunday",
    time: "11:00 AM - 1:00 PM",
    location: "Coffee House",
    price: "₹499 / Person",
    description:
      "Discover the art of brewing coffee and learn how to create your perfect cup with our experts.",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85",
    icon: <FaMugHot />,
  },
  {
    id: "03",
    title: "Weekend Coffee Meetup",
    category: "Meetups",
    date: "Every Weekend",
    time: "4:00 PM - 7:00 PM",
    location: "Coffee House",
    price: "Free Entry",
    description:
      "Meet new people, share conversations and make memorable moments over your favourite coffee.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=85",
    icon: <FaUsers />,
  },
  {
    id: "04",
    title: "Coffee & Celebration Evening",
    category: "Special Events",
    date: "Special Occasions",
    time: "5:00 PM - 8:00 PM",
    location: "Coffee House",
    price: "₹299 / Person",
    description:
      "Celebrate special moments with delicious coffee, great food and a beautiful cafe atmosphere.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85",
    icon: <FaGlassCheers />,
  },
];

const filters = [
  "All Events",
  "Live Music",
  "Workshops",
  "Meetups",
  "Special Events",
];

function UpcomingEvents() {
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [search, setSearch] = useState("");

 const filteredEvents = events.filter((event) => {
  const matchesCategory =
    activeFilter === "All Events" ||
    event.category === activeFilter;

  const searchText = search.trim().toLowerCase();

  const searchableContent = [
    event.title,
    event.category,
    event.description,
    event.date,
    event.time,
    event.location,
    event.price,
  ]
    .join(" ")
    .toLowerCase();

  const matchesSearch = searchableContent.includes(searchText);

  return matchesCategory && matchesSearch;
});

  return (
    <section className="upcoming-page">

      {/* Page Hero */}
      <div className="upcoming-hero">
        <div className="upcoming-hero-content">
          <span>DISCOVER WHAT'S HAPPENING</span>

          <h1>
            Upcoming
            <br />
            <em>Events & Experiences.</em>
          </h1>

          <p>
            From soulful music nights to coffee workshops,
            discover experiences worth being a part of.
          </p>

          <a href="#all-upcoming-events" className="upcoming-hero-btn">
            EXPLORE ALL EVENTS <FaArrowRight />
          </a>
        </div>

        <div className="upcoming-hero-image">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&q=85"
            alt="People enjoying a cafe event"
          />
          <div className="upcoming-image-label">
            <FaMugHot />
            <span>Good Coffee. Great Experiences.</span>
          </div>
        </div>
      </div>

      {/* Events Listing */}
      <div className="upcoming-listing" id="all-upcoming-events">

        <div className="upcoming-heading">
          <span>FIND YOUR NEXT EXPERIENCE</span>
          <h2>Explore Our <em>Events.</em></h2>
          <p>
            Find something you love and make your next visit special.
          </p>
        </div>

        {/* Search */}
        <div className="upcoming-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search events by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="upcoming-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Event Count */}
        <div className="upcoming-results">
          <h3>Discover Experiences</h3>
          <span>{filteredEvents.length} Events Found</span>
        </div>

        {/* Event Cards */}
        <div className="upcoming-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <article className="upcoming-card" key={event.id}>

                <div className="upcoming-card-image">
                  <img src={event.image} alt={event.title} />
                  <span>{event.category}</span>
                </div>

                <div className="upcoming-card-content">

                  <div className="upcoming-card-top">
                    <div className="upcoming-card-icon">
                      {event.icon}
                    </div>
                    <span>#{event.id}</span>
                  </div>

                  <h3>{event.title}</h3>

                  <p className="upcoming-description">
                    {event.description}
                  </p>

                  <div className="upcoming-info">
                    <div>
                      <FaCalendarAlt />
                      <span>{event.date}</span>
                    </div>

                    <div>
                      <FaClock />
                      <span>{event.time}</span>
                    </div>

                    <div>
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>

                    <div>
                      <FaTicketAlt />
                      <span>{event.price}</span>
                    </div>
                  </div>

                  <Link
                    to={`/events/${event.id}`}
                    className="upcoming-details-btn"
                  >
                    VIEW DETAILS <FaArrowRight />
                  </Link>

                </div>
              </article>
            ))
          ) : (
            <div className="upcoming-empty">
              <FaSearch />
              <h3>No Events Found</h3>
              <p>Try another search or select a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All Events");
                }}
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="upcoming-bottom">
        <div>
          <span>MAKE YOUR MOMENTS SPECIAL</span>
          <h2>Great experiences are better together.</h2>
        </div>

        <Link to="/events/host">
          HOST YOUR EVENT <FaArrowRight />
        </Link>
      </div>

    </section>
  );
}

export default UpcomingEvents;
