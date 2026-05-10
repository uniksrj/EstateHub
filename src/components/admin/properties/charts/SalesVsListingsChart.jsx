// components/properties/charts/SalesVsListingsChart.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTooltip from '@/components/ui/CustomTooltip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SalesVsListingsChart = ({ data = [] }) => {
  console.log("data sales :", data);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Sales vs Listings Ratio</CardTitle>
        <CardDescription>Conversion rate analysis and monthly performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-scroll-box">
          <div className="chart-scroll-inner h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
          </div>
        </div>

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
              {(() => {
                const totalSales = data.reduce((sum, m) => sum + (Number(m.sales) || 0), 0);
                const totalListings = data.reduce((sum, m) => sum + (Number(m.listings) || 0), 0);

                if (totalListings === 0) return "N/A"; 
                const conversionRate = (totalSales / totalListings) * 100;

                return `${conversionRate.toFixed(1)}%`;
              })()}
            </p>
            <p className="text-sm text-muted-foreground">Avg Conversion</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesVsListingsChart;
