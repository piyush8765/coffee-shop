
import "./Events.css";
import { Link } from "react-router-dom";

import {
  FaMusic,
  FaMugHot,
  FaUsers,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaCoffee,
  FaGlassCheers,
  FaMicrophone,
  FaStar,
} from "react-icons/fa";

const categories = [
  { icon: <FaMusic />, name: "Live Music", count: "Every Saturday" },
  { icon: <FaMugHot />, name: "Coffee Workshops", count: "Learn & Explore" },
  { icon: <FaUsers />, name: "Community Meetups", count: "Meet & Connect" },
  { icon: <FaGlassCheers />, name: "Special Events", count: "Celebrate Together" },
];

const events = [
  {
    id: "01",
    category: "LIVE ENTERTAINMENT",
    title: "Live Music Nights",
    description:
      "Enjoy soulful acoustic music, delicious coffee and beautiful evenings with your favourite people.",
    date: "Every Saturday",
    time: "6:00 PM - 9:00 PM",
    location: "Coffee House",
    price: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=85",
    icon: <FaMusic />,
  },
  {
    id: "02",
    category: "LEARN & EXPLORE",
    title: "Coffee Brewing Workshop",
    description:
      "Discover the art of brewing coffee and learn how to create your perfect cup with our experts.",
    date: "Every Sunday",
    time: "11:00 AM - 1:00 PM",
    location: "Coffee House",
    price: "₹499 / Person",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85",
    icon: <FaMugHot />,
  },
  {
    id: "03",
    category: "COMMUNITY",
    title: "Weekend Coffee Meetup",
    description:
      "Meet new people, share conversations and make memorable moments over your favourite coffee.",
    date: "Every Weekend",
    time: "4:00 PM - 7:00 PM",
    location: "Coffee House",
    price: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=85",
    icon: <FaUsers />,
  },
];

const pastEvents = [
  {
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700&q=85",
    title: "Acoustic Music Evening",
  },
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=85",
    title: "Coffee Tasting Session",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85",
    title: "Community Gathering",
  },
];

const faqs = [
  {
    question: "How can I book an event?",
    answer:
      "Choose your favourite event and contact our team to know about availability and booking details.",
  },
  {
    question: "Do I need to book in advance?",
    answer:
      "Advance booking is recommended, especially for workshops and special events with limited seats.",
  },
  {
    question: "Can I host my own event at the cafe?",
    answer:
      "Yes! You can contact our team to discuss hosting birthdays, private gatherings and other special occasions.",
  },
  {
    question: "Are all events paid?",
    answer:
      "No. Some events are free to attend, while selected workshops and special experiences may have an entry fee.",
  },
];

