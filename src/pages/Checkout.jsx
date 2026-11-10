
import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/productApi";
import "./Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faMoneyBillWave,
  faCreditCard,
  faPenToSquare,
  faCartShopping,
  faTruckFast,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/api";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, cartTotal, removeFromCart } = useCart();

  const handleBack = () => {
    navigate("/cart");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const [orderType, setOrderType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successOrder, setSuccessOrder] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setShowReview(true);
  };

  const clearCart = () => {
    cartItems.forEach((item) => {
      removeFromCart(item._id);
    });
  };

  const getOrderData = () => ({
    customer: {
      name: formData.name.trim(),
      phone: formData.phone,
      email: formData.email,
    },
    orderType,
    deliveryAddress:
      orderType === "delivery"
        ? {
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,
          }
        : {},
    items: cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),
  });

  // CASH ON DELIVERY
  const handleCOD = async (orderData) => {
    const response = await createOrder(orderData);

    if (!response.success) {
      throw new Error(response.message || "Order could not be placed");
    }

    setSuccessOrder(response.order);
    clearCart();
  };

  // RAZORPAY ONLINE PAYMENT
  const handleRazorpay = async (orderData) => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      throw new Error("Razorpay could not be loaded. Please try again.");
    }

    // Create payment order on backend
    const paymentResponse = await axios.post(
      `${API_URL}/razorpay/create-order`,
      orderData
    );

    const { order, keyId } = paymentResponse.data;

    if (!order?.id || !keyId) {
      throw new Error("Unable to initialize payment.");
    }

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Coffee Shop",
      description: "Coffee Order Payment",
      order_id: order.id,

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#3F181C",
      },

      handler: async (paymentResult) => {
        try {
          const verifyResponse = await axios.post(
            `${API_URL}/razorpay/verify-payment`,
            {
              razorpay_order_id: paymentResult.razorpay_order_id,
              razorpay_payment_id: paymentResult.razorpay_payment_id,
              razorpay_signature: paymentResult.razorpay_signature,
            }
          );

          if (!verifyResponse.data.success || !verifyResponse.data.order) {
            throw new Error("Payment verification failed.");
          }

          setSuccessOrder(verifyResponse.data.order);
          clearCart();
        } catch (err) {
          console.error("Payment Verification Error:", err);

          setError(
            err.response?.data?.message ||
              err.message ||
              "Payment verification failed. Please contact the shop."
          );
        } finally {
          setLoading(false);
        }
      },

      modal: {
        ondismiss: () => {
          setLoading(false);
          setError("Payment was cancelled. You can try again.");
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);

    razorpayInstance.on("payment.failed", (response) => {
      setLoading(false);
      setError(
        response.error?.description || "Payment failed. Please try again."
      );
    });

    razorpayInstance.open();
  };

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const orderData = getOrderData();

      if (paymentMethod === "cod") {
        await handleCOD(orderData);
      } else {
        await handleRazorpay(orderData);
      }
    } catch (err) {
      console.error("Order Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ORDER SUCCESS SCREEN
  if (successOrder) {
    return (
      <section className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>

          <h2>Order Placed Successfully!</h2>

          <p>
            Thank you, {successOrder.customer.name}.
            Your coffee order has been received.
          </p>

          <div className="success-order-details">
            <p>
              <strong>Order ID:</strong> {successOrder._id}
            </p>

            <p>
              <strong>Order Type:</strong>{" "}
              {successOrder.orderType === "delivery"
                ? "Home Delivery"
                : "Store Pickup"}
            </p>

            <p>
              <strong>Order Status:</strong> {successOrder.orderStatus}
            </p>

            <p>
              <strong>Payment Method:</strong>{" "}
              {successOrder.paymentMethod === "razorpay"
                ? "Online Payment"
                : "Cash on Delivery"}
            </p>

            <p>
              <strong>Payment Status:</strong> {successOrder.paymentStatus}
            </p>

            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{Number(successOrder.totalAmount).toFixed(2)}
            </p>
          </div>

            <button className="checkout-continue-btn" onClick={handleContinueShopping}>            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty!</h2>
          <button onClick={handleBack}>Back to Shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <span>ALMOST THERE</span>
          <h2>Checkout</h2>
          <p>Complete your details to place your coffee order.</p>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-panel">
            {!showReview ? (
              <form onSubmit={handleSubmit}>
                <h3>Customer Details</h3>

                <div className="checkout-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[6-9][0-9]{9}"
                    maxLength="10"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-divider" />

                <h3>Choose Order Type</h3>

                <div className="order-type-options">
                  <button
                    type="button"
                    className={`order-type-card ${
                      orderType === "delivery" ? "selected" : ""
                    }`}
                    onClick={() => setOrderType("delivery")}
                  >
                    <span className="payment-icon">
  <FontAwesomeIcon icon={faTruckFast} />
</span>
                    <strong>Home Delivery</strong>
                    <small>Get coffee delivered to you</small>
                  </button>

                  <button
                    type="button"
                    className={`order-type-card ${
                      orderType === "pickup" ? "selected" : ""
                    }`}
                    onClick={() => setOrderType("pickup")}
                  >
                    <span className="payment-icon">
  <FontAwesomeIcon icon={faStore} />
</span>
                    <strong>Store Pickup</strong>
                    <small>Collect your order from our shop</small>
                  </button>
                </div>

                {orderType === "delivery" && (
                  <div className="delivery-fields">
                    <h3>Delivery Address</h3>

                    <div className="checkout-field">
                      <label>Complete Address *</label>
                      <textarea
                        name="address"
                        placeholder="House no., street, area..."
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="checkout-two-fields">
                      <div className="checkout-field">
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="checkout-field">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="6-digit pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          pattern="[0-9]{6}"
                          maxLength="6"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {error && <p className="checkout-error">{error}</p>}

                <button type="submit" className="checkout-continue-btn">
                  Continue to Review →
                </button>
              </form>
            ) : (
              <div className="checkout-review">
                <h3>Review Your Details</h3>

                <p>
                  <strong>Name:</strong> {formData.name}
                </p>

                <p>
                  <strong>Mobile:</strong> {formData.phone}
                </p>

                <p>
                  <strong>Email:</strong> {formData.email || "Not provided"}
                </p>

                <p>
                  <strong>Order Type:</strong>{" "}
                  {orderType === "delivery" ? "Home Delivery" : "Store Pickup"}
                </p>

                {orderType === "delivery" && (
                  <>
                    <p>
                      <strong>Address:</strong> {formData.address}
                    </p>
                    <p>
                      <strong>City:</strong> {formData.city}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {formData.pincode}
                    </p>
                  </>
                )}

                <div className="checkout-divider" />

                <h3>Select Payment Method</h3>

                <div className="payment-method-options">
                  <button
                    type="button"
                    className={`payment-method-card ${
                      paymentMethod === "cod" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setPaymentMethod("cod");
                      setError("");
                    }}
                    disabled={loading}
                  >
                    <span className="payment-icon">
                           <FontAwesomeIcon icon={faMoneyBillWave} />
                    </span>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order arrives</small>
                  </button>

                  <button
                    type="button"
                    className={`payment-method-card ${
                      paymentMethod === "razorpay" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setPaymentMethod("razorpay");
                      setError("");
                    }}
                    disabled={loading}
                  >
                    <span className="payment-icon">
                     <FontAwesomeIcon icon={faCreditCard} />
                    </span>
                    <strong>Online Payment</strong>
                    <small>Pay securely using Razorpay</small>
                  </button>
                </div>

                {error && <p className="checkout-error">{error}</p>}

                <div className="checkout-review-actions">
                  <button
                    type="button"
                    className="checkout-edit-btn"
                    disabled={loading}
                    onClick={() => {
                      setError("");
                      setShowReview(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                      Edit Details
                  </button>

                  <button
                    type="button"
                    className="checkout-continue-btn"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
  "Please wait..."
) : paymentMethod === "cod" ? (
  <>
    <FontAwesomeIcon icon={faCartShopping} />
    Place Order
  </>
) : (
  <>
    <FontAwesomeIcon icon={faCreditCard} />
    Pay Now
  </>
)}
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="checkout-summary">
            <h3>Your Order</h3>

            {cartItems.map((item) => (
              <div className="checkout-product" key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <small>Qty: {item.quantity}</small>
                </div>

                <span>
                  ₹{(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="checkout-summary-total">
              <strong>Order Total</strong>
              <strong>₹{cartTotal.toFixed(2)}</strong>
            </div>

            <p className="checkout-summary-note">
              Fresh coffee, prepared just for you.
            </p>
          </aside>
        </div>

        <button
          className="checkout-back-btn"
          onClick={handleBack}
          disabled={loading}
        >
         <FontAwesomeIcon icon={faCartShopping} />
Back to Cart
        </button>
      </div>
    </section>
  );
};

export default Checkout;
