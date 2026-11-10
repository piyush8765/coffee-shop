
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaPhoneAlt,
  FaCheckCircle,
  FaGlassCheers,
  FaCreditCard,
  FaClock,
  FaUsers,
  FaFileAlt,
  FaArrowRight,
  FaQuestionCircle,
  FaCoffee,
  FaTimesCircle,
  FaInfoCircle,
  FaHeadset,
  FaRegCalendarCheck,
} from "react-icons/fa";
import "./EventBookingGuide.css";

const bookingSteps = [
  {
    number: "01",
    icon: <FaClipboardList />,
    title: "Share Your Requirements",
    description:
      "Choose your event type, preferred date, guest count and tell us about your requirements.",
  },
  {
    number: "02",
    icon: <FaPhoneAlt />,
    title: "Discuss With Our Team",
    description:
      "Our team can contact you to discuss your event preferences and arrangements.",
  },
  {
    number: "03",
    icon: <FaFileAlt />,
    title: "Review Your Plan",
    description:
      "Discuss the event details, available arrangements and applicable pricing before confirming.",
  },
  {
    number: "04",
    icon: <FaCheckCircle />,
    title: "Confirm Your Booking",
    description:
      "Once the arrangements and terms are agreed upon, proceed with the booking confirmation.",
  },
];

const policies = [
  {
    icon: <FaCalendarAlt />,
    title: "Advance Planning",
    description:
      "Contact us in advance with your preferred event date so availability and arrangements can be discussed.",
  },
  {
    icon: <FaUsers />,
    title: "Guest Information",
    description:
      "Share an accurate estimate of your guests to help us understand your seating and service requirements.",
  },
  {
    icon: <FaClipboardList />,
    title: "Event Requirements",
    description:
      "Mention decoration, food, seating, music and any special arrangements during your enquiry.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Booking Confirmation",
    description:
      "Your event should be considered confirmed only after the final arrangements and confirmation are agreed upon.",
  },
];

const faqs = [
  {
    question: "How do I book an event at Coffee House?",
    answer:
      "Visit our Host an Event page and submit the enquiry form with your name, contact details, event type, preferred date and guest count. Our team can then discuss the arrangements with you.",
  },
  {
    question: "How far in advance should I enquire?",
    answer:
      "We recommend enquiring as early as possible, especially for larger gatherings and special occasions. Availability will need to be confirmed by our team.",
  },
  {
    question: "What types of events can I organize?",
    answer:
      "You can enquire about birthday parties, private celebrations, corporate gatherings, community meetups and other special occasions.",
  },
  {
    question: "Can I customize the event arrangements?",
    answer:
      "You can share your preferences for food, refreshments, seating, decorations and ambience. The final arrangements depend on availability and discussion with our team.",
  },
  {
    question: "How is the event booking price decided?",
    answer:
      "Pricing may depend on the event type, guest count, food requirements and requested arrangements. Contact our team for a quotation.",
  },
  {
    question: "Is advance payment required?",
    answer:
      "Payment requirements, if any, should be discussed with our team during the booking process. Please confirm the applicable terms before making a payment.",
  },
  {
    question: "Can I cancel or reschedule my event?",
    answer:
      "Please contact our team as early as possible if you need to cancel or reschedule. The applicable cancellation and rescheduling terms should be confirmed before booking.",
  },
  {
    question: "How can I contact the Coffee House team?",
    answer:
      "You can use the enquiry form on our Host an Event page or the contact section of our website to share your requirements.",
  },
];

