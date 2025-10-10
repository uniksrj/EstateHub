// components/properties/charts/SalesVsListingsChart.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Demo data for sales vs listings
const demoData = [
  { month: 'Jan', listings: 45, sales: 12, conversionRate: 26.7 },
  { month: 'Feb', listings: 52, sales: 18, conversionRate: 34.6 },
  { month: 'Mar', listings: 48, sales: 15, conversionRate: 31.3 },
  { month: 'Apr', listings: 61, sales: 22, conversionRate: 36.1 },
  { month: 'May', listings: 58, sales: 25, conversionRate: 43.1 },
  { month: 'Jun', listings: 65, sales: 28, conversionRate: 43.1 },
  { month: 'Jul', listings: 72, sales: 32, conversionRate: 44.4 },
  { month: 'Aug', listings: 68, sales: 29, conversionRate: 42.6 },
  { month: 'Sep', listings: 75, sales: 35, conversionRate: 46.7 },
  { month: 'Oct', listings: 82, sales: 38, conversionRate: 46.3 },
  { month: 'Nov', listings: 78, sales: 34, conversionRate: 43.6 },
  { month: 'Dec', listings: 85, sales: 42, conversionRate: 49.4 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
            {entry.dataKey === 'conversionRate' && '%'}
          </p>
        ))}
        {payload.length >= 2 && (
          <p className="text-sm text-muted-foreground mt-1">
            Conversion: {((payload[1].value / payload[0].value) * 100).toFixed(1)}%
          </p>
        )}
      </div>
    );
  }
  return null;
};

const SalesVsListingsChart = ({ data = demoData }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Sales vs Listings Ratio</CardTitle>
        <CardDescription>Conversion rate analysis and monthly performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[0, 50]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="listings" 
              stroke="var(--chart-1)" 
              strokeWidth={2}
              name="Listings"
              dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 4 }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="sales" 
              stroke="var(--chart-2)" 
              strokeWidth={2}
              name="Sales"
              dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 4 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversionRate" 
              stroke="var(--chart-5)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Conversion Rate %"
              dot={{ fill: "var(--chart-5)", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {data.reduce((sum, month) => sum + month.listings, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Listings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {data.reduce((sum, month) => sum + month.sales, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Sales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {((data.reduce((sum, month) => sum + month.sales, 0) / data.reduce((sum, month) => sum + month.listings, 0)) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground">Avg Conversion</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesVsListingsChart;