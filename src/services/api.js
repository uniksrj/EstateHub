import axios from "axios"
import { API_ORIGIN } from "@/config/env"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_ORIGIN,
  headers: {
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

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]
    }

    const token = localStorage.getItem("chatToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

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
      localStorage.removeItem("chatToken")
      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 1000)
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    return await api.post("/api/auth/login", credentials)
  },
  sendEmailOtp: async (payload) => {
    return await api.post("/api/send-email-otp", payload, { withCredentials: true })
  },
  verifyEmailOtp: async (payload) => {
    return await api.post("/api/verify-email-otp", payload, { withCredentials: true })
  },
  register: async (userData) => {
    return await api.post("/api/auth/register", userData, { withCredentials: true })
  },
  logout: () => api.post("/api/auth/logout"),
  forgotPassword: (email) => api.post("/api/auth/forgot-password", { email }),
  resetPassword: async (data) => {
    await api.post("/api/reset-password", data)
  },
  getUser: () => api.get("/api/auth/user"),
}

// Properties API calls
export const propertiesAPI = {
  getAll: (params) => api.get("/api/properties", { params }),
  getPropertyByType: (params) => api.get("/api/propertiesByType", { params }),
  create: (propertyData) => api.post("/api/property/add", propertyData),
  getById: (id) => api.get(`/api/properties/${id}`),
  saveViewById: (id, details) => api.post(`/api/properties/${id}`, details),
  update: (id, propertyData) => api.put(`/api/properties/${id}`, propertyData),
  delete: (id) => api.delete(`/api/properties/${id}`),
  search: (searchParams) => api.get("/api/properties/search", { params: searchParams }),
  getFeatured: () => api.get("/api/properties/featured"),
  getPropertyListByUser: (searchData) => api.get("/api/propertiesList", { searchData }),
  getDashboardListByUser: (searchData) => api.get("/api/seller/dashboard", { searchData }),
  boostProperty: (payload) => api.post("/api/boost-property", payload),
  getBoostPlans: () => api.get("/api/boost-plans"),
}

// User API calls
export const userAPI = {
  getProfile: () => api.get("/api/user"),
  updateProfile: (profileData) => api.post("/api/user/profile", profileData, {
    headers: profileData instanceof FormData ? {
      "Content-Type": "multipart/form-data",
    } : undefined,
  }),
  getProperties: (propertyDetails) => api.post("/api/properties/get-user-properties", propertyDetails,),
  getFavorites: () => api.get("/api/properties/get-favorite-properties"),
  checkFavorite: (propertyId) => api.get(`/api/properties/${propertyId}/favorite`),
  toggleFavorite: (details) => api.post(`/api/properties/toggle-favorite`, details),
  removeFromFavorites: (propertyId) => api.delete(`/api/user/favorites/${propertyId}`),
  getUser_metrics: (params) => api.get("/api/auth/user_metrics", { params }),
  storeBuyerInquiry: (details) => api.post(`/api/user/store-inquiry`, details),
  get_deal_losses: (params) => api.get("/api/agent/deal-losses", { params }),
  get_agent_pipeline: (params) => api.get("/api/agent/pipeline", { params }),
  store_agent_deal_loss: (details) => api.post(`/api/agent/deal-losses`, details),
  get_agent_buyers: (params) => api.get("/api/agent/buyers", { params }),
  store_schedule: (details) => api.post(`/api/store-schedule`, details),
  getAll: (params) => api.get(`/api/get-schedule`, { params }),
  updateScheduleStatus: (status) => api.put(`/api/update-schedule-status`, status),
  buyer_preferences: (params) => api.get(`/api/buyer/preferences`, { params }),
  update_preferences: (id, preference) => api.put(`/api/buyer/preferences/${id}`, preference),
  create_preference: (preference) => api.post(`/api/buyer/preferences`, preference),
  delete_preference: (id) => api.delete(`/api/buyer/preferences/${id}`),
  create_alert: (alertData) => api.post('/api/buyer/alerts', alertData),
  get_alerts: () => api.get('/api/buyer/alerts'),
  toggle_alert: (id) => api.patch(`/api/buyer/alerts/${id}/toggle`),
  delete_alert: (id) => api.delete(`/api/buyer/alerts/${id}`),
  update_alert: (id, alertData) => api.put(`/api/buyer/alerts/${id}`, alertData),
  store_offer_details: (offerData) => api.post(`/api/buyer/store-offer`, offerData),
  get_offers: () => api.get(`/api/buyer/offers`),
  changeBuyerStatusOffer: (id, status) => api.patch(`/api/buyer/${id}/status`, status),
  changeAgentStatusOffer: (id, status) => api.patch(`/api/agent/${id}/status`, status),
  deleteOffer: (id) => api.delete(`/api/buyer/${id}/delete`),
  get_deal_list: () => api.get(`/api/agent/deal`),
  upload_document(data) {
    return api.post('/api/agent/store_document', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },
  get_document : (deal_id) => api.get(`/api/agent/get_document_details/${deal_id}`),
  changeStep : (deal_id, stepKey) => api.post(`/api/agent/deals/${deal_id}/complete-step/${stepKey}`,{}),
  getAllDetailsActivity : (data) => api.get(`/api/agent/activities`, {data}),
  updateDeal : (deal_id, data) => api.post(`/api/agent/update_deal/${deal_id}`, data),
  addDeadlineExtension : (deal_id , data) => api.post(`/api/agent/add_deadline_extension/${deal_id}`, data),
  update_earnest_deal : (deal_id , data) => api.post(`/api/agent/update_earnest_deal/${deal_id}`, data),
  updateDocumentsDetails : (deal_id, data) => api.post(`/api/agent/update_documents_details/${deal_id}`, data),
  save_property_loan_details : (data) => api.post(`/api/buyer/save_property_loan_details`, data),
}

export const betaFeedbackAPI = {
  submit: async (feedbackData) => {
    return api.post("/api/beta-feedback", feedbackData, {
      headers: feedbackData instanceof FormData ? {
        "Content-Type": "multipart/form-data",
      } : undefined,
    })
  },
  getAll: (params) => api.get("/api/admin/beta-feedback", { params }),
  updateStatus: (id, status) => api.patch(`/api/admin/beta-feedback/${id}/status`, { status }),
}

export const superAdminAPI = {
  // User Management
  getAllUsers: (params) => api.get("/api/admin/users", { params }),
  getUserById: (id) => api.get(`/api/admin/users/${id}`),
  createUser: (userData) => api.post("/api/admin/users", userData),
  updateUser: (id, userData) => api.put(`/api/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  changeUserStatus: (id, status) => api.patch(`/api/admin/users/${id}/status`, { status }),
  getAllProperties: (params) => api.get("/api/admin/properties", { params }),
}

export const webhookAPI = {
  getInquiryList: (params) => api.get("/api/inquiries", { params }),
  inquiry_respond: (id, userData) => api.post(`/api/inquiries/${id}/respond`, userData),
  inquiry_close: (id, status) => api.post(`/api/inquiries/${id}/close`, status),
}

export default api
