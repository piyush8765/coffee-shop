
import "./Testimonials.css";

const reviews = [
  {
    text: "The coffee here is exceptional. Every cup feels carefully crafted, and the atmosphere makes you want to stay longer.",
    name: "Aarav Sharma",
    role: "Regular Customer",
    rating: "★★★★★",
  },
  {
    text: "One of the best places to enjoy a peaceful morning. Their cappuccino is absolutely worth coming back for.",
    name: "Priya Verma",
    role: "Coffee Lover",
    rating: "★★★★★",
  },
  {
    text: "Beautiful interiors, friendly people and amazing coffee. This place has quickly become my favourite cafe.",
    name: "Rahul Mehta",
    role: "Cafe Explorer",
    rating: "★★★★★",
  },
];

function Testimonials() {
  return (
    <section className="testimonials" id="reviews">

      <div className="testimonial-heading">
        <span className="testimonial-label">WHAT PEOPLE SAY</span>

        <h2>
          More Than Coffee,
          <br />
          <em>It's an Experience.</em>
        </h2>

        <p>
          Good coffee brings people together.
          Here's what our customers have to say.
        </p>
      </div>

      <div className="review-layout">

        <div className="review-feature">
          <span className="quote-mark">“</span>

          <div className="review-feature-content">
            <h3 className="review-feature-title">
              Every visit feels like coming home.
            </h3>

            <p>
              We believe the little moments matter.
              A warm cup, a familiar face and a place
              where everyone belongs.
            </p>
          </div>

          <div className="review-footer">
            <span>OUR COFFEE COMMUNITY</span>
            <span>01 / 03</span>
          </div>
        </div>

        <div className="review-list">
          {reviews.map((review, index) => (
            <article className="review-item" key={review.name}>

              <div className="review-top">
                <span className="review-stars">{review.rating}</span>
                <span className="review-number">0{index + 1}</span>
              </div>

              <p className="review-text">
                "{review.text}"
              </p>

              <div className="review-author">
                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h4>{review.name}</h4>
                  <small>{review.role}</small>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
