
import "./CoffeeGallery.css";

const galleryImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900",
    title: "Perfect Morning",
    category: "COFFEE MOMENTS",
    className: "gallery-large",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700",
    title: "Art in Every Cup",
    category: "OUR COFFEE",
    className: "",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
    title: "Freshly Brewed",
    category: "FRESH FLAVOURS",
    className: "",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=700",
    title: "Cafe Atmosphere",
    category: "OUR SPACE",
    className: "",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900",
    title: "Coffee & Conversations",
    category: "CAFE STORIES",
    className: "gallery-wide",
  },
];

function CoffeeGallery() {
  return (
    <section className="coffee-gallery" id="gallery">
      <div className="gallery-container">

        {/* Heading */}
        <div className="gallery-heading">
          <span className="gallery-label">
            A GLIMPSE INTO OUR WORLD
          </span>

          <h2>
            Moments Brewed
            <br />
            <em>With Love.</em>
          </h2>

          <p>
            Every cup has a story. Explore the little moments,
            beautiful spaces and coffee creations that make
            our cafe special.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {galleryImages.map((item) => (
            <div
              className={`gallery-item ${item.className}`}
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="gallery-overlay">
                <div>
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>

                <span className="gallery-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="gallery-bottom">
          <p>
            <span>GOOD COFFEE.</span> GOOD PEOPLE. BEAUTIFUL MOMENTS.
          </p>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="gallery-instagram"
          >
            FOLLOW OUR JOURNEY
            <span>↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default CoffeeGallery;
