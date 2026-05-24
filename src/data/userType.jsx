import {
  BarChart3,
  Users,
  DollarSign,
  Settings,
  Home,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Calendar,
  Search,
  Heart,
  Filter,
  Bell,
  Tag,
  Briefcase,
  Calculator,
  TrendingUp,
  User,
  Activity,
  XCircle,
  Bug,
} from "lucide-react";

export const sidebars = {
  superadmin: [
    { label: "Platform Analytics", path: "/dashboard", icon: BarChart3 },
    { label: "User Management", path: "/dashboard/users", icon: Users },
    { label: "Financial Reports", path: "/dashboard/finance", icon: DollarSign },
    { label: "System Settings", path: "/dashboard/system", icon: Settings },
    { label: "Beta Feedback", path: "/dashboard/beta-feedback", icon: Bug },
    { label: "All Properties", path: "/dashboard/properties", icon: Home },
    { label: "Content Management", path: "/dashboard/content", icon: FileText, disabled: true },
  ],

  admin: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, disabled: true },
    { label: "Properties", path: "/admin/properties", icon: Home, disabled: true },
    { label: "User Management", path: "/admin/users", icon: Users, disabled: true },
    { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare, disabled: true },
    { label: "Reports", path: "/admin/reports", icon: BarChart3, disabled: true },
  ],

  agent: [
    { label: "Dashboard", path: "/agent", icon: LayoutDashboard },
    { label: "Properties", path: "/agent/properties", icon: Home },
    { label: "Add Property", path: "/agent/add-property", icon: Plus },
    { label: "Offers", path: "/agent/offers", icon: Tag },
    { label: "My Clients", path: "/agent/clients", icon: Users },
    { label: "Inquiries", path: "/agent/inquiries", icon: MessageSquare },
    { label: "Schedule", path: "/agent/schedule", icon: Calendar },
    { label: "Pipeline", path: "/agent/pipeline", icon: Activity },
    { label: "Performance", path: "/agent/analytics", icon: BarChart3, disabled: true },
    // { label: "Profile", path: "/agent/profile", icon: User },
  ],

  buyer: [
    { label: "Dashboard", path: "/buyer", icon: Home },
    { label: "Find Properties", path: "/buyer/search", icon: Search },
    { label: "Saved Properties", path: "/buyer/favorites", icon: Heart },
    { label: "My Criteria & Alerts", path: "/buyer/preferences-alerts", icon: Filter },
    { label: "Schedule Tours", path: "/buyer/schedule", icon: Calendar },
    { label: "Inquiries", path: "/buyer/inquiries", icon: MessageSquare },
    { label: "My Offers", path: "/buyer/offers", icon: Tag },
    { label: "Mortgage Tools", path: "/buyer/mortgage-tools", icon: Calculator },
    { label: "Documents", path: "/buyer/documents", icon: FileText },
    { label: "Market Insights", path: "/buyer/market-insight", icon: TrendingUp },
  ],

  seller: [
    { label: "Dashboard", path: "/seller", icon: LayoutDashboard },
    { label: "My Properties", path: "/seller/properties", icon: Home },
    { label: "Add Property", path: "/seller/add-property", icon: Plus },
    { label: "Offers", path: "/seller/offers", icon: Tag },
    { label: "Inquiries", path: "/seller/inquiries", icon: MessageSquare },
    { label: "Schedule", path: "/seller/schedule", icon: Calendar, disabled: true },
    { label: "Analytics", path: "/seller/analytics", icon: BarChart3,disabled: true },
    { label: "Notifications", path: "/seller/notifications", icon: Bell,disabled: true },
  ],

  investor: [
    { label: "Investment Finder", path: "/investor/search", icon: Search, disabled: true },
    { label: "My Portfolio", path: "/investor/portfolio", icon: Briefcase, disabled: true },
    { label: "ROI Calculator", path: "/investor/calculator", icon: Calculator, disabled: true },
    { label: "Market Trends", path: "/investor/trends", icon: TrendingUp, disabled: true },
    { label: "Deal Alerts", path: "/investor/alerts", icon: Bell, disabled: true },
  ],
  renter: [
    { label: "Dashboard", path: "/renter/dashboard", icon: LayoutDashboard, disabled: true },
    { label: "Browse Properties", path: "/renter/properties", icon: Home, disabled: true },
    { label: "Saved Listings", path: "/renter/saved", icon: Heart, disabled: true },
    { label: "Rental Applications", path: "/renter/applications", icon: FileText, disabled: true },
    { label: "Messages", path: "/renter/messages", icon: MessageSquare, disabled: true },
  ],
};

export const filterOptions = {
  roles: [
    { label: 'All Roles', value: 'All' },
    { label: 'Admin', value: '2' },
    { label: 'Agent', value: '3' },
    { label: 'Broker', value: '4' },
    { label: 'Buyer', value: '5' },
    { label: 'Seller', value: '6' },
    { label: 'Investor', value: '7' },
    { label: 'Renter', value: '8' }
  ],

  statuses: [
    { label: 'All Statuses', value: 'All' },
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '0' },
    { label: 'Pending Verification', value: 'pending' },
    { label: 'Suspended', value: 'suspended' }
  ],

  propertyStatusData: [
    { status: "Available", count: 50, fill: "#3b82f6" },
    { status: "Sold", count: 30, fill: "#10b981" },
    { status: "Rented", count: 15, fill: "#f59e0b" },
    { status: "Maintenance", count: 5, fill: "#ef4444" },
    { status: "Pending", count: 10, fill: "#8b5cf6" },
  ]
};
