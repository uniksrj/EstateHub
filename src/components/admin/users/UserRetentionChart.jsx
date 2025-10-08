import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


// const retentionData = [
//   { week: 'Week 1', retained: 95, churned: 5 },
//   { week: 'Week 2', retained: 85, churned: 15 },
//   { week: 'Week 3', retained: 78, churned: 22 },
//   { week: 'Week 4', retained: 72, churned: 28 },
//   { week: 'Week 8', retained: 65, churned: 35 },
//   { week: 'Week 12', retained: 58, churned: 42 },
// ];

export default function UserRetentionChart({retentionData}) {  

  const chartData = useMemo(()=>{
    if(!retentionData || retentionData.length === 0){
      return [];
    }
    if (typeof retentionData === 'object' && !Array.isArray(retentionData)) {
      return Object.values(retentionData);
    }
    return retentionData;
  },[retentionData]);

  if(!chartData || chartData.length === 0){
    return <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">User Retention Rate</h3>
      <div className="text-muted-foreground">No retention data available.</div>
    </div>
  }
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">User Retention Rate</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30  stroke-border" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12 }}
              tickLine={false}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              stroke="var(--muted-foreground)"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, '']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--foreground)'
              }}
            />
            <Legend />
            <Bar
              dataKey="retained"
              fill="#10b981"
              name="Retained Users"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="churned"
              fill="#ef4444"
              name="Churned Users"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}