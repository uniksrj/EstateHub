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
