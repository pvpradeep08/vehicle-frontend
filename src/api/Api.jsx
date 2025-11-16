import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  // ⚠️ Don't set global Content-Type: "application/json"
  // It can break file uploads (multipart/form-data)
});


// ================= VEHICLE APIs =================

// Get all vehicles
export const getAllVehicles = () => api.get("/vehicles");

// Get single vehicle by ID
export const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles/${id}`);
    return response.data; // ✅ Only return the vehicle object
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
};

// Get image URL for a vehicle
export const getVehicleImage = (id) => `${BASE_URL}/vehicles/${id}/image`;

// Add new vehicle with image upload
export const addVehicle = (vehicle, imageFile) => {
  const formData = new FormData();
  formData.append("vehicle", JSON.stringify(vehicle));
  if (imageFile) {
    formData.append("image", imageFile);
  }

  return api.post("/vehicles/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete vehicle
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);


// ================= AUTH APIs =================

// Register new user
export const registerUser = (userData) => api.post("/users/register", userData);

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", {
      email: credentials.email.trim(),
      password: credentials.password.trim(),
    });
    return response.data; // full user object
  } catch (err) {
    const msg =
      err.response?.data || err.message || "Login failed. Check credentials.";
    throw new Error(msg);
  }
};

// Get user profile by ID
export const getUserProfile = (id) => api.get(`/users/${id}`);

// Get user by email
export const getUserByEmail = (email) =>
  api.get(`/users/email/${encodeURIComponent(email)}`);


// ================= BOOKINGS APIs =================

// Get all bookings
export const getAllBookings = () => api.get("/bookings");

// Create new booking
export const createBooking = (bookingData) => {
  if (!bookingData.bookingDate) {
    bookingData.bookingDate = new Date().toISOString().slice(0, 10);
  }
  return api.post("/bookings/add", bookingData);
};

// Get bookings for a specific user
export const getUserBookings = (userId) =>
  api.get("/bookings").then((res) => ({
    data: (res.data || []).filter((b) => b.user && b.user.id === userId),
  }));

// Delete booking
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);


// ================= EXPORT DEFAULT =================

export default api;
