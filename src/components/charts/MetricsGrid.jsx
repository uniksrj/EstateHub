// components/MetricsGrid.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Building, DollarSign, Target, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { formatNumber } from '@/utils/userHelpers';

const MetricsGrid = ({ metricsData }) => {
  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: formatNumber(metricsData?.overview?.totalValue),
      change: `${metricsData?.overview?.valueGrowth?.change}%`,
      trend: metricsData?.overview?.valueGrowth?.trend,
      icon: <DollarSign className="h-4 w-4" />,
      description: 'From last quarter'
    },
    {
      title: 'Active Deals',
      value: metricsData?.overview?.activeListings,
      change: `${metricsData?.overview?.activeDeals?.change}%`,
      trend: metricsData?.overview?.activeDeals?.trend,
      icon: <Building className="h-4 w-4" />,
      description: 'Currently in pipeline'
    },
    {
      title: 'Conversion Rate',
      value: metricsData?.overview?.conversionRate?.value || '0%',
      change: `${metricsData?.overview?.conversionRate?.change}%`,
      trend: metricsData?.overview?.conversionRate?.trend,
      icon: <Target className="h-4 w-4" />,
      description: 'Deals won vs total'
    },
    {
      title: 'Team Performance',
      value: metricsData?.overview?.teamPerformance?.value || '0%',
      change: `${metricsData?.overview?.teamPerformance?.change}%`,
      trend: metricsData?.overview?.teamPerformance?.trend,
      icon: <Users className="h-4 w-4" />,
      description: 'Against quarterly targets'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>
              <span className="text-muted-foreground ml-1">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;