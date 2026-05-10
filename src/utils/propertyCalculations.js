
// Calculate all dashboard metrics from properties array
export const calculatePropertyMetrics = (properties) => {
    
  if (!properties || !Array.isArray(properties)) {
    return getDefaultMetrics();
  }
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter properties for current month sales
  const soldThisMonth = properties.filter(property => {
    if (!property.sold_at) return false;
    const soldDate = new Date(property.sold_at);
    return soldDate.getMonth() === currentMonth && 
           soldDate.getFullYear() === currentYear;
  });

  // Filter properties for last month sales (for growth calculation)
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const soldLastMonth = properties.filter(property => {
    if (!property.sold_at) return false;
    const soldDate = new Date(property.sold_at);
    return soldDate.getMonth() === lastMonth && 
           soldDate.getFullYear() === lastMonthYear;
  });

  // Total properties count
  const totalProperties = properties.length;

  // Active listings (properties with status 'for_sale')
  const activeListings = properties.filter(property => 
    property.status === 'for_sale'
  ).length;

  // Sold properties count for this month
  const soldThisMonthCount = soldThisMonth.length;

  // Total portfolio value (sum of all property prices)
  const totalPortfolioValue = properties.reduce((sum, property) => {
    return sum + parseFloat(property.price || 0);
  }, 0);

  // Average price
  const averagePrice = totalProperties > 0 ? totalPortfolioValue / totalProperties : 0;

  // Occupancy rate (properties that are sold vs total)
  const soldProperties = properties.filter(property => 
    property.status === 'sold' || property.sold_at
  ).length;
  const occupancyRate = totalProperties > 0 ? (soldProperties / totalProperties) * 100 : 0;

  // Growth calculations
  const propertiesGrowth = calculateGrowth(totalProperties, properties.length - soldThisMonthCount);
  const salesGrowth = calculateGrowth(soldThisMonthCount, soldLastMonth.length);

  return {
    totalProperties,
    activeListings,
    soldThisMonth: soldThisMonthCount,
    totalValue: totalPortfolioValue,
    averagePrice,
    occupancyRate,
    propertiesGrowth,
    salesGrowth
  };
};

// Calculate percentage growth
export const calculateGrowth = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

// Get property type distribution
export const getPropertyTypeDistribution = (properties) => {
  const typeCounts = properties.reduce((acc, property) => {
    const type = property.property_type || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const total = properties.length;
  
  return Object.entries(typeCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: (value / total) * 100,
    count: value
  }));
};

// Get monthly trends data
export const getMonthlyTrends = (properties) => {
    console.log("inside function :",properties);
    
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const currentYear = new Date().getFullYear();
  
  const monthlyData = months.map((month, index) => {
    const monthProperties = properties.filter(property => {
      if (!property.created_at) return false;
      const createdDate = new Date(property.created_at);
      return createdDate.getMonth() === index && 
             createdDate.getFullYear() === currentYear;
    });

    const monthSales = properties.filter(property => {
      if (!property.sold_at) return false;
      const soldDate = new Date(property.sold_at);
      return soldDate.getMonth() === index && 
             soldDate.getFullYear() === currentYear;
    });

    const monthlyRevenue = monthSales.reduce((sum, property) => {
      return sum + parseFloat(property.sale_price || property.price || 0);
    }, 0);

    return {
      month,
      listings: monthProperties.length,
      sales: monthSales.length,
      revenue: monthlyRevenue
    };
  });

  return monthlyData;
};

// Get location distribution
export const getLocationDistribution = (properties) => {
  const cityCounts = properties.reduce((acc, property) => {
    const city = property.city || 'Unknown';
    if (!acc[city]) {
      acc[city] = {
        properties: 0,
        totalPrice: 0
      };
    }
    acc[city].properties++;
    acc[city].totalPrice += parseFloat(property.price || 0);
    return acc;
  }, {});

  return Object.entries(cityCounts).map(([location, data]) => ({
    location,
    properties: data.properties,
    avgPrice: data.properties > 0 ? data.totalPrice / data.properties : 0
  }));
};

const getDefaultMetrics = () => ({
  totalProperties: 0,
  activeListings: 0,
  soldThisMonth: 0,
  totalValue: 0,
  averagePrice: 0,
  occupancyRate: 0,
  propertiesGrowth: 0,
  salesGrowth: 0
});