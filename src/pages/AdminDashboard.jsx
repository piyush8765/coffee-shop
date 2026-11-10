
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data.stats);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Dashboard data load nahi ho paya."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    } else {
      setError("Please login as Admin.");
      setLoading(false);
    }
  }, [token]);

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "☕",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: "🛍️",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: "👥",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: "⏳",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: "💰",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F0E1",
        padding: "120px 5% 50px",
        color: "#291914",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          Admin Dashboard
        </h1>

        <p style={{ color: "#765B50", marginBottom: "30px" }}>
          Welcome back! Here's your coffee shop overview.
        </p>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            {/* Dashboard Statistics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "20px",
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: "#FFFFFF",
                    padding: "25px",
                    borderRadius: "14px",
                    boxShadow: "0 4px 15px rgba(41,25,20,0.08)",
                  }}
                >
                  <div style={{ fontSize: "30px" }}>
                    {card.icon}
                  </div>

                  <p
                    style={{
                      color: "#765B50",
                      marginBottom: "8px",
                    }}
                  >
                    {card.title}
                  </p>

                  <h2 style={{ fontSize: "28px", margin: 0 }}>
                    {card.value}
                  </h2>
                </div>
              ))}
            </div>

            {/* Store Overview */}
            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                background: "#FFFFFF",
                borderRadius: "14px",
              }}
            >
              <h2>Store Overview</h2>

              <p>
                Your admin dashboard is connected to the backend
                and MongoDB database.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "25px",
                }}
              >
                {/* Manage Products */}
                <button
                  onClick={() => navigate("/admin/products")}
                  style={{
                    background: "#3F181C",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "16px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Manage Products →
                </button>

                {/* Manage Orders */}
                <button
                  onClick={() => navigate("/admin/orders")}
                  style={{
                    background: "#EA8D15",
                    color: "#291914",
                    border: "none",
                    padding: "16px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Manage Orders →
                </button>

                {/* Manage Reviews */}
                <button
                  onClick={() => navigate("/admin/reviews")}
                  style={{
                    background: "#765B50",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "16px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Manage Reviews →
                </button>

                {/* Manage Event Enquiries */}
                <button
                  onClick={() =>
                    navigate("/admin/event-enquiries")
                  }
                  style={{
                    background: "#3F181C",
                    color: "#FFFFFF",
                    border: "2px solid #EA8D15",
                    padding: "16px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Manage Event Enquiries →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
