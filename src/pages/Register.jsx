
import React, { useState } from "react";
import API from "../api/productApi";
import "./Register.css";

const Register = ({ onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/users/register", formData);

      alert("Registration successful! Please login.");

      if (onLogin) onLogin();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button
          className="auth-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <h2>Create Account ☕</h2>
        <p>Join our coffee community</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10 digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10 digit Indian mobile number"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password (minimum 6 characters)"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={onLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
