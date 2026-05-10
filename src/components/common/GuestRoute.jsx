"use client"

import { Navigate, Outlet } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { getDashboardPath } from "@/pages/Profile/profile-config"

const GuestRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to={getDashboardPath(user.role_id || user.userType_id)} replace />
  }

  return <Outlet />
}

export default GuestRoute
