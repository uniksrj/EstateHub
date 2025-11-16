import { AGENT_OFFER_STATUS, OFFER_STATUS } from "@/constants/offerTypes";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export const getStatusInfo = (user) => {
  switch (user.is_active) {
    case 1:
      return {
        text: 'Active',
        color: 'bg-green-100 text-green-800 border border-green-200',
      };
    case 0:
      return {
        text: 'Inactive',
        color: 'bg-gray-100 text-gray-800 border border-gray-200',
      };
    case 3:
      return {
        text: 'Pending',
        color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      };
    case 4:
      return {
        text: 'Suspended',
        color: 'bg-red-100 text-red-800 border border-red-200',
      };
    default:
      return {
        text: 'Unknown',
        color: 'bg-gray-50 text-gray-500 border border-gray-100',
      };
  }
};


export const getRoleColor = (role_id) => {
  switch (role_id) {
    case 1: return 'bg-red-100 text-red-800 border border-red-200';
    case 2: return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
    case 3: return 'bg-purple-100 text-purple-800 border border-purple-200';
    case 4: return 'bg-violet-100 text-violet-800 border border-violet-200';
    case 5: return 'bg-orange-100 text-orange-800 border border-orange-200';
    case 6: return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 7: return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 8: return 'bg-cyan-100 text-cyan-800 border border-cyan-200';
    default: return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

export function getStatusColor(status) {
  const colors = {
    'for_sale': 'bg-green-100 text-green-800',
    'under_contract': 'bg-yellow-100 text-yellow-800',
    'sold': 'bg-gray-100 text-gray-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusText(status) {
  const texts = {
    'for_sale': 'For Sale',
    'under_contract': 'Under Contract',
    'sold': 'Sold'
  }
  return texts[status] || status
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatNumber(value) {
  if (!value) return;
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return value.toString();
}

export const getScheduleStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500"
    case "approved":
      return "bg-green-500"
    case "completed":
      return "bg-blue-500"
    case "cancelled":
      return "bg-red-500"
    case "rejected":
      return "bg-gray-500"
    default:
      return "bg-gray-400"
  }
}

export const getOfferStatusColor = (status, role = "buyer") => {
  if (role === "buyer") {
    return OFFER_STATUS[status]?.color || OFFER_STATUS.pending.color;
  } else if (role === "agent") {
    return AGENT_OFFER_STATUS[status]?.color || AGENT_OFFER_STATUS.pending.color;
  }
};

export const getOfferStatusText = (status,  role = "buyer") => {
  if (role === "buyer") {
    return OFFER_STATUS[status]?.text || status;
  } else if (role === "agent") {
    return AGENT_OFFER_STATUS[status]?.text || status;
  }
  
};

export const getDaysRemaining = (expirationDate) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  const diffTime = expiration - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};


export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getVariantStyles = (variant) => {
  switch (variant) {
    case 'destructive':
      return {
        IconComponent: AlertTriangle,
        iconClassName: "h-6 w-6 text-destructive",
        confirmButton: "bg-destructive text-white hover:bg-destructive/90",
        iconBg: "bg-destructive/10"
      }
    case 'success':
      return {
        IconComponent: CheckCircle,
        iconClassName: "h-6 w-6 text-green-600",
        confirmButton: "bg-green-600 text-white hover:bg-green-700",
        iconBg: "bg-green-100"
      }
    default:
      return {
        IconComponent: Info,
        iconClassName: "h-6 w-6 text-blue-600",
        confirmButton: "bg-blue-600 text-white hover:bg-blue-700",
        iconBg: "bg-blue-100"
      }
  }
}