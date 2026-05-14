"use client"

import { Navigate, useLocation } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { ADMIN_PANEL_ACCESS, ROUTE_PERMISSIONS } from "@/config/routeConfig"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!user) {    
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  const usertype = Number(user.role_id || user.userType_id)

  // Check route-specific permissions
  const routeAllowedRoles = ROUTE_PERMISSIONS[location.pathname];
  if (routeAllowedRoles && !routeAllowedRoles.includes(usertype)) {
    return <Navigate to="/unauthorized" replace />
  }

  // Dashboard routes default to admin-only unless a route-specific rule allows more roles.
  if (location.pathname.startsWith('/dashboard') && !routeAllowedRoles) {
    const adminAccessRoles = ADMIN_PANEL_ACCESS.includes(usertype)
    if (!adminAccessRoles) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  // Check component-specific allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(usertype)) {
    return <Navigate to="/unauthorized" replace />
  }
  return children
}

export default ProtectedRoute