function EventBookingGuide() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="booking-guide-page">

      {/* HERO SECTION */}
      <section className="booking-guide-hero">
        <div className="booking-guide-hero-content">
          <span className="booking-guide-eyebrow">
            <FaRegCalendarCheck /> YOUR EVENT JOURNEY STARTS HERE
          </span>

          <h1>
            Booking Made <span>Simple & Special.</span>
          </h1>

          <p>
            Planning a memorable gathering at Coffee House?
            Follow our simple booking guide and get ready to
            create beautiful moments with your favourite people.
          </p>

          <div className="booking-guide-hero-buttons">
            <Link to="/events/host" className="booking-guide-primary-btn">
              Start Your Booking <FaArrowRight />
            </Link>

            <a href="#booking-process" className="booking-guide-secondary-btn">
              Explore Booking Guide
            </a>
          </div>
        </div>

        <div className="booking-guide-hero-image">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200"
            alt="Beautiful event arrangement"
          />

          <div className="booking-guide-image-label">
            <FaCoffee />
            <div>
              <strong>Plan With Ease</strong>
              <span>Celebrate With Style</span>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING PROCESS */}
      <section className="booking-process-section" id="booking-process">
        <div className="booking-guide-heading">
          <span>FOUR SIMPLE STEPS</span>
          <h2>How Event <em>Booking Works.</em></h2>
          <p>
            From your first enquiry to the final confirmation,
            here's how to get started.
          </p>
        </div>

        <div className="booking-steps-grid">
          {bookingSteps.map((step, index) => (
            <article className="booking-step-card" key={step.number}>
              <div className="booking-step-top">
                <span className="booking-step-number">{step.number}</span>
                <div className="booking-step-icon">{step.icon}</div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              {index !== bookingSteps.length - 1 && (
                <span className="booking-step-arrow">
                  <FaArrowRight />
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="booking-how-section">
        <div className="booking-how-image">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000"
            alt="Coffee House interior and seating"
          />
        </div>

        <div className="booking-how-content">
          <span className="booking-guide-eyebrow">
            PLAN YOUR EXPERIENCE
          </span>

          <h2>
            Everything Begins With <em>Your Idea.</em>
          </h2>

          <p>
            Every event is different. Tell us what you have in mind,
            and our team can help you explore suitable arrangements
            for your gathering.
          </p>

          <div className="booking-how-list">
            <div>
              <FaCheckCircle />
              <span>Choose your preferred event type.</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Share your date and guest requirements.</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Discuss food, seating and decorations.</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Review the final arrangements before confirmation.</span>
            </div>
          </div>

          <Link to="/events/host" className="booking-how-btn">
            Send Event Enquiry <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* BOOKING POLICIES */}
      <section className="booking-policies-section">
        <div className="booking-guide-heading">
          <span>BEFORE YOU BOOK</span>
          <h2>Things To <em>Keep In Mind.</em></h2>
          <p>
            A few important points to help make your event planning smoother.
          </p>
        </div>

        <div className="booking-policies-grid">
          {policies.map((policy, index) => (
            <article className="booking-policy-card" key={index}>
              <div className="booking-policy-icon">{policy.icon}</div>
              <h3>{policy.title}</h3>
              <p>{policy.description}</p>
            </article>
          ))}
        </div>

        <div className="booking-policy-note">
          <FaInfoCircle />
          <p>
            Please confirm availability, final pricing and all applicable
            booking terms with our team before making your booking.
          </p>
        </div>
      </section>

      {/* PAYMENT AND CANCELLATION */}
      <section className="booking-payment-section">
        <div className="booking-payment-content">
          <span className="booking-guide-eyebrow">
            IMPORTANT BOOKING INFORMATION
          </span>

          <h2>
            Payment & <em>Cancellation.</em>
          </h2>

          <p>
            We want your event planning experience to be clear and
            comfortable. Discuss the payment and cancellation terms
            with our team before confirming your event.
          </p>

          <div className="booking-payment-item">
            <div className="booking-payment-icon">
              <FaCreditCard />
            </div>
            <div>
              <h3>Payment Information</h3>
              <p>
                Confirm the event quotation, payment method and any
                advance payment requirements with our team.
              </p>
            </div>
          </div>

          <div className="booking-payment-item">
            <div className="booking-payment-icon">
              <FaTimesCircle />
            </div>
            <div>
              <h3>Cancellation & Rescheduling</h3>
              <p>
                Ask about applicable cancellation and rescheduling
                terms before confirming your event.
              </p>
            </div>
          </div>

          <div className="booking-payment-item">
            <div className="booking-payment-icon">
              <FaClock />
            </div>
            <div>
              <h3>Timings & Arrangements</h3>
              <p>
                Confirm event duration, arrival time and any setup
                requirements with our team.
              </p>
            </div>
          </div>
        </div>

        <div className="booking-payment-image">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1000"
            alt="Freshly prepared coffee"
          />

          <div className="booking-payment-image-caption">
            <FaCoffee />
            <span>Every detail matters.</span>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="booking-faq-section">
        <div className="booking-guide-heading">
          <span>
            <FaQuestionCircle /> NEED MORE INFORMATION?
          </span>

          <h2>Frequently Asked <em>Questions.</em></h2>

          <p>
            Find answers to common questions about event bookings.
          </p>
        </div>

        <div className="booking-faq-list">
          {faqs.map((faq, index) => (
            <article
              className={`booking-faq-item ${
                openFaq === index ? "active" : ""
              }`}
              key={index}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
                aria-expanded={openFaq === index}
              >
                <span>{faq.question}</span>
                <strong>{openFaq === index ? "−" : "+"}</strong>
              </button>

              {openFaq === index && (
                <p>{faq.answer}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="booking-support-section">
        <div className="booking-support-icon">
          <FaHeadset />
        </div>

        <div>
          <span>STILL HAVE QUESTIONS?</span>
          <h2>We're Here To Help.</h2>
          <p>
            Share your event requirements and let our team guide you
            through the next steps.
          </p>
        </div>

        <Link to="/events/host">
          Contact Our Team <FaArrowRight />
        </Link>
      </section>

      {/* BOTTOM CTA */}
      <section className="booking-guide-bottom-cta">
        <div>
          <span>YOUR SPECIAL OCCASION AWAITS</span>
          <h2>Let's Make It Memorable.</h2>
          <p>
            Start planning your next celebration at Coffee House.
          </p>
        </div>

        <Link to="/events/host">
          Plan Your Event <FaArrowRight />
        </Link>
      </section>

    </main>
  );
}

export default EventBookingGuide;
