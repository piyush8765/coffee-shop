
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { getProducts } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./Menu.css";

// Coffee Images
import americanoImage from "../assets/americano.jpg";
import cappuccinoImage from "../assets/cappuccino.jpg";
import caramelImage from "../assets/caramel-macchiato.jpg";
import coldCoffeeImage from "../assets/cold-coffee.jpg";
import espressoImage from "../assets/espresso.jpg";
import frappeImage from "../assets/frappe.jpg";
import latteImage from "../assets/latte.jpg";
import mochaImage from "../assets/mocha.jpg";

const API_URL = "http://localhost:5000/api";

const productImages = {
  "americano.jpg": americanoImage,
  "cappuccino.jpg": cappuccinoImage,
  "caramel-macchiato.jpg": caramelImage,
  "cold-coffee.jpg": coldCoffeeImage,
  "espresso.jpg": espressoImage,
  "frappe.jpg": frappeImage,
  "latte.jpg": latteImage,
  "mocha.jpg": mochaImage,
};

const Menu = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [productReviews, setProductReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Review modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const sliderRef = useRef(null);
  const addFeedbackTimer = useRef(null);
const [addedProductId, setAddedProductId] = useState(null);

  
// Automatically close review modal after 2 seconds
useEffect(() => {
  if (!reviewSuccess) return;

  const timer = setTimeout(() => {
    setSelectedProduct(null);
    setReviewSuccess("");
  }, 2000);

  return () => clearTimeout(timer);
}, [reviewSuccess]);


  const { addToCart } = useCart();
  const handleAddToCart = (product) => {
  addToCart(product);

  setAddedProductId(product._id);

  if (addFeedbackTimer.current) {
    clearTimeout(addFeedbackTimer.current);
  }

  addFeedbackTimer.current = setTimeout(() => {
    setAddedProductId(null);
    addFeedbackTimer.current = null;
  }, 1200);
};

useEffect(() => {
  return () => {
    if (addFeedbackTimer.current) {
      clearTimeout(addFeedbackTimer.current);
    }
  };
}, []);
  const { token, isLoggedIn } = useAuth();
  // Handle category selection from Navbar dropdown
useEffect(() => {
  const requestedCategory = location.state?.menuCategory;

  if (!requestedCategory) return;

  setSelectedCategory(
    requestedCategory === "All Coffee" ? "All" : requestedCategory
  );

  const timer = setTimeout(() => {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);

  return () => clearTimeout(timer);
}, [location.key, location.state]);

  // Fetch products
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
          setError("");
        }
      } catch (err) {
        console.error("Menu API Error:", err);

        if (isMounted) {
          setError("Unable to load coffee menu. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch ratings and reviews for all products
  useEffect(() => {
    if (products.length === 0) return;

    let isMounted = true;

    const fetchAllReviews = async () => {
      try {
        const results = await Promise.all(
          products.map(async (product) => {
            try {
              const response = await axios.get(
                `${API_URL}/reviews/${product._id}`
              );

              return [
                product._id,
                {
                  averageRating: response.data.averageRating || 0,
                  totalReviews: response.data.totalReviews || 0,
                  reviews: response.data.reviews || [],
                },
              ];
            } catch (err) {
              console.error(
                `Review fetch failed for ${product.name}:`,
                err
              );

              return [
                product._id,
                {
                  averageRating: 0,
                  totalReviews: 0,
                  reviews: [],
                },
              ];
            }
          })
        );

        if (isMounted) {
          setProductReviews(Object.fromEntries(results));
        }
      } catch (err) {
        console.error("Reviews API Error:", err);
      }
    };

    fetchAllReviews();

    return () => {
      isMounted = false;
    };
  }, [products]);

  // Get product image
  const getImage = (imageName) => {
    return productImages[imageName] || null;
  };

  // Dynamic categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category?.trim())
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // Normalize category names
const normalizeCategory = (category) =>
  String(category || "")
    .toLowerCase()
    .replace(/\s*coffee\s*/g, "")
    .trim();

// Search and category filtering
const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      product.name?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      normalizeCategory(product.category) ===
        normalizeCategory(selectedCategory);

    return matchesSearch && matchesCategory;
  });
}, [products, searchTerm, selectedCategory]);

  // Slider controls
  const scrollMenu = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector(".menu-card");
    if (!card) return;

    const gap = 20;
    const amount = card.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  // Open review modal
  const openReviewModal = (product) => {
    setSelectedProduct(product);
    setReviewRating(5);
    setReviewComment("");
    setReviewError("");
    setReviewSuccess("");
  };

  // Close review modal
  const closeReviewModal = () => {
    if (reviewLoading) return;

    setSelectedProduct(null);
    setReviewError("");
    setReviewSuccess("");
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !token) {
      setReviewError("Please login to submit a review.");
      return;
    }

    if (!reviewComment.trim()) {
      setReviewError("Please write your review.");
      return;
    }

    try {
      setReviewLoading(true);
      setReviewError("");

      const response = await axios.post(
        `${API_URL}/reviews`,
        {
          productId: selectedProduct._id,
          rating: reviewRating,
          comment: reviewComment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setReviewSuccess("Your review has been submitted successfully!");

        // Refresh reviews for this product
        const updatedResponse = await axios.get(
          `${API_URL}/reviews/${selectedProduct._id}`
        );

        setProductReviews((previous) => ({
          ...previous,
          [selectedProduct._id]: {
            averageRating: updatedResponse.data.averageRating || 0,
            totalReviews: updatedResponse.data.totalReviews || 0,
            reviews: updatedResponse.data.reviews || [],
          },
        }));
      }
    } catch (err) {
      console.error("Review Submission Error:", err);

      setReviewError(
        err.response?.data?.message ||
          "Unable to submit review. Please try again."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <section className="menu-section" id="menu">
      {/* Section Heading */}
      <div className="menu-heading">
        <span className="menu-eyebrow">
          OUR SPECIAL COLLECTION
        </span>

        <h2>
          Discover Our <span>Coffee Menu</span>
        </h2>

        <p>
          From rich espresso to creamy cappuccino,
          discover your perfect cup of happiness.
        </p>
      </div>

      {loading && (
        <div className="menu-message">
          Preparing your coffee collection...
        </div>
      )}

      {!loading && error && (
        <div className="menu-message menu-error">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="menu-message">
          No coffee products available.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="menu-slider-wrapper">
          {/* Search */}
          <div className="menu-search-wrapper">
            <span className="menu-search-icon">⌕</span>

            <input
              type="text"
              className="menu-search-input"
              placeholder="Search your favourite coffee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                type="button"
                className="menu-search-clear"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="menu-category-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`menu-filter-btn ${
  normalizeCategory(selectedCategory) ===
  normalizeCategory(category)
    ? "active"
    : ""
}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Selected Category */}
<div className="menu-selected-category">
  <span className="selected-category-dot"></span>
  <span>
    Currently Exploring:{" "}
    <strong>
      {selectedCategory === "All" ? "All Coffee" : selectedCategory}
    </strong>
  </span>
</div>

          {/* Slider Header */}
          <div className="menu-slider-header">
            <span className="slider-label">
              EXPLORE OUR COFFEE
            </span>

            <div className="menu-arrows">
              <button
                type="button"
                className="menu-arrow"
                onClick={() => scrollMenu(-1)}
                aria-label="Previous coffee"
              >
                ‹
              </button>

              <button
                type="button"
                className="menu-arrow"
                onClick={() => scrollMenu(1)}
                aria-label="Next coffee"
              >
                ›
              </button>
            </div>
          </div>

          <p className="menu-result-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {filteredProducts.length === 0 ? (
            <div className="menu-message menu-no-results">
              <span>☕</span>
              <h3>No Coffee Found</h3>
              <p>
                Try another search or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Slider */}
              <div className="menu-slider" ref={sliderRef}>
                {filteredProducts.map((product) => {
                  const productImage = getImage(product.image);

                  const isAvailable =
                    product.isAvailable && product.stock > 0;

                  const ratingData = productReviews[product._id] || {
                    averageRating: 0,
                    totalReviews: 0,
                  };

                  return (
                    <article
  className={`menu-card ${
    addedProductId === product._id ? "added-to-cart" : ""
  }`}
  key={product._id}
>
                      <div className="menu-card-image">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product.name}
                            loading="lazy"
                          />
                        ) : (
                          <div className="image-placeholder">
                            ☕
                          </div>
                        )}

                        <span className="menu-category">
                          {product.category}
                        </span>

                        {!isAvailable && (
                          <span className="stock-label">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <div className="menu-card-content">
                        <div className="menu-card-info">
                          <h3>{product.name}</h3>

                          <span className="menu-price">
                            ₹{product.price}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="menu-product-rating">
                          <span className="rating-stars">
                            {ratingData.totalReviews > 0
                              ? "★".repeat(
                                  Math.round(ratingData.averageRating)
                                ) +
                                "☆".repeat(
                                  5 -
                                    Math.round(ratingData.averageRating)
                                )
                              : "☆☆☆☆☆"}
                          </span>

                          {ratingData.totalReviews > 0 ? (
                            <>
                              <span className="rating-value">
                                {ratingData.averageRating.toFixed(1)}
                              </span>

                              <span className="rating-count">
                                ({ratingData.totalReviews} reviews)
                              </span>
                            </>
                          ) : (
                            <span className="rating-count">
                              No reviews yet
                            </span>
                          )}
                        </div>

                        <p className="menu-description">
                          {product.description ||
                            "Freshly prepared with premium coffee beans."}
                        </p>

                       <button
  type="button"
  className={`menu-order-btn ${
    addedProductId === product._id ? "item-added" : ""
  }`}
  disabled={!isAvailable}
  onClick={() => handleAddToCart(product)}
>
  {!isAvailable
    ? "Unavailable"
    : addedProductId === product._id
    ? "✓ Added!"
    : "Add to Cart"}

  {isAvailable && addedProductId !== product._id && (
    <span>+</span>
  )}
</button>

                        <button
                          type="button"
                          className="menu-review-btn"
                          onClick={() => openReviewModal(product)}
                        >
                          Write a Review
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="menu-scroll-hint">
                <span className="scroll-line"></span>
                <span>USE ARROWS TO EXPLORE MORE</span>
                <span className="scroll-line"></span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Review Modal */}
      {selectedProduct && (
        <div
          className="review-modal-overlay"
          onClick={closeReviewModal}
        >
          <div
            className="review-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="review-modal-close"
              onClick={closeReviewModal}
              disabled={reviewLoading}
            >
              ×
            </button>

            <h3>Review {selectedProduct.name}</h3>

            <p className="review-modal-subtitle">
              Share your coffee experience with us.
            </p>

            {reviewSuccess ? (
              <div className="review-success-message">
                {reviewSuccess}
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <label className="review-rating-label">
                  Your Rating
                </label>

                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={star <= reviewRating ? "active" : ""}
                      onClick={() => setReviewRating(star)}
                      disabled={reviewLoading}
                      aria-label={`${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <label
                  className="review-rating-label"
                  htmlFor="review-comment"
                >
                  Your Review
                </label>

                <textarea
                  id="review-comment"
                  placeholder="Tell us what you think about this coffee..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  maxLength={1000}
                  required
                  disabled={reviewLoading}
                />

                <div className="review-character-count">
                  {reviewComment.length}/1000
                </div>

                {reviewError && (
                  <p className="checkout-error">
                    {reviewError}
                  </p>
                )}

                <button
                  type="submit"
                  className="review-submit-btn"
                  disabled={reviewLoading || !isLoggedIn}
                >
                  {reviewLoading
                    ? "Submitting..."
                    : "Submit Review"}
                </button>

                {!isLoggedIn && (
                  <p className="review-login-message">
                    Please login to submit a review.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
