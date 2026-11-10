
import { Link, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaMusic,
  FaMugHot,
  FaUsers,
  FaGlassCheers,
} from "react-icons/fa";

import "./EventDetails.css";

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
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=85",
    icon: <FaMusic />,
    longDescription:
      "Experience beautiful live acoustic performances in a warm and welcoming cafe atmosphere. Enjoy your favourite coffee, connect with friends and make unforgettable memories.",
    includes: [
      "Live acoustic music performances",
      "Relaxing cafe atmosphere",
      "Great coffee and refreshments available",
      "A memorable evening with friends",
    ],
  },
  {
    id: "02",
    title: "Coffee Brewing Workshop",
    category: "Workshops",
    date: "Every Sunday",
    time: "11:00 AM - 1:00 PM",
    location: "Coffee House",
    price: "₹499 / Person",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=85",
    icon: <FaMugHot />,
    description:
      "Discover the art of brewing coffee and learn how to create your perfect cup with our experts.",
    longDescription:
      "Learn the art and science of coffee brewing with our experienced coffee experts. Explore brewing techniques, understand coffee flavours and prepare your own perfect cup.",
    includes: [
      "Introduction to coffee brewing",
      "Hands-on brewing experience",
      "Guidance from coffee experts",
      "Coffee tasting session",
    ],
  },
  {
    id: "03",
    title: "Weekend Coffee Meetup",
    category: "Meetups",
    date: "Every Weekend",
    time: "4:00 PM - 7:00 PM",
    location: "Coffee House",
    price: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=85",
    icon: <FaUsers />,
    description:
      "Meet new people, share conversations and make memorable moments over your favourite coffee.",
    longDescription:
      "A friendly gathering for coffee lovers, creators and curious minds. Meet new people, exchange ideas and enjoy meaningful conversations over a delicious cup of coffee.",
    includes: [
      "Friendly community gathering",
      "Networking opportunities",
      "Coffee and conversations",
      "A welcoming environment",
    ],
  },
  {
    id: "04",
    title: "Coffee & Celebration Evening",
    category: "Special Events",
    date: "Special Occasions",
    time: "5:00 PM - 8:00 PM",
    location: "Coffee House",
    price: "₹299 / Person",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85",
    icon: <FaGlassCheers />,
    description:
      "Celebrate special moments with delicious coffee, great food and a beautiful cafe atmosphere.",
    longDescription:
      "Celebrate life's special moments with a beautiful cafe experience. Whether it is a birthday, celebration or a get-together, make your occasion memorable with us.",
    includes: [
      "Beautiful celebration atmosphere",
      "Special coffee and refreshments available",
      "Perfect for friends and family",
      "Memorable celebration experience",
    ],
  },
];

function EventDetails() {
 const { eventId } = useParams();
const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <section className="event-not-found">
        <h2>Event Not Found</h2>
        <p>Sorry, this event does not exist.</p>
        <Link to="/events/upcoming">
          <FaArrowLeft /> Back to Events
        </Link>
      </section>
    );
  }

  const relatedEvents = events.filter(
    (item) => item.id !== event.id
  ).slice(0, 3);

  return (
    <section className="event-details-page">

      <div className="event-details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/events/upcoming">Events</Link>
        <span>/</span>
        <span>{event.title}</span>
      </div>

      <div className="event-details-hero">

        <div className="event-details-image">
          <img src={event.image} alt={event.title} />
          <span className="event-details-category">
            {event.category}
          </span>
        </div>

        <div className="event-details-intro">
          <span className="event-details-eyebrow">
            EXPERIENCE SOMETHING SPECIAL
          </span>

          <h1>{event.title}</h1>

          <p>{event.longDescription}</p>

          <div className="event-details-meta">
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
          </div>

          <div className="event-details-price">
            <div>
              <span>EVENT PRICE</span>
              <h2>{event.price}</h2>
            </div>

            <a href="/#contact" className="event-booking-btn">
              ENQUIRE NOW <FaArrowRight />
            </a>
          </div>
        </div>

      </div>

      <div className="event-details-content">

        <div className="event-about">
          <span className="event-details-eyebrow">
            ABOUT THE EXPERIENCE
          </span>

          <h2>Make Every Moment <em>Special.</em></h2>

          <p>{event.longDescription}</p>

          <div className="event-includes">
            <h3>What's Included</h3>

            {event.includes.map((item, index) => (
              <div key={index}>
                <FaCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="event-booking-card">
          <div className="event-booking-icon">
            {event.icon}
          </div>

          <span>YOUR NEXT EXPERIENCE</span>
          <h3>Join Us for Something Special.</h3>

          <div className="event-booking-info">
            <p><FaCalendarAlt /> {event.date}</p>
            <p><FaClock /> {event.time}</p>
            <p><FaMapMarkerAlt /> {event.location}</p>
            <p><FaTicketAlt /> {event.price}</p>
          </div>

          <a href="/#contact" className="event-booking-btn">
            ENQUIRE NOW <FaArrowRight />
          </a>

          <small>Contact our team for event availability and booking.</small>
        </aside>

      </div>

      <div className="related-events">

        <div className="related-events-heading">
          <span className="event-details-eyebrow">
            KEEP EXPLORING
          </span>
          <h2>Related <em>Experiences.</em></h2>
        </div>

        <div className="related-events-grid">
          {relatedEvents.map((item) => (
            <Link
              to={`/events/${item.id}`}
              className="related-event-card"
              key={item.id}
            >
              <img src={item.image} alt={item.title} />

              <div>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>Explore Event <FaArrowRight /></p>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/events/upcoming" className="back-events-link">
          <FaArrowLeft /> EXPLORE ALL EVENTS
        </Link>

      </div>

    </section>
  );
}

export default EventDetails;
