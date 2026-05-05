"use client"

import { createContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"
import { toast } from "sonner"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const persistUser = (nextUser) => {
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser))
    } else {
      localStorage.removeItem("user")
    }

    setUser(nextUser)
  }

  useEffect(() => {
    // Check if user is logged in on app start
    // const token = localStorage.getItem("auth_token")
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { user, chatToken } = response.data
      console.log(user);

      // localStorage.setItem("auth_token", token)
      localStorage.setItem("chatToken",chatToken)
      toast.success('Login successful!');
      persistUser(user)
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      console.error('Error response:', error.response)

      if (error.response?.status === 419) {
        return {
          success: false,
          error: "Session expired. Please try again.",
        }
      }

      return {
        success: false,
        error: error.response?.data?.message || error.response?.data?.error || "Login failed",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      const { user } = response.data

      persistUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed",
      }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("chatToken")
      persistUser(null)
    }
  }

  const updateUser = (updates) => {
    setUser((previousUser) => {
      if (!previousUser) {
        return previousUser
      }

      const nextUser =
        typeof updates === "function"
          ? updates(previousUser)
          : { ...previousUser, ...updates }

      if (nextUser) {
        localStorage.setItem("user", JSON.stringify(nextUser))
      } else {
        localStorage.removeItem("user")
      }

      return nextUser
    })
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
