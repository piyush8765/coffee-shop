
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/admin/orders";

const AdminOrders = () => {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState("");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // FETCH ALL ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, authConfig);

      setOrders(response.data.orders || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Orders load nahi ho paye."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setError("Please login as Admin.");
      setLoading(false);
    }
  }, [token]);

  // UPDATE ORDER STATUS
  const handleOrderStatus = async (orderId, orderStatus) => {
    try {
      setUpdating(`${orderId}-order`);
      setError("");
      setMessage("");

      await axios.put(
        `${API_URL}/${orderId}/status`,
        { orderStatus },
        authConfig
      );

      setMessage("Order status updated successfully!");

      await fetchOrders();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Order status update nahi ho paya."
      );
    } finally {
      setUpdating("");
    }
  };

  // UPDATE PAYMENT STATUS
  const handlePaymentStatus = async (orderId, paymentStatus) => {
    try {
      setUpdating(`${orderId}-payment`);
      setError("");
      setMessage("");

      await axios.put(
        `${API_URL}/${orderId}/payment`,
        { paymentStatus },
        authConfig
      );

      setMessage("Payment status updated successfully!");

      await fetchOrders();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Payment status update nahi ho paya."
      );
    } finally {
      setUpdating("");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="admin-orders">
      <style>{`
        .admin-orders {
          min-height: 100vh;
          padding: 120px 5% 50px;
          background: #F5F0E1;
          color: #291914;
        }

        .admin-orders-container {
          max-width: 1300px;
          margin: auto;
        }

        .admin-orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .admin-orders-header h1 {
          margin: 0 0 8px;
          font-size: 32px;
        }

        .admin-orders-header p {
          color: #765B50;
          margin: 0;
        }

        .admin-order-count {
          background: #3F181C;
          color: white;
          padding: 12px 18px;
          border-radius: 8px;
          font-weight: 600;
        }

        .admin-refresh-btn {
          background: #EA8D15;
          color: #291914;
          border: none;
          padding: 12px 18px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
        }

        .admin-orders-table-wrapper {
          overflow-x: auto;
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(41,25,20,.07);
        }

        .admin-orders-table {
          width: 100%;
          min-width: 1150px;
          border-collapse: collapse;
        }

        .admin-orders-table th,
        .admin-orders-table td {
          padding: 16px;
          text-align: left;
          vertical-align: top;
          border-bottom: 1px solid #eee8dc;
        }

        .admin-orders-table th {
          background: #3F181C;
          color: white;
        }

        .admin-orders-table td {
          color: #543c32;
        }

        .admin-order-customer {
          font-weight: 700;
          color: #291914;
          margin-bottom: 6px;
        }

        .admin-order-small {
          font-size: 13px;
          color: #765B50;
          margin-top: 5px;
        }

        .admin-order-items {
          min-width: 170px;
        }

        .admin-order-item {
          margin-bottom: 7px;
          font-size: 14px;
        }

        .admin-order-total {
          font-weight: 700;
          color: #291914;
          white-space: nowrap;
        }

        .admin-order-select {
          width: 145px;
          padding: 9px;
          border: 1px solid #ded4c4;
          border-radius: 7px;
          background: white;
          color: #291914;
          font: inherit;
          cursor: pointer;
        }

        .admin-order-select:disabled {
          opacity: .6;
          cursor: wait;
        }

        .admin-message {
          padding: 12px 15px;
          border-radius: 7px;
          margin-bottom: 18px;
          background: #e4f4e5;
          color: #216b31;
        }

        .admin-error {
          background: #fbe5e5;
          color: #a52a2a;
        }

        .admin-empty {
          padding: 30px;
          text-align: center;
          color: #765B50;
        }

        @media(max-width: 650px) {
          .admin-orders-header h1 {
            font-size: 26px;
          }

          .admin-orders {
            padding-left: 4%;
            padding-right: 4%;
          }
        }
      `}</style>

      <div className="admin-orders-container">

        {/* Header */}
        <div className="admin-orders-header">
          <div>
            <h1>Order Management</h1>
            <p>Manage your coffee shop customer orders.</p>
          </div>

          <div>
            <button
              className="admin-refresh-btn"
              onClick={fetchOrders}
              disabled={loading}
            >
              {loading ? "Loading..." : "↻ Refresh Orders"}
            </button>
          </div>
        </div>

        {message && (
          <div className="admin-message">{message}</div>
        )}

        {error && (
          <div className="admin-message admin-error">
            {error}
          </div>
        )}

        {/* Orders Table */}
        <div className="admin-orders-table-wrapper">

          {loading ? (
            <div className="admin-empty">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="admin-empty">
              No orders found.
            </div>
          ) : (
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Order Type</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>

                    {/* Order ID */}
                    <td>
                      <strong>
                        #{order._id.slice(-6).toUpperCase()}
                      </strong>
                    </td>

                    {/* Customer */}
                    <td>
                      <div className="admin-order-customer">
                        {order.customer?.name}
                      </div>

                      <div className="admin-order-small">
                        {order.customer?.phone}
                      </div>

                      <div className="admin-order-small">
                        {order.customer?.email}
                      </div>

                      {order.orderType === "delivery" && (
                        <div className="admin-order-small">
                          {order.deliveryAddress?.address},
                          {" "}{order.deliveryAddress?.city}
                          {" "}{order.deliveryAddress?.pincode}
                        </div>
                      )}
                    </td>

                    {/* Items */}
                    <td>
                      <div className="admin-order-items">
                        {order.items?.map((item, index) => (
                          <div
                            key={`${item.product}-${index}`}
                            className="admin-order-item"
                          >
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Order Type */}
                    <td>
                      {order.orderType === "delivery"
                        ? "Delivery"
                        : "Pickup"}
                    </td>

                    {/* Total */}
                    <td>
                      <span className="admin-order-total">
                        ₹{order.totalAmount}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <div className="admin-order-small">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>

                    {/* Order Status */}
                    <td>
                      <select
                        className="admin-order-select"
                        value={order.orderStatus}
                        disabled={
                          updating === `${order._id}-order`
                        }
                        onChange={(e) =>
                          handleOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Payment Status */}
                    <td>
                      <select
                        className="admin-order-select"
                        value={order.paymentStatus}
                        disabled={
                          updating === `${order._id}-payment`
                        }
                        onChange={(e) =>
                          handlePaymentStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                      </select>
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

export default AdminOrders;
