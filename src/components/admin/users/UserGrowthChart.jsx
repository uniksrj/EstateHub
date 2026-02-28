import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function UserGrowthChart({value}) {
  return (
    <div className="bg-card p-6 rounded-lg border  border-border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">User Growth</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-md">Day</button>
          <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">Week</button>
          <button className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-md">Month</button>
        </div>
      </div>
      <div className="chart-scroll-box">
        <div className="chart-scroll-inner h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={value.monthly_growth}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30 stroke-border" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                stroke="var(--muted-foreground)"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                stroke="var(--muted-foreground)"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: ' 1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--foreground)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="var(--color-count)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-count)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--primary)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
