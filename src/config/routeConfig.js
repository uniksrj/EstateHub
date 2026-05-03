// config/routeConfig.js
export const USER_ROLES = {
  SUPERADMIN: 1,
  ADMIN: 2,
  AGENT: 3,
  BROKER: 4,
  BUYER: 5,
  SELLER: 6,
  INVESTOR: 7,
  RENTER: 8
}

// Define which roles can access the admin panel
export const ADMIN_PANEL_ACCESS = [
  USER_ROLES.SUPERADMIN,
  USER_ROLES.ADMIN,
  // USER_ROLES.AGENT,
  // USER_ROLES.BROKER
]

// Define specific route permissions
export const ROUTE_PERMISSIONS = {
  // Super Admin Only
  '/dashboard/users': [USER_ROLES.SUPERADMIN],
  '/dashboard/system': [USER_ROLES.SUPERADMIN],
  '/dashboard/finance': [USER_ROLES.SUPERADMIN],
  '/dashboard/beta-feedback': [USER_ROLES.SUPERADMIN],
  
  // Admin & Super Admin
  '/dashboard/analytics': [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN],
  '/dashboard/properties': [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN],
  '/dashboard/content': [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN],
  
  // Agents & Brokers
  '/dashboard/add-property': [USER_ROLES.ADMIN, USER_ROLES.AGENT, USER_ROLES.BROKER],
  '/dashboard/manage-properties': [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN, USER_ROLES.AGENT, USER_ROLES.BROKER],
  
  // Buyers, Sellers, Investors, Renters (No admin panel access)
  '/dashboard': ADMIN_PANEL_ACCESS // Main dashboard access
  
}
