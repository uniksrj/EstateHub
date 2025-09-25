import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL, // no process.env
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, 
});

const getCsrfToken = async () => {
  try {
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("CSRF token fetch failed:", error);
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
   login: async (credentials) => {
    await getCsrfToken()
    return await api.post("/api/auth/login", credentials)
  },
  register: async (userData) => {
    await getCsrfToken()
    return await api.post("/api/auth/register", userData,{ withCredentials: true })
  },
  logout: () => api.post("/api/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (data) => api.post("/auth/reset-password", data),
  getUser: () => api.get("/auth/user"),
}

// Properties API calls
export const propertiesAPI = {
  getAll: (params) => api.get("/properties", { params }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (propertyData) => api.post("/api/property/add", propertyData),
  update: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
  delete: (id) => api.delete(`/properties/${id}`),
  search: (searchParams) => api.get("/properties/search", { params: searchParams }),
  getFeatured: () => api.get("/properties/featured"),
}

// User API calls
export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (profileData) => api.put("/user/profile", profileData),
  getProperties: () => api.get("/api/properties/get-user-properties"),
  getFavorites: () => api.get("/api/properties/get-favorite-properties"),
  addToFavorites: (propertyId) => api.post(`/user/favorites/${propertyId}`),
  removeFromFavorites: (propertyId) => api.delete(`/user/favorites/${propertyId}`),
}

export default api