function Events() {
  return (
    <section className="cafe-events" id="events">
      <div className="events-container">

        {/* Events Hero */}
        <div className="events-hero">
          <div className="events-hero-content">
            <span className="events-eyebrow">
              <FaStar /> MORE THAN JUST A CAFE
            </span>

            <h2>
              Moments Worth
              <br />
              <em>Coming Together For.</em>
            </h2>

            <p>
              Great coffee, good music and wonderful people.
              Discover experiences, meet new faces and create
              beautiful memories at our cafe.
            </p>

            <div className="events-hero-actions">
              <Link
                to="/events/upcoming"
                className="events-primary-btn"
              >
                EXPLORE EVENTS <FaArrowRight />
              </Link>

              <Link
                to="/events/host"
                className="events-secondary-btn"
              >
                HOST AN EVENT
              </Link>
            </div>
          </div>

          <div className="events-hero-image">
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&q=85"
              alt="Friends enjoying an event at a cafe"
            />

            <div className="events-image-note">
              <FaMugHot />
              <div>
                <strong>Good Coffee. Good Company.</strong>
                <span>Make every moment special</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Categories */}
        <div className="events-categories">
          <div className="events-section-heading">
            <span>EXPLORE EXPERIENCES</span>
            <h2>
              Something for <em>Everyone.</em>
            </h2>
          </div>

          <div className="events-category-grid">
            {categories.map((category) => (
              <Link
                to="/events/upcoming"
                className="events-category-card"
                key={category.name}
              >
                <div className="events-category-icon">
                  {category.icon}
                </div>

                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events" id="upcoming-events">
          <div className="events-section-heading">
            <span>MARK YOUR CALENDAR</span>
            <h2>
              Upcoming <em>Events.</em>
            </h2>
            <p>
              Find your next favourite experience and join us
              for something special.
            </p>
          </div>

          <div className="events-grid">
            {events.map((event) => (
              <article className="event-card" key={event.id}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <span className="event-image-category">
                    {event.category}
                  </span>
                </div>

                <div className="event-card-content">
                  <div className="event-card-top">
                    <div className="event-icon">{event.icon}</div>
                    <span className="event-number">{event.id}</span>
                  </div>

                  <h3>{event.title}</h3>

                  <p className="event-description">
                    {event.description}
                  </p>

                  <div className="event-details">
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
                    className="event-link"
                  >
                    VIEW DETAILS <FaArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="events-more-link">
            <Link
              to="/events/upcoming"
              className="events-primary-btn"
            >
              VIEW ALL UPCOMING EVENTS <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Booking Process */}
        <div className="events-booking">
          <div className="events-section-heading">
            <span>YOUR EXPERIENCE STARTS HERE</span>
            <h2>
              How It <em>Works.</em>
            </h2>
          </div>

          <div className="events-booking-grid">
            <div className="booking-step">
              <span>01</span>
              <FaCalendarAlt />
              <h3>Choose an Event</h3>
              <p>
                Explore our upcoming events and find your favourite experience.
              </p>
            </div>

            <div className="booking-step">
              <span>02</span>
              <FaTicketAlt />
              <h3>Contact & Book</h3>
              <p>
                Get in touch with our team to check availability and reserve your spot.
              </p>
            </div>

            <div className="booking-step">
              <span>03</span>
              <FaCoffee />
              <h3>Enjoy the Moment</h3>
              <p>
                Show up, relax, enjoy great coffee and make wonderful memories.
              </p>
            </div>
          </div>

          <div className="events-more-link">
            <Link
              to="/events/booking-guide"
              className="events-primary-btn"
            >
              VIEW BOOKING GUIDE <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Past Events Gallery */}
        <div className="past-events">
          <div className="events-section-heading">
            <span>MEMORIES WE MADE</span>
            <h2>
              Moments from <em>Our Cafe.</em>
            </h2>
          </div>

          <div className="past-events-grid">
            {pastEvents.map((event) => (
              <Link
                to="/events/gallery"
                className="past-event-card"
                key={event.title}
              >
                <img src={event.image} alt={event.title} />

                <div className="past-event-overlay">
                  <span>{event.title}</span>
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>

          <div className="events-more-link">
            <Link
              to="/events/gallery"
              className="events-primary-btn"
            >
              VIEW ALL MEMORIES <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Host an Event */}
        <div className="host-event" id="host-event">
          <div className="host-event-content">
            <span>MAKE IT YOUR OCCASION</span>

            <h2>
              Your Event.
              <br />
              <em>Our Perfect Space.</em>
            </h2>

            <p>
              Planning a birthday, private gathering or a special
              celebration? Let us make it memorable with great coffee,
              delicious food and a beautiful atmosphere.
            </p>

            <Link
              to="/events/host"
              className="events-primary-btn"
            >
              LET'S PLAN TOGETHER <FaArrowRight />
            </Link>
          </div>

          <div className="host-event-image">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85"
              alt="A beautifully arranged private celebration"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="events-faq">
          <div className="events-section-heading">
            <span>GOT QUESTIONS?</span>
            <h2>
              Frequently Asked <em>Questions.</em>
            </h2>
          </div>

          <div className="events-faq-list">
            {faqs.map((faq, index) => (
              <details className="events-faq-item" key={index}>
                <summary>
                  {faq.question}
                  <span>+</span>
                </summary>

                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="events-more-link">
            <Link
              to="/events/booking-guide"
              className="events-primary-btn"
            >
              VIEW BOOKING GUIDE & ALL FAQs <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="events-bottom">
          <div>
            <span>GOOD TIMES START HERE</span>
            <h3>Make your next coffee moment special.</h3>
          </div>

          <Link
            to="/events/booking-guide"
            className="events-cta"
          >
            BOOKING GUIDE <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Events;
