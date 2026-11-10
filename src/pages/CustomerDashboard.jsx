import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api";

const STATUS_STEPS = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "completed",
];

const STATUS_LABELS = {
  pending: "Order Placed",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};

const CustomerDashboard = () => {
  const { user, token, updateUser } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Edit Profile States
  const [editMode, setEditMode] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  // Change Password States
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // My Reviews States
const [reviews, setReviews] = useState([]);
const [reviewsLoading, setReviewsLoading] = useState(true);
const [reviewsError, setReviewsError] = useState("");
const [reviewMessage, setReviewMessage] = useState("");
const [deletingReviewId, setDeletingReviewId] = useState(null);

  // Fetch Orders
  const fetchOrders = useCallback(async (isRefresh = false) => {
    if (!token) {
      setError("Please login to view your dashboard.");
      setLoading(false);
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await axios.get(
        `${API_URL}/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Customer Orders Error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load your orders."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Edit Profile
  const handleEdit = () => {
    setProfileName(user?.name || "");
    setProfilePhone(user?.phone || "");
    setProfileMessage("");
    setProfileError("");
    setEditMode(true);
  };

  // Cancel Editing
  const handleCancel = () => {
    setProfileName(user?.name || "");
    setProfilePhone(user?.phone || "");
    setProfileMessage("");
    setProfileError("");
    setEditMode(false);
  };

  // Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!profileName.trim()) {
      setProfileError("Name cannot be empty.");
      return;
    }

    if (!token) {
      setProfileError("Please login again.");
      return;
    }

    try {
      setSaving(true);
      setProfileError("");
      setProfileMessage("");

      const response = await axios.put(
        `${API_URL}/users/profile`,
        {
          name: profileName.trim(),
          phone: profilePhone.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateUser(response.data.user);
      setProfileName(response.data.user.name);
      setProfilePhone(response.data.user.phone || "");
      setEditMode(false);
      setProfileMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile Update Error:", err);

      setProfileError(
        err.response?.data?.message ||
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setPasswordMessage("");

    if (!token) {
      setPasswordError("Please login again.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      setPasswordSaving(true);

      const response = await axios.put(
        `${API_URL}/users/change-password`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPasswordMessage(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordError(
        err.response?.data?.message ||
        "Unable to change password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };
  // Delete Customer's Own Review
const handleDeleteReview = async (reviewId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this review?"
  );

  if (!confirmed) return;

  try {
    setDeletingReviewId(reviewId);
    setReviewsError("");
    setReviewMessage("");

    const response = await axios.delete(
      `${API_URL}/reviews/my-reviews/${reviewId}`,
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

    setReviewMessage(response.data.message);
  } catch (err) {
    setReviewsError(
      err.response?.data?.message ||
      "Unable to delete review."
    );
  } finally {
    setDeletingReviewId(null);
  }
};
// Fetch Customer Reviews
const fetchMyReviews = useCallback(async () => {
  if (!token) {
    setReviewsLoading(false);
    return;
  }

  try {
    setReviewsLoading(true);
    setReviewsError("");

    const response = await axios.get(
      `${API_URL}/reviews/my-reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReviews(response.data.reviews || []);
  } catch (err) {
    setReviewsError(
      err.response?.data?.message ||
      "Unable to load your reviews."
    );
  } finally {
    setReviewsLoading(false);
  }
}, [token]);

// Load Reviews
useEffect(() => {
  fetchMyReviews();
}, [fetchMyReviews]);
  // Dashboard Statistics
  const totalSpent = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce(
      (total, order) =>
        total + (Number(order.totalAmount) || 0),
      0
    );

  const pendingOrders = orders.filter(
    (order) =>
      ["pending", "confirmed", "preparing", "ready"].includes(
        order.orderStatus
      )
  ).length;

  const cardStyle = {
    background: "#FFFFFF",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  };

  // Status Colors
  const statusColor = (status) => {
    if (status === "paid") return "#15803D";
    if (status === "failed") return "#DC2626";
    if (status === "cancelled") return "#DC2626";
    if (status === "completed") return "#15803D";
    return "#EA8D15";
  };

  // Order Progress Tracker
  const renderProgress = (status) => {
    if (status === "cancelled") {
      return (
        <p style={{ color: "#DC2626", fontWeight: "bold" }}>
          This order has been cancelled.
        </p>
      );
    }

    const currentStep = STATUS_STEPS.indexOf(status);

    return (
      <div style={{ marginTop: "22px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "5px",
          }}
        >
          {STATUS_STEPS.map((step, index) => {
            const completed = index <= currentStep;

            return (
              <div key={step} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: completed ? "#EA8D15" : "#E5DED0",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <small
                  style={{
                    color: completed ? "#3F181C" : "#888",
                    fontSize: "11px",
                    fontWeight: completed ? "bold" : "normal",
                    display: "block",
                    overflowWrap: "anywhere",
                  }}
                >
                  {STATUS_LABELS[step]}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section
      style={{
        background: "#F5F0E1",
        minHeight: "100vh",
        padding: "110px 6% 60px",
        fontFamily: "Lora, serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              color: "#3F181C",
              fontFamily: "Playfair Display, serif",
              fontSize: "36px",
              marginBottom: "12px",
            }}
          >
            My Dashboard
          </h1>

          <p style={{ color: "#291914" }}>
            Welcome back, {user?.name || "Coffee Lover"}!
          </p>
        </div>

        <button
          onClick={() => fetchOrders(true)}
          disabled={refreshing}
          style={{
            background: "#3F181C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            cursor: refreshing ? "not-allowed" : "pointer",
            opacity: refreshing ? 0.7 : 1,
          }}
        >
          {refreshing ? "Refreshing..." : "↻ Refresh Orders"}
        </button>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <h2 style={{ color: "#EA8D15" }}>
            {orders.length}
          </h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Paid</h3>
          <h2 style={{ color: "#EA8D15" }}>
            ₹{totalSpent.toLocaleString("en-IN")}
          </h2>
        </div>

        <div style={cardStyle}>
          <h3>Active Orders</h3>
          <h2 style={{ color: "#EA8D15" }}>
            {pendingOrders}
          </h2>
        </div>
      </div>

      {/* My Profile */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#3F181C", margin: 0 }}>
            My Profile
          </h2>

          {!editMode && (
            <button
              onClick={handleEdit}
              style={{
                background: "#3F181C",
                color: "#FFFFFF",
                border: "none",
                padding: "11px 20px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              ✎ Edit Profile
            </button>
          )}
        </div>

        {editMode ? (
          <form
            onSubmit={handleSaveProfile}
            style={{ maxWidth: "500px" }}
          >
            <label style={{ display: "block", fontWeight: "bold" }}>
              Name
            </label>

            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0 18px",
                border: "1px solid #D8CDBB",
                borderRadius: "7px",
                boxSizing: "border-box",
                fontFamily: "Lora, serif",
              }}
            />

            <label style={{ display: "block", fontWeight: "bold" }}>
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0 18px",
                border: "1px solid #D8CDBB",
                borderRadius: "7px",
                background: "#F1F1F1",
                boxSizing: "border-box",
                fontFamily: "Lora, serif",
              }}
            />

            <label style={{ display: "block", fontWeight: "bold" }}>
              Phone Number
            </label>

            <input
              type="tel"
              value={profilePhone}
              onChange={(e) => setProfilePhone(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0 18px",
                border: "1px solid #D8CDBB",
                borderRadius: "7px",
                boxSizing: "border-box",
                fontFamily: "Lora, serif",
              }}
            />

            {profileError && (
              <p style={{ color: "#DC2626", marginBottom: "15px" }}>
                {profileError}
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: "#EA8D15",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "7px",
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                style={{
                  background: "#3F181C",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "7px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
  <div className="brewora-profile">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        padding: "20px",
        borderRadius: "14px",
        background: "#FBF6ED",
        border: "1px solid #E9DCC9",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#3F181C",
          color: "#F4C078",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
          fontWeight: "bold",
          border: "3px solid #EA8D15",
          flexShrink: 0,
        }}
      >
        {(user?.name || "C").charAt(0).toUpperCase()}
      </div>

      <div>
        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "Playfair Display, serif",
            color: "#3F181C",
            fontSize: "25px",
          }}
        >
          {user?.name || "Coffee Lover"}
        </h3>

        <span
          style={{
            display: "inline-block",
            background: "#3F181C",
            color: "#F4C078",
            padding: "7px 15px",
            borderRadius: "30px",
            fontSize: "13px",
          }}
        >
          ☕ Coffee House Member
        </span>
      </div>
    </div>

    <h3 style={{ color: "#3F181C", marginBottom: "18px" }}>
      Personal Information
    </h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
      }}
    >
      {[
        ["Full Name", user?.name || "Not available"],
        ["Email Address", user?.email || "Not available"],
        ["Mobile Number", user?.phone || "Not added"],
        [
          "Member ID",
          user?._id ? user._id.slice(-8).toUpperCase() : "Not available",
        ],
        [
          "Member Since",
          user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Not available",
        ],
      ].map(([label, value]) => (
        <div
          key={label}
          style={{
            background: "#FFFFFF",
            border: "1px solid #E9DCC9",
            borderRadius: "12px",
            padding: "18px",
            minWidth: 0,
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              color: "#8B7064",
              fontSize: "13px",
            }}
          >
            {label}
          </p>

          <strong
            style={{
              color: "#3F181C",
              fontSize: "15px",
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </strong>
        </div>
      ))}
    </div>
  </div>
)}
        {profileMessage && (
          <p style={{ color: "#15803D", marginTop: "15px" }}>
            {profileMessage}
          </p>
        )}
      </div>

      {/* Security - Change Password */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h2 style={{ color: "#3F181C", marginBottom: "8px" }}>
              Security
            </h2>

            <p style={{ color: "#777", margin: 0 }}>
              Keep your account secure by updating your password.
            </p>
          </div>

          {!showPasswordForm && (
            <button
              type="button"
              onClick={() => {
                setPasswordError("");
                setPasswordMessage("");
                setShowPasswordForm(true);
              }}
              style={{
                background: "#3F181C",
                color: "#FFFFFF",
                border: "none",
                padding: "11px 20px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Change Password
            </button>
          )}
        </div>

        {passwordMessage && (
          <p style={{ color: "#15803D", marginTop: "16px" }}>
            {passwordMessage}
          </p>
        )}

        {passwordError && (
          <p style={{ color: "#DC2626", marginTop: "16px" }}>
            {passwordError}
          </p>
        )}

        {showPasswordForm && (
          <form
            onSubmit={handleChangePassword}
            style={{
              marginTop: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              maxWidth: "500px",
            }}
          >
            <div>
              <label style={{ display: "block", fontWeight: "bold" }}>
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  border: "1px solid #D8CDBB",
                  borderRadius: "7px",
                  boxSizing: "border-box",
                  fontFamily: "Lora, serif",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "bold" }}>
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={6}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  border: "1px solid #D8CDBB",
                  borderRadius: "7px",
                  boxSizing: "border-box",
                  fontFamily: "Lora, serif",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "bold" }}>
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={6}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  border: "1px solid #D8CDBB",
                  borderRadius: "7px",
                  boxSizing: "border-box",
                  fontFamily: "Lora, serif",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={passwordSaving}
                style={{
                  background: "#EA8D15",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "7px",
                  cursor: passwordSaving ? "not-allowed" : "pointer",
                  opacity: passwordSaving ? 0.7 : 1,
                }}
              >
                {passwordSaving ? "Updating..." : "Update Password"}
              </button>

              <button
                type="button"
                disabled={passwordSaving}
                onClick={() => {
                  setShowPasswordForm(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setPasswordError("");
                  setPasswordMessage("");
                }}
                style={{
                  background: "#E5DED0",
                  color: "#291914",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "7px",
                  cursor: passwordSaving ? "not-allowed" : "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
{/* My Reviews */}
<div
  style={{
    ...cardStyle,
    marginBottom: "30px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "20px",
    }}
  >
    <div>
      <h2 style={{ color: "#3F181C", marginBottom: "8px" }}>
        My Reviews
      </h2>
      <p style={{ color: "#777", margin: 0 }}>
        Manage your coffee product reviews.
      </p>
    </div>

    <button
      onClick={fetchMyReviews}
      disabled={reviewsLoading}
      style={{
        background: "#3F181C",
        color: "#FFFFFF",
        border: "none",
        padding: "11px 18px",
        borderRadius: "7px",
        cursor: "pointer",
      }}
    >
      {reviewsLoading ? "Loading..." : "↻ Refresh Reviews"}
    </button>
  </div>

  <p style={{ color: "#765B50" }}>
    Total Reviews: <strong>{reviews.length}</strong>
  </p>

  {reviewMessage && (
    <p style={{ color: "#15803D" }}>{reviewMessage}</p>
  )}

  {reviewsError && (
    <p style={{ color: "#DC2626" }}>{reviewsError}</p>
  )}

  {reviewsLoading ? (
    <p>Loading your reviews...</p>
  ) : reviews.length === 0 ? (
    <div
      style={{
        background: "#F5F0E1",
        padding: "30px 15px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "#3F181C" }}>No Reviews Yet ☕</h3>
      <p style={{ color: "#765B50" }}>
        You haven't submitted any product reviews yet.
      </p>
    </div>
  ) : (
    <div style={{ display: "grid", gap: "16px" }}>
      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            border: "1px solid #E5DED0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h3 style={{ color: "#3F181C", marginTop: 0 }}>
                {review.product?.name || "Product Unavailable"}
              </h3>

              {review.product?.price != null && (
                <p style={{ color: "#765B50" }}>
                  ₹{review.product.price}
                </p>
              )}
            </div>

            <span
              style={{
                background: review.isApproved
                  ? "#E5F5E9"
                  : "#FFF0DC",
                color: review.isApproved
                  ? "#26733B"
                  : "#A45B00",
                padding: "7px 13px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {review.isApproved ? "Approved" : "Hidden"}
            </span>
          </div>

          <div
            style={{
              color: "#EA8D15",
              fontSize: "22px",
              margin: "10px 0",
            }}
          >
            {"★".repeat(review.rating)}
            <span style={{ color: "#D8D0C4" }}>
              {"★".repeat(5 - review.rating)}
            </span>
            <span
              style={{
                color: "#765B50",
                fontSize: "13px",
                marginLeft: "8px",
              }}
            >
              ({review.rating}/5)
            </span>
          </div>

          <p style={{ color: "#4D3931", lineHeight: 1.6 }}>
            "{review.comment}"
          </p>

          <small style={{ color: "#927E73" }}>
            Submitted:{" "}
            {new Date(review.createdAt).toLocaleDateString("en-IN")}
          </small>

          <div style={{ marginTop: "16px" }}>
            <button
              onClick={() => handleDeleteReview(review._id)}
              disabled={deletingReviewId === review._id}
              style={{
                background: "#B3261E",
                color: "#FFFFFF",
                border: "none",
                padding: "11px 20px",
                borderRadius: "7px",
                cursor: "pointer",
                opacity:
                  deletingReviewId === review._id ? 0.6 : 1,
              }}
            >
              {deletingReviewId === review._id
                ? "Deleting..."
                : "Delete My Review"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      {/* Orders */}
      <div style={cardStyle}>
        <h2
          style={{
            color: "#3F181C",
            marginBottom: "20px",
          }}
        >
          My Orders
        </h2>

        {loading ? (
          <p>Loading your orders...</p>
        ) : error ? (
          <p style={{ color: "#DC2626" }}>{error}</p>
        ) : orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {orders.map((order) => {
              const isExpanded = expandedOrder === order._id;

              return (
                <div
                  key={order._id}
                  style={{
                    border: "1px solid #E5DED0",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  {/* Order Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <h3 style={{ color: "#3F181C" }}>
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>

                      <small style={{ color: "#777" }}>
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                      </small>
                    </div>

                    <div>
                      <h3 style={{ color: "#EA8D15" }}>
                        ₹{order.totalAmount}
                      </h3>

                      <span
                        style={{
                          color: statusColor(order.paymentStatus),
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        Payment: {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div style={{ marginTop: "20px" }}>
                    <strong style={{ color: "#3F181C" }}>
                      Order Status:{" "}
                    </strong>

                    <span
                      style={{
                        color: statusColor(order.orderStatus),
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {STATUS_LABELS[order.orderStatus] ||
                        order.orderStatus}
                    </span>
                  </div>

                  {/* Progress Tracker */}
                  {renderProgress(order.orderStatus)}

                  {/* View Details */}
                  <button
                    onClick={() =>
                      setExpandedOrder(
                        isExpanded ? null : order._id
                      )
                    }
                    style={{
                      marginTop: "22px",
                      background: "#3F181C",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "11px 20px",
                      borderRadius: "7px",
                      cursor: "pointer",
                    }}
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: "20px",
                        paddingTop: "20px",
                        borderTop: "1px solid #E5DED0",
                      }}
                    >
                      <h3 style={{ color: "#3F181C" }}>
                        Ordered Items
                      </h3>

                      {order.items?.length > 0 ? (
                        order.items.map((item, index) => (
                          <div
                            key={item._id || index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "12px",
                              padding: "12px 0",
                              borderBottom: "1px solid #EEE7D8",
                            }}
                          >
                            <div>
                              <strong>{item.name}</strong>

                              <p style={{ color: "#777", margin: "5px 0" }}>
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <strong>
                              ₹{item.price * item.quantity}
                            </strong>
                          </div>
                        ))
                      ) : (
                        <p>No item details available.</p>
                      )}

                      <div style={{ marginTop: "18px" }}>
                        <p>
                          <strong>Order Type:</strong>{" "}
                          {order.orderType}
                        </p>

                        <p>
                          <strong>Payment Status:</strong>{" "}
                          {order.paymentStatus}
                        </p>

                        {order.orderType === "delivery" &&
                          order.deliveryAddress && (
                            <p>
                              <strong>Delivery Address:</strong>{" "}
                              {[
                                order.deliveryAddress.address,
                                order.deliveryAddress.city,
                                order.deliveryAddress.pincode,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerDashboard;