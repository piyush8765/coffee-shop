
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/event-enquiries";

const AdminEventEnquiries = () => {
  const { token } = useAuth();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState("");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // FETCH ALL EVENT ENQUIRIES
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, authConfig);

      setEnquiries(response.data.enquiries || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Event enquiries load nahi ho payi."
      );
    } finally {
      setLoading(false);
    }
  };

  // UPDATE EVENT ENQUIRY STATUS
  const handleStatusUpdate = async (enquiryId, status) => {
    try {
      setUpdating(enquiryId);
      setError("");
      setMessage("");

      await axios.patch(
        `${API_URL}/${enquiryId}/status`,
        { status },
        authConfig
      );

      setMessage("Event enquiry status updated successfully!");

      await fetchEnquiries();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Status update nahi ho paya."
      );
    } finally {
      setUpdating("");
    }
  };

  // DELETE EVENT ENQUIRY
  const handleDeleteEnquiry = async (enquiryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event enquiry?"
    );

    if (!confirmDelete) return;

    try {
      setUpdating(enquiryId);
      setError("");
      setMessage("");

      await axios.delete(
        `${API_URL}/${enquiryId}`,
        authConfig
      );

      setMessage("Event enquiry deleted successfully!");

      await fetchEnquiries();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Event enquiry delete nahi ho payi."
      );
    } finally {
      setUpdating("");
    }
  };

  // FETCH ON LOGIN
  useEffect(() => {
    if (token) {
      fetchEnquiries();
    } else {
      setError("Please login as Admin.");
      setLoading(false);
    }
  }, [token]);

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-event-enquiries">
      <style>{`
        .admin-event-enquiries {
          min-height: 100vh;
          padding: 120px 5% 50px;
          background: #F5F0E1;
          color: #291914;
        }

        .event-enquiries-container {
          max-width: 1300px;
          margin: auto;
        }

        .event-enquiries-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .event-enquiries-header h1 {
          margin: 0 0 8px;
          font-size: 32px;
        }

        .event-enquiries-header p {
          color: #765B50;
          margin: 0;
        }

        .event-enquiry-count {
          background: #3F181C;
          color: white;
          padding: 12px 18px;
          border-radius: 8px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .event-enquiry-refresh {
          background: #EA8D15;
          color: #291914;
          border: none;
          padding: 12px 18px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
        }

        .event-enquiry-refresh:disabled {
          opacity: .6;
          cursor: wait;
        }

        .event-enquiries-table-wrapper {
          overflow-x: auto;
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(41,25,20,.07);
        }

        .event-enquiries-table {
          width: 100%;
          min-width: 1200px;
          border-collapse: collapse;
        }

        .event-enquiries-table th,
        .event-enquiries-table td {
          padding: 16px;
          text-align: left;
          vertical-align: top;
          border-bottom: 1px solid #eee8dc;
        }

        .event-enquiries-table th {
          background: #3F181C;
          color: white;
        }

        .event-enquiries-table td {
          color: #543c32;
        }

        .event-customer-name {
          font-weight: 700;
          color: #291914;
          margin-bottom: 6px;
        }

        .event-enquiry-small {
          font-size: 13px;
          color: #765B50;
          margin-top: 5px;
        }

        .event-enquiry-status-select {
          min-width: 125px;
          padding: 9px 12px;
          border: 1px solid #ded4c4;
          border-radius: 7px;
          background: white;
          color: #291914;
          font: inherit;
          cursor: pointer;
          text-transform: capitalize;
        }

        .event-enquiry-status-select:disabled {
          opacity: .6;
          cursor: wait;
        }

        .event-enquiry-delete-btn {
          background: #a52a2a;
          color: white;
          border: none;
          padding: 9px 14px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
          transition: .2s ease;
        }

        .event-enquiry-delete-btn:hover {
          background: #7d1d1d;
        }

        .event-enquiry-delete-btn:disabled {
          opacity: .6;
          cursor: wait;
        }

        .event-enquiry-message {
          padding: 12px 15px;
          border-radius: 7px;
          margin-bottom: 18px;
          background: #fbe5e5;
          color: #a52a2a;
        }

        .event-enquiry-success {
          background: #e4f4e5;
          color: #216b31;
        }

        .event-enquiry-empty {
          padding: 30px;
          text-align: center;
          color: #765B50;
        }

        @media(max-width: 650px) {
          .event-enquiries-header h1 {
            font-size: 26px;
          }

          .admin-event-enquiries {
            padding-left: 4%;
            padding-right: 4%;
          }
        }
      `}</style>

      <div className="event-enquiries-container">

        {/* HEADER */}
        <div className="event-enquiries-header">
          <div>
            <h1>Event Enquiries</h1>
            <p>
              Manage your coffee shop event booking enquiries.
            </p>
          </div>

          <div>
            <button
              className="event-enquiry-refresh"
              onClick={fetchEnquiries}
              disabled={loading}
            >
              {loading ? "Loading..." : "↻ Refresh Enquiries"}
            </button>
          </div>
        </div>

        {/* TOTAL ENQUIRIES */}
        <div className="event-enquiry-count">
          Total Enquiries: {enquiries.length}
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="event-enquiry-message event-enquiry-success">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="event-enquiry-message">
            {error}
          </div>
        )}

        {/* ENQUIRIES TABLE */}
        <div className="event-enquiries-table-wrapper">
          {loading ? (
            <div className="event-enquiry-empty">
              Loading event enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="event-enquiry-empty">
              No event enquiries found.
            </div>
          ) : (
            <table className="event-enquiries-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Event Type</th>
                  <th>Event Date</th>
                  <th>Event Time</th>
                  <th>Guests</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id}>

                    {/* CUSTOMER */}
                    <td>
                      <div className="event-customer-name">
                        {enquiry.name}
                      </div>

                      <div className="event-enquiry-small">
                        {enquiry.phone}
                      </div>

                      <div className="event-enquiry-small">
                        {enquiry.email}
                      </div>
                    </td>

                    {/* EVENT TYPE */}
                    <td>{enquiry.eventType}</td>

                    {/* EVENT DATE */}
                    <td>{formatDate(enquiry.eventDate)}</td>

                    {/* EVENT TIME */}
                    <td>{enquiry.eventTime}</td>

                    {/* GUESTS */}
                    <td>{enquiry.guests}</td>

                    {/* MESSAGE */}
                    <td>
                      {enquiry.message || "No message"}
                    </td>

                    {/* UPDATE STATUS */}
                    <td>
                      <select
                        className="event-enquiry-status-select"
                        value={enquiry.status}
                        disabled={updating === enquiry._id}
                        onChange={(e) =>
                          handleStatusUpdate(
                            enquiry._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      {updating === enquiry._id && (
                        <div className="event-enquiry-small">
                          Please wait...
                        </div>
                      )}
                    </td>

                    {/* SUBMITTED DATE */}
                    <td>{formatDate(enquiry.createdAt)}</td>

                    {/* DELETE ACTION */}
                    <td>
                      <button
                        className="event-enquiry-delete-btn"
                        onClick={() =>
                          handleDeleteEnquiry(enquiry._id)
                        }
                        disabled={updating === enquiry._id}
                      >
                        {updating === enquiry._id
                          ? "Please wait..."
                          : "Delete"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventEnquiries;
