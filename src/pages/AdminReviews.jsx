
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api";

const AdminReviews = () => {
  const { token } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [actionId, setActionId] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/admin/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(response.data.reviews || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Reviews load nahi ho paye."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchReviews();
    } else {
      setError("Please login as Admin.");
      setLoading(false);
    }
  }, [token]);

  const handleToggleStatus = async (review) => {
    try {
      setActionId(review._id);
      setMessage("");
      setError("");

      const newStatus = !review.isApproved;

      const response = await axios.put(
        `${API_URL}/admin/reviews/${review._id}/status`,
        { isApproved: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((previousReviews) =>
        previousReviews.map((item) =>
          item._id === review._id
            ? { ...item, isApproved: newStatus }
            : item
        )
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Review status update nahi hua."
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this review?"
    );

    if (!confirmed) return;

    try {
      setActionId(reviewId);
      setMessage("");
      setError("");

      const response = await axios.delete(
        `${API_URL}/admin/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((previousReviews) =>
        previousReviews.filter(
          (review) => review._id !== reviewId
        )
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Review delete nahi hua."
      );
    } finally {
      setActionId(null);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const approvedCount = reviews.filter(
    (review) => review.isApproved
  ).length;

  const hiddenCount = reviews.length - approvedCount;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Review Management</h1>
            <p style={styles.subtitle}>
              Manage customer feedback and product ratings.
            </p>
          </div>

          <button
            style={styles.refreshButton}
            onClick={fetchReviews}
            disabled={loading}
          >
            ↻ Refresh
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>💬</span>
            <p>Total Reviews</p>
            <h2>{reviews.length}</h2>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statIcon}>⭐</span>
            <p>Average Rating</p>
            <h2>{averageRating}/5</h2>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statIcon}>✅</span>
            <p>Approved Reviews</p>
            <h2>{approvedCount}</h2>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statIcon}>🙈</span>
            <p>Hidden Reviews</p>
            <h2>{hiddenCount}</h2>
          </div>
        </div>

        <div style={styles.listHeader}>
          <h2>Customer Reviews</h2>
          <span>{reviews.length} Reviews</span>
        </div>

        {loading ? (
          <p style={styles.centerText}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div style={styles.empty}>
            <span style={{ fontSize: "45px" }}>☕</span>
            <h3>No Reviews Found</h3>
            <p>Customer reviews will appear here.</p>
          </div>
        ) : (
          <div style={styles.reviewList}>
            {reviews.map((review) => (
              <div key={review._id} style={styles.reviewCard}>
                <div style={styles.reviewTop}>
                  <div>
                    <h3 style={styles.customerName}>
                      {review.user?.name || "Unknown Customer"}
                    </h3>

                    <p style={styles.email}>
                      {review.user?.email || "No email"}
                    </p>
                  </div>

                  <span
                    style={{
                      ...styles.badge,
                      background: review.isApproved
                        ? "#E5F5E9"
                        : "#FFF0DC",
                      color: review.isApproved
                        ? "#26733B"
                        : "#A45B00",
                    }}
                  >
                    {review.isApproved ? "Approved" : "Hidden"}
                  </span>
                </div>

                <div style={styles.productBox}>
                  {review.product?.image && (
                    <img
                      src={
                        review.product.image.startsWith("http")
                          ? review.product.image
                          : `/images/${review.product.image}`
                      }
                      alt={review.product?.name || "Product"}
                      style={styles.productImage}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}

                  <div>
                    <strong>
                      {review.product?.name || "Product Deleted"}
                    </strong>
                    {review.product?.price != null && (
                      <p style={styles.productPrice}>
                        ₹{review.product.price}
                      </p>
                    )}
                  </div>
                </div>

                <div style={styles.rating}>
                  {"★".repeat(review.rating)}
                  <span style={styles.emptyStars}>
                    {"★".repeat(5 - review.rating)}
                  </span>
                  <span style={styles.ratingNumber}>
                    ({review.rating}/5)
                  </span>
                </div>

                <p style={styles.comment}>
                  "{review.comment}"
                </p>

                <p style={styles.date}>
                  {new Date(review.createdAt).toLocaleString()}
                </p>

                <div style={styles.actions}>
                  <button
                    style={{
                      ...styles.statusButton,
                      background: review.isApproved
                        ? "#EA8D15"
                        : "#2E7D32",
                    }}
                    onClick={() => handleToggleStatus(review)}
                    disabled={actionId === review._id}
                  >
                    {actionId === review._id
                      ? "Please wait..."
                      : review.isApproved
                      ? "Hide Review"
                      : "Approve Review"}
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(review._id)}
                    disabled={actionId === review._id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F5F0E1",
    padding: "120px 5% 50px",
    color: "#291914",
  },
  container: {
    maxWidth: "1200px",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "32px",
    margin: "0 0 8px",
  },
  subtitle: {
    color: "#765B50",
    margin: 0,
  },
  refreshButton: {
    padding: "12px 20px",
    background: "#3F181C",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "18px",
    marginBottom: "35px",
  },
  statCard: {
    background: "#fff",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(41,25,20,0.07)",
  },
  statIcon: {
    fontSize: "27px",
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  reviewList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  reviewCard: {
    background: "#fff",
    padding: "23px",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(41,25,20,0.07)",
  },
  reviewTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
  },
  customerName: {
    margin: "0 0 5px",
    fontSize: "18px",
  },
  email: {
    color: "#765B50",
    fontSize: "13px",
    margin: 0,
    wordBreak: "break-word",
  },
  badge: {
    padding: "6px 11px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },
  productBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px",
    marginTop: "18px",
    background: "#F9F6EE",
    borderRadius: "10px",
  },
  productImage: {
    width: "55px",
    height: "55px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  productPrice: {
    color: "#765B50",
    margin: "5px 0 0",
    fontSize: "13px",
  },
  rating: {
    color: "#EA8D15",
    fontSize: "21px",
    marginTop: "16px",
    letterSpacing: "2px",
  },
  emptyStars: {
    color: "#D8D0C4",
  },
  ratingNumber: {
    color: "#765B50",
    fontSize: "12px",
    letterSpacing: 0,
    marginLeft: "8px",
  },
  comment: {
    lineHeight: 1.6,
    color: "#4D3931",
    margin: "12px 0",
    wordBreak: "break-word",
  },
  date: {
    color: "#927E73",
    fontSize: "12px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  },
  statusButton: {
    flex: 1,
    minWidth: "130px",
    padding: "11px",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },
  deleteButton: {
    padding: "11px 18px",
    background: "#B3261E",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },
  centerText: {
    textAlign: "center",
    padding: "50px",
  },
  empty: {
    textAlign: "center",
    background: "#fff",
    padding: "55px 20px",
    borderRadius: "14px",
  },
  error: {
    background: "#FCE8E6",
    color: "#B3261E",
    padding: "13px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  success: {
    background: "#E5F5E9",
    color: "#26733B",
    padding: "13px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
};

export default AdminReviews;
