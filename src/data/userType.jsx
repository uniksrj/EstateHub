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
} from "lucide-react";

export const sidebars = {
  superadmin: [
    { label: "Platform Analytics", path: "/admin/analytics", icon: BarChart3 },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Financial Reports", path: "/admin/finance", icon: DollarSign },
    { label: "System Settings", path: "/admin/system", icon: Settings },
    { label: "All Properties", path: "/admin/properties", icon: Home },
    { label: "Content Management", path: "/admin/content", icon: FileText },
  ],

  admin: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Properties", path: "/admin/properties", icon: Home },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
    { label: "Reports", path: "/admin/reports", icon: BarChart3 },
  ],

  agent: [
    { label: "My Dashboard", path: "/agent", icon: LayoutDashboard },
    { label: "My Properties", path: "/agent/properties", icon: Home },
    { label: "Add Property", path: "/agent/properties/add", icon: Plus },
    { label: "My Clients", path: "/agent/clients", icon: Users },
    { label: "Inquiries", path: "/agent/inquiries", icon: MessageSquare },
    { label: "Schedule", path: "/agent/schedule", icon: Calendar },
    { label: "Performance", path: "/agent/analytics", icon: BarChart3 },
  ],

  buyer: [
    { label: "Find Properties", path: "/buyer/search", icon: Search },
    { label: "Saved Properties", path: "/buyer/favorites", icon: Heart },
    { label: "My Criteria", path: "/buyer/preferences", icon: Filter },
    { label: "Property Alerts", path: "/buyer/alerts", icon: Bell },
    { label: "My Inquiries", path: "/buyer/inquiries", icon: MessageSquare },
    { label: "Schedule Tours", path: "/buyer/tours", icon: Calendar },
  ],

  seller: [
    { label: "Sell Property", path: "/seller/list", icon: Plus },
    { label: "My Listings", path: "/seller/properties", icon: Home },
    { label: "Offers", path: "/seller/offers", icon: Tag },
    { label: "Property Views", path: "/seller/analytics", icon: BarChart3 },
    { label: "Documents", path: "/seller/documents", icon: FileText },
  ],

  investor: [
    { label: "Investment Finder", path: "/investor/search", icon: Search },
    { label: "My Portfolio", path: "/investor/portfolio", icon: Briefcase },
    { label: "ROI Calculator", path: "/investor/calculator", icon: Calculator },
    { label: "Market Trends", path: "/investor/trends", icon: TrendingUp },
    { label: "Deal Alerts", path: "/investor/alerts", icon: Bell },
  ],
};
