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
    case 1: return 'bg-red-100 text-red-800 border border-red-200'; // Super Admin
    case 2: return 'bg-indigo-100 text-indigo-800 border border-indigo-200'; // Admin
    case 3: return 'bg-purple-100 text-purple-800 border border-purple-200'; // Agent
    case 4: return 'bg-violet-100 text-violet-800 border border-violet-200'; // Broker
    case 5: return 'bg-orange-100 text-orange-800 border border-orange-200'; // Buyer
    case 6: return 'bg-blue-100 text-blue-800 border border-blue-200'; // Seller
    case 7: return 'bg-amber-100 text-amber-800 border border-amber-200'; // Investor
    case 8: return 'bg-cyan-100 text-cyan-800 border border-cyan-200'; // Renter
    default: return 'bg-gray-100 text-gray-800 border border-gray-200'; // Unknown
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

export const getOfferStatusColor = (status) => {
  const colors = {
    pending: 'bg-warning/20 text-warning border-warning/30',
    accepted: 'bg-success/20 text-success border-success/30',
    rejected: 'bg-destructive/20 text-destructive border-destructive/30',
    counter_offer: 'bg-primary/20 text-primary border-primary/30',
    withdrawn: 'bg-muted text-muted-foreground border-border'
  };
  return colors[status] || colors.pending;
};

export const getOfferStatusText = (status) => {
  const texts = {
    pending: 'Pending Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
    counter_offer: 'Counter Offer',
    withdrawn: 'Withdrawn'
  };
  return texts[status] || status;
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