"use client"

import { createContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"
import { toast } from "sonner"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
      const { user } = response.data
      console.log(user);

      // localStorage.setItem("auth_token", token)
      localStorage.setItem("user", JSON.stringify(user))
      toast.success('Login successful!');
      setUser(user)
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

      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("user")
      setUser(null)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
