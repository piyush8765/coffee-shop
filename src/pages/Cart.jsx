
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

// Coffee Images
import americanoImage from "../assets/americano.jpg";
import cappuccinoImage from "../assets/cappuccino.jpg";
import caramelImage from "../assets/caramel-macchiato.jpg";
import coldCoffeeImage from "../assets/cold-coffee.jpg";
import espressoImage from "../assets/espresso.jpg";
import frappeImage from "../assets/frappe.jpg";
import latteImage from "../assets/latte.jpg";
import mochaImage from "../assets/mocha.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

// MongoDB image filename mapping
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

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Get product image
  const getImage = (imageName) => {
    return productImages[imageName] || null;
  };

  // Continue Shopping
  const handleContinueShopping = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Proceed to Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <section className="cart-page">
      <div className="cart-container">

        {/* Cart Header */}
        <div className="cart-header">
          <div>
            <span className="cart-subtitle">YOUR SELECTION</span>
            <h2>Shopping Cart</h2>
            <p>Good coffee is just a few clicks away.</p>
          </div>

          <button
            className="cart-back-btn"
            onClick={handleContinueShopping}
            type="button"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">☕</div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any coffee yet.</p>

            <button
              onClick={handleContinueShopping}
              type="button"
            >
              Explore Our Menu
            </button>
          </div>
        ) : (
          /* Cart Items */
          <div className="cart-layout">

            <div className="cart-items">
              {cartItems.map((item) => {
                const productImage = getImage(item.image);

                return (
                  <div className="cart-item" key={item._id}>

                    <div className="cart-item-image">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={item.name}
                        />
                      ) : (
                        <div className="empty-cart-icon">
                          <FontAwesomeIcon icon={faCartArrowDown} />
                        </div>
                      )}
                    </div>

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      <strong>
                        ₹{Number(item.price).toFixed(2)}
                      </strong>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          type="button"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item._id)}
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => removeFromCart(item._id)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="cart-item-total">
                      ₹{(
                        Number(item.price) * item.quantity
                      ).toFixed(2)}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <aside className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span>To be calculated</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <strong>Total</strong>
                <strong>₹{cartTotal.toFixed(2)}</strong>
              </div>

              <button
                className="checkout-btn"
                type="button"
                onClick={handleCheckout}
              >
                Proceed to Checkout →
              </button>

              <p className="cart-note">
                Freshly prepared coffee, made with love.
              </p>
            </aside>

          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
