// components/properties/charts/LocationDistributionChart.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.name === 'Avg Price' ? formatCurrency(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LocationDistributionChart = ({ data }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Distribution
        </CardTitle>
        <CardDescription>Property distribution and average prices by location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-scroll-box">
          <div className="chart-scroll-inner h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="properties" 
                  stroke="var(--chart-3)" 
                  fill="var(--chart-3)" 
                  fillOpacity={0.3}
                  name="Properties"
                />
                <Area 
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="var(--chart-4)" 
                  fill="var(--chart-4)" 
                  fillOpacity={0.3}
                  name="Avg Price"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDistributionChart;
