
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/admin/products";

const initialForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: 0,
  isAvailable: true,
};

const AdminProducts = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, authConfig);

      setProducts(response.data.products || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Products load nahi ho paye."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    } else {
      setError("Please login as Admin.");
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (
        !Number.isFinite(payload.price) ||
        payload.price < 0 ||
        !Number.isInteger(payload.stock) ||
        payload.stock < 0
      ) {
        setError("Please enter a valid price and stock.");
        return;
      }

      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          payload,
          authConfig
        );

        setMessage("Product updated successfully!");
      } else {
        await axios.post(API_URL, payload, authConfig);

        setMessage("Product added successfully!");
      }

      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);

      await fetchProducts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Product save nahi ho paya."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      isAvailable: product.isAvailable,
    });

    setEditingId(product._id);
    setShowForm(true);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await axios.delete(`${API_URL}/${id}`, authConfig);

      setMessage("Product deleted successfully!");

      await fetchProducts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Product delete nahi ho paya."
      );
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  return (
    <div className="admin-products">
      <style>{`
        .admin-products {
          min-height: 100vh;
          padding: 120px 5% 50px;
          background: #F5F0E1;
          color: #291914;
        }

        .admin-products-container {
          max-width: 1200px;
          margin: auto;
        }

        .admin-products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .admin-products-header h1 {
          margin: 0 0 8px;
          font-size: 32px;
        }

        .admin-products-header p {
          color: #765B50;
          margin: 0;
        }

        .admin-primary-btn,
        .admin-secondary-btn,
        .admin-edit-btn,
        .admin-delete-btn {
          border: none;
          border-radius: 7px;
          padding: 11px 17px;
          cursor: pointer;
          font-weight: 600;
        }

        .admin-primary-btn {
          background: #3F181C;
          color: white;
        }

        .admin-secondary-btn {
          background: #eee6d5;
          color: #3F181C;
        }

        .admin-edit-btn {
          background: #EA8D15;
          color: #291914;
        }

        .admin-delete-btn {
          background: #a52a2a;
          color: white;
        }

        .admin-product-form {
          background: white;
          padding: 25px;
          border-radius: 14px;
          margin-bottom: 25px;
          box-shadow: 0 4px 15px rgba(41,25,20,.07);
        }

        .admin-product-form h2 {
          margin-top: 0;
        }

        .admin-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .admin-form-group.full {
          grid-column: 1 / -1;
        }

        .admin-form-group label {
          font-weight: 600;
        }

        .admin-form-group input,
        .admin-form-group textarea,
        .admin-form-group select {
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          border: 1px solid #ded4c4;
          border-radius: 7px;
          font: inherit;
          background: white;
          color: #291914;
        }

        .admin-form-group textarea {
          min-height: 90px;
          resize: vertical;
        }

        .admin-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-checkbox input {
          width: auto;
        }

        .admin-form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
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

        .admin-table-wrapper {
          overflow-x: auto;
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(41,25,20,.07);
        }

        .admin-product-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }

        .admin-product-table th,
        .admin-product-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #eee8dc;
        }

        .admin-product-table th {
          background: #3F181C;
          color: white;
        }

        .admin-product-table td {
          color: #543c32;
        }

        .admin-product-actions {
          display: flex;
          gap: 8px;
        }

        .admin-product-name {
          font-weight: 700;
          color: #291914;
        }

        .admin-product-status {
          font-weight: 600;
        }

        @media(max-width: 650px) {
          .admin-form-grid {
            grid-template-columns: 1fr;
          }

          .admin-form-group.full {
            grid-column: auto;
          }

          .admin-products-header h1 {
            font-size: 26px;
          }

          .admin-product-form {
            padding: 18px;
          }
        }
      `}</style>

      <div className="admin-products-container">

        <div className="admin-products-header">
          <div>
            <h1>Product Management</h1>
            <p>Manage your coffee shop products.</p>
          </div>

          <button
            className="admin-primary-btn"
            onClick={() => {
              setForm(initialForm);
              setEditingId(null);
              setShowForm(!showForm);
              setError("");
              setMessage("");
            }}
          >
            {showForm ? "Close Form" : "+ Add Product"}
          </button>
        </div>

        {message && (
          <div className="admin-message">{message}</div>
        )}

        {error && (
          <div className="admin-message admin-error">
            {error}
          </div>
        )}

        {showForm && (
          <form
            className="admin-product-form"
            onSubmit={handleSubmit}
          >
            <h2>
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="admin-form-grid">

              <div className="admin-form-group">
                <label>Product Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Category *</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group full">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group full">
                <label>Image Filename *</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="e.g. cappuccino.jpg"
                  required
                />
              </div>

              <div className="admin-form-group full">
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={form.isAvailable}
                    onChange={handleChange}
                  />
                  Product Available
                </label>
              </div>

            </div>

            <div className="admin-form-actions">
              <button
                className="admin-primary-btn"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              <button
                className="admin-secondary-btn"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="admin-table-wrapper">

          {loading ? (
            <p style={{ padding: "25px" }}>
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p style={{ padding: "25px" }}>
              No products found.
            </p>
          ) : (
            <table className="admin-product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <span className="admin-product-name">
                        {product.name}
                      </span>
                    </td>

                    <td>{product.category}</td>

                    <td>₹{product.price}</td>

                    <td>{product.stock}</td>

                    <td>
                      <span className="admin-product-status">
                        {product.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </td>

                    <td>
                      <div className="admin-product-actions">
                        <button
                          className="admin-edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="admin-delete-btn"
                          onClick={() =>
                            handleDelete(product._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
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

export default AdminProducts;
