import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const performanceData = [
  { month: "Jan", sales: 3, views: 120 },
  { month: "Feb", sales: 5, views: 145 },
  { month: "Mar", sales: 4, views: 132 },
  { month: "Apr", sales: 7, views: 168 },
  { month: "May", sales: 6, views: 152 },
  { month: "Jun", sales: 8, views: 189 },
]

const chartConfig = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
  views: { label: "Views", color: "hsl(var(--chart-2))" },
}
const PerformanceMetrics = () => {
    return (
        <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Your sales and property views over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
                <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
}

export default PerformanceMetrics;