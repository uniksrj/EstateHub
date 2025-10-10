// components/properties/OverviewCards.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, TrendingUp, DollarSign } from 'lucide-react';

const OverviewCards = ({ data=[] }) => {

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatGrowth = (growth)=>{
      if(growth === 0) return '0% from last month';
      const sign = growth > 0 ? '+' : "";
      return `${sign}${Math.abs(growth).toFixed(0)}% from last month`;
  }

  const getGrowthColor = (growth) =>{
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-muted-foreground';    
  }




  const cards = [
    {
      title: 'Total Properties',
      value: formatNumber(data?.totalProperties || 0),
      description: formatGrowth(data?.propertiesGrowth || 0),
      icon: Building,
      groth : data?.propertiesGrowth || 0
    },
    {
      title: 'Active Listings',
      value: formatNumber(data?.activeListings || 0),
      description: `${data?.occupancyRate.toFixed(1)}% occupancy rate`,
      icon: Home,
    },
    {
      title: 'Sold This Month',
      value: formatNumber(data?.soldThisMonth || 0),
      description: formatGrowth(data?.salesGrowth || 0),
      icon: TrendingUp,
      growth : data?.salesGrowth
    },
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(data?.totalValue || 0),
      description: `Avg: ${formatCurrency(data?.averagePrice || 0)}`,
      icon: DollarSign,
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <p className={`text-xs ${getGrowthColor(card.growth)}`}>{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;