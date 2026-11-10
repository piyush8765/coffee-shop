
import React, { useState } from "react";
import axios from "axios";
import {
  FaBirthdayCake,
  FaBriefcase,
  FaUsers,
  FaGlassCheers,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCoffee,
  FaUtensils,
  FaMusic,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import "./HostEvent.css";

const eventTypes = [
  {
    title: "Birthday Parties",
    description: "Celebrate your special day with coffee, cake and great memories.",
    icon: <FaBirthdayCake />,
  },
  {
    title: "Corporate Events",
    description: "Host team meetings, business gatherings and networking events.",
    icon: <FaBriefcase />,
  },
  {
    title: "Private Parties",
    description: "Enjoy exclusive moments with your friends and loved ones.",
    icon: <FaGlassCheers />,
  },
  {
    title: "Community Meetups",
    description: "Bring people together for conversations and shared interests.",
    icon: <FaUsers />,
  },
];

const benefits = [
  {
    icon: <FaCoffee />,
    title: "Perfect Coffee Experience",
    description: "Enjoy freshly brewed coffee and a welcoming cafe atmosphere.",
  },
  {
    icon: <FaUtensils />,
    title: "Food & Refreshments",
    description: "Delicious food and refreshments for your guests.",
  },
  {
    icon: <FaMusic />,
    title: "Custom Ambience",
    description: "Create the right atmosphere for your special occasion.",
  },
  {
    icon: <FaUsers />,
    title: "Friendly Team",
    description: "Our team will help you plan your event smoothly.",
  },
];

const faqs = [
  {
    question: "What types of events can I host?",
    answer:
      "You can enquire about birthdays, private parties, corporate meetings, community meetups and special celebrations.",
  },
  {
    question: "How can I book the venue?",
    answer:
      "Submit the event enquiry form with your preferred date and requirements. Our team can contact you to discuss availability.",
  },
  {
    question: "Can I customize the event arrangements?",
    answer:
      "Yes, you can share your decoration, food, seating and other requirements in the enquiry form.",
  },
  {
    question: "How much does hosting an event cost?",
    answer:
      "Pricing depends on the event type, guest count and arrangements. Contact our team for a quotation.",
  },
];

function HostEvent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    guests: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const response = await axios.post(
      "http://localhost:5000/api/event-enquiries",
      formData
    );

    if (response.data.success) {
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        eventTime: "",
        guests: "",
        message: "",
      });
    }
  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Unable to submit enquiry. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="host-event-page">

      {/* HERO SECTION */}
      <section className="host-hero">
        <div className="host-hero-content">
          <span className="host-eyebrow">
            <FaGlassCheers /> YOUR EVENT, OUR SPACE
          </span>

          <h1>
            Make Every Occasion <span>Extra Special.</span>
          </h1>

          <p>
            From intimate birthdays to corporate gatherings, create
            unforgettable experiences in the warm atmosphere of Coffee House.
          </p>

          <a href="#host-enquiry" className="host-primary-btn">
            Plan Your Event <FaArrowRight />
          </a>
        </div>

        <div className="host-hero-image">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200"
            alt="Beautifully arranged celebration event"
          />

          <div className="host-image-label">
            <FaStar />
            <div>
              <strong>Special Moments</strong>
              <span>Made memorable together</span>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="host-types-section">
        <div className="host-section-heading">
          <span>CELEBRATE YOUR WAY</span>
          <h2>What Would You Like <em>To Host?</em></h2>
          <p>
            Whatever the occasion, we have a welcoming space for your gathering.
          </p>
        </div>

        <div className="host-types-grid">
          {eventTypes.map((event, index) => (
            <div className="host-type-card" key={index}>
              <div className="host-type-icon">{event.icon}</div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <a href="#host-enquiry">
                Enquire Now <FaArrowRight />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="host-benefits-section">
        <div className="host-benefits-image">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000"
            alt="Coffee House interior"
          />
        </div>

        <div className="host-benefits-content">
          <span className="host-eyebrow">THE COFFEE HOUSE EXPERIENCE</span>

          <h2>
            Your Occasion Deserves a <em>Beautiful Setting.</em>
          </h2>

          <p>
            A comfortable atmosphere, delicious refreshments and thoughtful
            arrangements make every gathering more enjoyable.
          </p>

          <div className="host-benefits-grid">
            {benefits.map((benefit, index) => (
              <div className="host-benefit-item" key={index}>
                <div>{benefit.icon}</div>
                <section>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </section>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="host-enquiry-section" id="host-enquiry">
        <div className="host-enquiry-heading">
          <span>LET'S PLAN SOMETHING SPECIAL</span>
          <h2>Tell Us About Your <em>Event.</em></h2>
          <p>
            Share your requirements with us. Our team can get in touch
            to discuss your event.
          </p>
        </div>

        <div className="host-form-layout">
          <div className="host-form-info">
            <span className="host-eyebrow">START YOUR CELEBRATION</span>
            <h3>Let's Make It Memorable.</h3>
            <p>
              Tell us a little about your event, and we'll help you explore
              the arrangements for your special occasion.
            </p>

            <div className="host-contact-detail">
              <FaCalendarAlt />
              <div>
                <strong>Choose Your Date</strong>
                <span>Tell us when you would like to celebrate.</span>
              </div>
            </div>

            <div className="host-contact-detail">
              <FaUsers />
              <div>
                <strong>Guest Information</strong>
                <span>Let us know how many guests to expect.</span>
              </div>
            </div>

            <div className="host-contact-detail">
              <FaMapMarkerAlt />
              <div>
                <strong>Our Venue</strong>
                <span>Coffee House</span>
              </div>
            </div>

            <div className="host-form-note">
              <FaCheckCircle />
              <span>Share your requirements for a personalized enquiry.</span>
            </div>
          </div>

          <div className="host-form-card">
            {submitted ? (
              <div className="host-success-message">
                <FaCheckCircle />
                <h3>Enquiry Details Ready!</h3>
                <p>
                  Your event enquiry has been submitted successfully.
                  Our team will contact you soon.
                </p>
                <button onClick={() => setSubmitted(false)}>
                  Edit Your Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Event Enquiry Form</h3>
                <p>Fill in the details below to get started.</p>

                <div className="host-form-grid">
                  <div className="host-input-group">
                    <label><FaUser /> Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="host-input-group">
                    <label><FaEnvelope /> Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="host-input-group">
                    <label><FaPhone /> Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="host-input-group">
                    <label><FaGlassCheers /> Event Type *</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select event type</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Private Party">Private Party</option>
                      <option value="Community Meetup">Community Meetup</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="host-input-group">
                    <label><FaCalendarAlt /> Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="host-input-group">
                    <label><FaClock /> Preferred Time *</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="host-input-group host-full-width">
                    <label><FaUsers /> Expected Number of Guests *</label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      placeholder="e.g. 30"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="host-input-group host-full-width">
                    <label>Tell Us More About Your Event</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Share decoration, food, seating or any special requirements..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
  type="submit"
  className="host-submit-btn"
  disabled={loading}
>
  {loading ? "Submitting..." : "Submit Enquiry"}
  {!loading && <FaArrowRight />}
</button>

{error && (
  <p className="host-form-error" role="alert">
    {error}
  </p>
)}

                <small className="host-form-disclaimer">
                  * Required fields
                </small>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="host-faq-section">
        <div className="host-section-heading">
          <span>HAVE QUESTIONS?</span>
          <h2>Frequently Asked <em>Questions.</em></h2>
          <p>Some useful information before planning your event.</p>
        </div>

        <div className="host-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`host-faq-item ${openFaq === index ? "active" : ""}`}
              key={index}
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
                aria-expanded={openFaq === index}
              >
                {faq.question}
                <span>{openFaq === index ? "−" : "+"}</span>
              </button>

              {openFaq === index && (
                <p>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="host-bottom-cta">
        <div>
          <span>YOUR NEXT SPECIAL MOMENT STARTS HERE</span>
          <h2>Let's Celebrate Together.</h2>
          <p>
            Bring your ideas, and let's create an experience worth remembering.
          </p>
        </div>

        <a href="#host-enquiry">
          Plan Your Event <FaArrowRight />
        </a>
      </section>

    </main>
  );
}

export default HostEvent;
