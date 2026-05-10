import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const performanceData = [
  { month: "Jan", sales: 3, views: 120, deals: 2 },
  { month: "Feb", sales: 5, views: 145, deals: 4 },
  { month: "Mar", sales: 4, views: 132, deals: 3 },
  { month: "Apr", sales: 7, views: 168, deals: 5 },
  { month: "May", sales: 6, views: 152, deals: 4 },
  { month: "Jun", sales: 8, views: 189, deals: 6 },
];

const dealStageData = [
  { stage: "Offer Made", count: 3 },
  { stage: "Under Contract", count: 4 },
  { stage: "Inspection", count: 2 },
  { stage: "Mortgage", count: 3 },
  { stage: "Closing", count: 1 },
];

const chartConfig = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
  views: { label: "Views", color: "hsl(var(--chart-2))" },
  deals: { label: "Deals", color: "hsl(var(--chart-3))" },
};

const PerformanceMetrics = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Sales and property views over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--color-sales)" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="var(--color-views)" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline Status</CardTitle>
          <CardDescription>Current deals by stage</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-deals)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;