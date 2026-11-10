
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Get all products
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data.products;
};

// Create new order
export const createOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

export default API;
