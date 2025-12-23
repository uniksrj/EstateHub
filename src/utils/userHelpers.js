import { AGENT_OFFER_STATUS, OFFER_STATUS } from "@/constants/offerTypes";
import { AlertCircle, AlertOctagon, AlertTriangle, Ban, Building, Calendar, CheckCircle, CheckCircle2, CircleCheckBig, ClipboardCheck, Clock, DollarSign, Download, FileText, Info, Mail, PenTool, Shield, Upload } from "lucide-react";

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
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-gray-400"
  }
}

export const getScheduleStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return Clock;
    case "approved":
      return CheckCircle;
    case "completed":
      return CircleCheckBig;
    case "cancelled":
      return Ban;
    case "rejected":
      return AlertOctagon;
    default:
      return null;
  }
};

export const getOfferStatusColor = (status, role = "buyer") => {
  if (role === "buyer") {
    return OFFER_STATUS[status]?.color || OFFER_STATUS.pending.color;
  } else if (role === "agent") {
    return AGENT_OFFER_STATUS[status]?.color || AGENT_OFFER_STATUS.pending.color;
  }
};

export const getOfferStatusText = (status, role = "buyer") => {
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

export const getAgentStatusInfo = (status) => {
  const statusMap = {
    contract_generation: {
      label: "Contract Phase",
      icon: FileText,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description: "Generating and reviewing purchase agreement"
    },
    earnest_money: {
      label: "EMD Processing",
      icon: DollarSign,
      color: "bg-amber-100 text-amber-800 border-amber-200",
      description: "Processing earnest money deposit"
    },
    inspection: {
      label: "Inspection",
      icon: ClipboardCheck,
      color: "bg-purple-100 text-purple-800 border-purple-200",
      description: "Scheduling and completing inspections"
    },
    mortgage: {
      label: "Mortgage",
      icon: Shield,
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Mortgage processing and approval"
    },
    closing: {
      label: "Closing",
      icon: CheckCircle2,
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description: "Finalizing closing details"
    }
  };
  return statusMap[status] || { label: status, icon: FileText, color: "bg-gray-100 text-gray-800" };
};

export const getDaysUntilDeadline = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getStatusBadge = (status) => {
  const variants = {
    completed: { variant: "default", label: "Completed" },
    active: { variant: "secondary", label: "In Progress" },
    pending: { variant: "outline", label: "Pending" },
    urgent: { variant: "destructive", label: "Action Required" }
  };
  return variants[status] || variants.pending;
};

export const getTypeColor = (type) => {
  const colors = {
    document_upload: "text-blue-500",
    document_signed: "text-green-500",
    document_request: "text-amber-500",
    step_completed: "text-green-500",
    step_started: "text-blue-500",
    payment_received: "text-green-500",
    payment_due: "text-red-500",
    message_sent: "text-blue-500",
    deadline_approaching: "text-amber-500",
    inspection_scheduled: "text-purple-500",
    appraisal_ordered: "text-indigo-500"
  };
  return colors[type] || "text-gray-500";
};

export const getTypeIcon = (type) => {
  const icons = {
    document_upload: Upload,
    document_signed: PenTool,
    document_request: Download,
    step_completed: CheckCircle2,
    step_started: Clock,
    payment_received: DollarSign,
    payment_due: AlertCircle,
    message_sent: Mail,
    deadline_approaching: AlertCircle,
    inspection_scheduled: Calendar,
    appraisal_ordered: Building
  };
  return icons[type] || CheckCircle2;
}; 