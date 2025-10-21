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

const getCsrfTokenFromCookie = () => {
  const name = 'XSRF-TOKEN='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}

// Function to ensure CSRF token is available
const ensureCsrfToken = async () => {
  let token = getCsrfTokenFromCookie()
  if (!token) {
    // If no token, get one from the server
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    })
    token = getCsrfTokenFromCookie()
  }

  return token
}

api.interceptors.request.use(
  (config) => {
    // Only add CSRF token for state-changing requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      const token = getCsrfTokenFromCookie()
      if (token) {
        config.headers['X-XSRF-TOKEN'] = token
        console.log('CSRF token added to request:', token.substring(0, 10) + '...')
      } else {
        console.warn('No CSRF token found for', config.method, 'request')
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Request interceptor to add auth token token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("auth_token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    await ensureCsrfToken()
    return await api.post("/api/auth/login", credentials)
  },
  register: async (userData) => {
    await ensureCsrfToken()
    return await api.post("/api/auth/register", userData, { withCredentials: true })
  },
  logout: () => api.post("/api/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: async (data) => {
    await ensureCsrfToken()
    await api.post("/api/reset-password", data)
  },
  getUser: () => api.get("/api/auth/user"),
}

// Properties API calls
export const propertiesAPI = {
  getAll: (params) => api.get("/api/properties", { params }),
  create: (propertyData) => api.post("/api/property/add", propertyData),
  getById: (id) => api.get(`/api/properties/${id}`),
  saveViewById: (id,details) => api.post(`/api/properties/${id}`,details),
  update: (id, propertyData) => api.put(`/api/properties/${id}`, propertyData),
  delete: (id) => api.delete(`/api/properties/${id}`),
  search: (searchParams) => api.get("/properties/search", { params: searchParams }),
  getFeatured: () => api.get("/properties/featured"),
  getPropertyListByUser :(searchData) => api.get("/api/propertiesList", {searchData}),
  getDashboardListByUser :(searchData) => api.get("/api/seller/dashboard", {searchData}),
}

// User API calls
export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (profileData) => api.put("/user/profile", profileData),
  getProperties: (propertyDetails) => api.post("/api/properties/get-user-properties", propertyDetails,),
  getFavorites: () => api.get("/api/properties/get-favorite-properties"),
  toggleFavorite: (details) => api.post(`/api/properties/toggle-favorite`, details),
  removeFromFavorites: (propertyId) => api.delete(`/user/favorites/${propertyId}`),
  getUser_metrics: (params) => api.get("/api/auth/user_metrics", { params }),
  storeBuyerInquiry : (details) => api.post(`/api/user/store-inquiry`, details),
}

export const superAdminAPI = {
  // User Management
  getAllUsers: (params) => api.get("/api/admin/users", { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  createUser: (userData) => api.post("/api/admin/users", userData),
  updateUser: (id, userData) => api.put(`/api/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  changeUserStatus: (id, status) => api.patch(`/api/admin/users/${id}/status`, { status }),
  getAllProperties: (params) => api.get("/api/admin/properties", { params }),
}

export default api
