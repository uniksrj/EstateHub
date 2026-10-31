// components/properties/charts/PropertyTypesChart.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Building } from 'lucide-react';
import { useChartColors } from '@/hooks/useTheme';

const PropertyTypesChart = ({ data = [] }) => {  
  const colors = useChartColors(); 

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const color = item.color || payload[0].color || 'var(--primary)';
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-foreground">{item.name}</p>
          <p className="text-sm" style={{ color }}>
            Count: {item.value}
          </p>
        </div>
      );
    }
    return null;
  };

  const safeData = data || [];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Property Types
        </CardTitle>
        <CardDescription>Distribution of properties by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-scroll-box">
          <div className="chart-scroll-inner h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={safeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {safeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}  
                      fill={entry.color || colors[index % colors.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyTypesChart;
