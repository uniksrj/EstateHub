// components/MetricsGrid.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Building, DollarSign, Target, TrendingDown, TrendingUp, Users } from 'lucide-react';

const MetricsGrid = () => {
  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: '$245.7M',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-4 w-4" />,
      description: 'From last quarter'
    },
    {
      title: 'Active Deals',
      value: '47',
      change: '+8.2%',
      trend: 'up',
      icon: <Building className="h-4 w-4" />,
      description: 'Currently in pipeline'
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+5.1%',
      trend: 'up',
      icon: <Target className="h-4 w-4" />,
      description: 'Deals won vs total'
    },
    {
      title: 'Team Performance',
      value: '84%',
      change: '-2.3%',
      trend: 'down',
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