
import "./WhyChooseUs.css";
import {
  FaCoffee,
  FaLeaf,
  FaHeart,
  FaMugHot,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCoffee />,
    number: "01",
    title: "Premium Quality",
    description:
      "We use carefully selected coffee beans to deliver rich flavour and exceptional quality in every cup.",
  },
  {
    icon: <FaLeaf />,
    number: "02",
    title: "Fresh Ingredients",
    description:
      "Freshly sourced ingredients and quality milk make every sip delicious, smooth and memorable.",
  },
  {
    icon: <FaMugHot />,
    number: "03",
    title: "Expertly Crafted",
    description:
      "Every drink is prepared with passion, precision and attention to all the little details.",
  },
  {
    icon: <FaHeart />,
    number: "04",
    title: "Cozy Atmosphere",
    description:
      "A welcoming space to relax, catch up with friends, work or simply enjoy your favourite coffee.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-choose" id="why-us">

      <div className="why-container">

        {/* Section Heading */}
        <div className="why-heading">
          <span className="why-label">WHY CHOOSE US</span>

          <h2>
            Not Just Coffee.
            <br />
            <em>It's Our Passion.</em>
          </h2>

          <p>
            From the first aroma to the last sip, we make
            every coffee moment special.
          </p>
        </div>

        {/* Features */}
        <div className="why-grid">

          {features.map((feature) => (
            <article className="why-card" key={feature.number}>

              <div className="why-card-top">
                <span className="why-icon">
                  {feature.icon}
                </span>

                <span className="why-number">
                  {feature.number}
                </span>
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <div className="why-card-line"></div>

            </article>
          ))}

        </div>

        {/* Bottom Message */}
        <div className="why-bottom">
          <div className="why-bottom-text">
            <span>MADE WITH LOVE, SERVED WITH PASSION</span>
            <h3>Your perfect coffee moment is waiting.</h3>
          </div>

          <a href="#menu" className="why-button">
            EXPLORE OUR MENU
            <span>↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
