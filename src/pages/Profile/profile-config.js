import {
  Bell,
  Briefcase,
  Building2,
  Home,
  KeyRound,
  Lock,
  Search,
  Settings2,
  Shield,
  TrendingUp,
  User,
} from "lucide-react"
import { USER_ROLES } from "@/config/routeConfig"

export const ROLE_META = {
  [USER_ROLES.SUPERADMIN]: {
    label: "Super Admin",
    icon: Shield,
    dashboardPath: "/dashboard",
    accentClassName: "from-slate-950 via-slate-900 to-amber-700",
    badgeClassName: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  [USER_ROLES.ADMIN]: {
    label: "Admin",
    icon: Shield,
    dashboardPath: "/dashboard",
    accentClassName: "from-slate-900 via-sky-950 to-sky-700",
    badgeClassName: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  [USER_ROLES.AGENT]: {
    label: "Agent",
    icon: Briefcase,
    dashboardPath: "/agent",
    accentClassName: "from-slate-950 via-emerald-950 to-emerald-700",
    badgeClassName: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  [USER_ROLES.BROKER]: {
    label: "Broker",
    icon: Building2,
    dashboardPath: "/dashboard",
    accentClassName: "from-slate-950 via-orange-950 to-orange-700",
    badgeClassName: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  },
  [USER_ROLES.BUYER]: {
    label: "Buyer",
    icon: Search,
    dashboardPath: "/buyer",
    accentClassName: "from-slate-950 via-rose-950 to-rose-700",
    badgeClassName: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  [USER_ROLES.SELLER]: {
    label: "Seller",
    icon: Home,
    dashboardPath: "/seller",
    accentClassName: "from-slate-950 via-amber-950 to-amber-700",
    badgeClassName: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  [USER_ROLES.INVESTOR]: {
    label: "Investor",
    icon: TrendingUp,
    dashboardPath: "/dashboard",
    accentClassName: "from-slate-950 via-violet-950 to-violet-700",
    badgeClassName: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  [USER_ROLES.RENTER]: {
    label: "Renter",
    icon: KeyRound,
    dashboardPath: "/dashboard",
    accentClassName: "from-slate-950 via-cyan-950 to-cyan-700",
    badgeClassName: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  },
}

const TAB_META = {
  profile: {
    id: "profile",
    label: "Profile",
    description: "Personal details, contact preferences, and how you appear on the platform.",
    icon: User,
  },
  security: {
    id: "security",
    label: "Security",
    description: "Password checks and account safety guidance for your sign-in workflow.",
    icon: Lock,
  },
  notifications: {
    id: "notifications",
    label: "Notifications",
    description: "Choose which alerts deserve your attention and which can stay quiet.",
    icon: Bell,
  },
  role: {
    id: "role",
    label: "Role Setup",
    description: "Role-specific preferences to tailor the workspace to how you operate.",
    icon: Settings2,
  },
}

export const TIMEZONE_OPTIONS = [
  "UTC",
  "Asia/Calcutta",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
]

const ROLE_SECTION_CONFIG = {
  [USER_ROLES.SUPERADMIN]: {
    tabLabel: "Admin Setup",
    title: "Admin Workspace",
    description: "Keep operational details up to date for platform oversight and escalation coverage.",
    fields: [
      { name: "department", label: "Department", placeholder: "Platform Operations" },
      {
        name: "access_level",
        label: "Access Level",
        type: "select",
        options: ["Global", "Regional", "Support"],
      },
      { name: "escalation_email", label: "Escalation Email", type: "email", placeholder: "ops@estatehub.com" },
      {
        name: "dashboard_focus",
        label: "Dashboard Focus",
        type: "select",
        options: ["Users", "Compliance", "Platform Health"],
      },
      {
        name: "signature",
        label: "Internal Signature",
        type: "textarea",
        colSpan: 2,
        placeholder: "Short internal note used for approvals and escalations.",
      },
    ],
  },
  [USER_ROLES.ADMIN]: {
    tabLabel: "Admin Setup",
    title: "Admin Workspace",
    description: "Set the information your team needs when routing operational or support decisions.",
    fields: [
      { name: "department", label: "Department", placeholder: "Support Operations" },
      {
        name: "access_level",
        label: "Access Level",
        type: "select",
        options: ["Manager", "Coordinator", "Reviewer"],
      },
      { name: "escalation_email", label: "Escalation Email", type: "email", placeholder: "support@estatehub.com" },
      {
        name: "dashboard_focus",
        label: "Dashboard Focus",
        type: "select",
        options: ["Property Review", "User Support", "Reporting"],
      },
      {
        name: "signature",
        label: "Internal Signature",
        type: "textarea",
        colSpan: 2,
        placeholder: "Short internal note used for approvals and support handoffs.",
      },
    ],
  },
  [USER_ROLES.AGENT]: {
    tabLabel: "Agent Details",
    title: "Professional Agent Details",
    description: "Surface the qualifications and service areas that make buyers comfortable working with you.",
    fields: [
      { name: "agency", label: "Agency Name", placeholder: "EstateHub Realty" },
      { name: "license_number", label: "License Number", placeholder: "AGT-2026-0014" },
      { name: "experience_years", label: "Experience (Years)", type: "number", placeholder: "5" },
      {
        name: "specialization",
        label: "Specialization",
        type: "select",
        options: ["Residential", "Commercial", "Luxury", "Rentals", "Land"],
      },
      { name: "service_areas", label: "Service Areas", colSpan: 2, placeholder: "Ludhiana, Chandigarh, Mohali" },
      { name: "languages", label: "Languages", colSpan: 2, placeholder: "English, Hindi, Punjabi" },
    ],
  },
  [USER_ROLES.BROKER]: {
    tabLabel: "Broker Details",
    title: "Broker Credentials",
    description: "Highlight firm details and market coverage so clients understand your commercial strength.",
    fields: [
      { name: "brokerage_name", label: "Brokerage Name", placeholder: "Prime Corridor Advisory" },
      { name: "rera_id", label: "Registration ID", placeholder: "RERA-PB-2048" },
      {
        name: "market_focus",
        label: "Market Focus",
        type: "select",
        options: ["Residential", "Commercial", "Mixed Use", "Luxury"],
      },
      {
        name: "negotiation_style",
        label: "Negotiation Style",
        type: "select",
        options: ["Consultative", "Data-driven", "Relationship-led"],
      },
      { name: "service_areas", label: "Service Areas", colSpan: 2, placeholder: "Sector 17, Zirakpur, Panchkula" },
      { name: "team_size", label: "Team Size", type: "number", placeholder: "12" },
    ],
  },
  [USER_ROLES.BUYER]: {
    tabLabel: "Buyer Preferences",
    title: "Buyer Search Preferences",
    description: "Shape the alerts, recommendations, and agent conversations around the homes you actually want.",
    fields: [
      {
        name: "budget_range",
        label: "Budget Range",
        type: "select",
        options: ["Under 50L", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"],
      },
      {
        name: "property_type",
        label: "Property Type",
        type: "select",
        options: ["Apartment", "Villa", "Plot", "Commercial"],
      },
      { name: "preferred_locations", label: "Preferred Locations", colSpan: 2, placeholder: "Ludhiana, Mohali, Chandigarh" },
      {
        name: "financing_status",
        label: "Financing Status",
        type: "select",
        options: ["Ready", "Pre-approved", "Planning", "Cash Buyer"],
      },
      {
        name: "timeline",
        label: "Purchase Timeline",
        type: "select",
        options: ["Immediately", "1-3 Months", "3-6 Months", "Exploring"],
      },
    ],
  },
  [USER_ROLES.SELLER]: {
    tabLabel: "Seller Details",
    title: "Seller Business Profile",
    description: "Showcase the essentials buyers and internal teams need when they review your inventory and brand.",
    fields: [
      { name: "company_name", label: "Company or Brand", placeholder: "Singh Properties" },
      {
        name: "seller_type",
        label: "Seller Type",
        type: "select",
        options: ["Owner", "Builder", "Developer", "Dealer"],
      },
      { name: "operating_since", label: "Operating Since", type: "number", placeholder: "2014" },
      { name: "gst_number", label: "GST Number", placeholder: "03ABCDE1234F1Z5" },
      { name: "service_areas", label: "Service Areas", colSpan: 2, placeholder: "Ludhiana, Jalandhar, Amritsar" },
      {
        name: "portfolio_focus",
        label: "Portfolio Focus",
        type: "select",
        options: ["Apartments", "Plots", "Commercial", "Mixed"],
      },
    ],
  },
  [USER_ROLES.INVESTOR]: {
    tabLabel: "Investor Preferences",
    title: "Investor Profile",
    description: "Tune the profile to match your capital strategy, deal appetite, and preferred markets.",
    fields: [
      {
        name: "investment_range",
        label: "Investment Range",
        type: "select",
        options: ["Under 1Cr", "1Cr - 3Cr", "3Cr - 5Cr", "5Cr+"],
      },
      {
        name: "asset_focus",
        label: "Asset Focus",
        type: "select",
        options: ["Residential", "Commercial", "Land", "Mixed"],
      },
      { name: "target_markets", label: "Target Markets", colSpan: 2, placeholder: "Mohali, Gurgaon, Noida" },
      {
        name: "risk_appetite",
        label: "Risk Appetite",
        type: "select",
        options: ["Conservative", "Balanced", "Growth"],
      },
      {
        name: "holding_horizon",
        label: "Holding Horizon",
        type: "select",
        options: ["0-2 Years", "3-5 Years", "5+ Years"],
      },
    ],
  },
  [USER_ROLES.RENTER]: {
    tabLabel: "Rental Preferences",
    title: "Rental Preferences",
    description: "Capture the move-in details and home requirements that matter most while searching to rent.",
    fields: [
      { name: "move_in_date", label: "Move-in Date", type: "date" },
      {
        name: "lease_term",
        label: "Lease Term",
        type: "select",
        options: ["6 Months", "12 Months", "18 Months", "Flexible"],
      },
      { name: "preferred_locations", label: "Preferred Locations", colSpan: 2, placeholder: "Central Chandigarh, Mohali" },
      {
        name: "occupancy",
        label: "Occupancy",
        type: "select",
        options: ["Single", "Couple", "Family", "Shared"],
      },
      {
        name: "furnishing",
        label: "Furnishing",
        type: "select",
        options: ["Unfurnished", "Semi-furnished", "Fully furnished"],
      },
    ],
  },
}

const NOTIFICATION_GROUPS = {
  admin: [
    {
      title: "Platform Oversight",
      items: [
        { key: "system_alerts", label: "System alerts", description: "Availability issues, security changes, and critical platform events." },
        { key: "user_activity", label: "User activity updates", description: "Important user approvals, suspensions, or escalations." },
        { key: "weekly_digest", label: "Weekly operational digest", description: "A concise recap of performance, support, and compliance trends." },
      ],
    },
  ],
  field: [
    {
      title: "Client Workflow",
      items: [
        { key: "new_inquiries", label: "New inquiries", description: "Reach out quickly when a lead or buyer shows intent." },
        { key: "offer_updates", label: "Offer updates", description: "Keep negotiations moving with timely offer and counter updates." },
        { key: "schedule_reminders", label: "Schedule reminders", description: "Stay ahead of tours, calls, and follow-up meetings." },
      ],
    },
  ],
  buyer: [
    {
      title: "Search Activity",
      items: [
        { key: "listing_matches", label: "Matching listings", description: "Get notified when new homes fit your saved preferences." },
        { key: "price_changes", label: "Price changes", description: "Track important drops or changes on watched properties." },
        { key: "document_updates", label: "Document updates", description: "Stay on top of offers, approvals, and due diligence documents." },
      ],
    },
  ],
}

export function getRoleMeta(roleId) {
  return ROLE_META[roleId] || ROLE_META[USER_ROLES.BUYER]
}

export function getDashboardPath(roleId) {
  return getRoleMeta(roleId).dashboardPath
}

export function getRoleSectionConfig(roleId) {
  return ROLE_SECTION_CONFIG[roleId] || ROLE_SECTION_CONFIG[USER_ROLES.BUYER]
}

export function getProfileTabs(roleId) {
  const roleSection = getRoleSectionConfig(roleId)

  return [
    TAB_META.profile,
    roleSection ? { ...TAB_META.role, label: roleSection.tabLabel } : TAB_META.role,
    TAB_META.notifications,
    TAB_META.security,
  ]
}

export function getNotificationGroups(roleId) {
  if ([USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN].includes(roleId)) {
    return NOTIFICATION_GROUPS.admin
  }

  if ([USER_ROLES.AGENT, USER_ROLES.BROKER, USER_ROLES.SELLER].includes(roleId)) {
    return NOTIFICATION_GROUPS.field
  }

  return NOTIFICATION_GROUPS.buyer
}
