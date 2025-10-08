import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



export default function UserRoleDistribution({distributionRole}) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">User Role Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distributionRole} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30 stroke-border" />
            <XAxis 
              dataKey="role" 
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
              formatter={(value) => [value.toLocaleString(), 'Users']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #aaafb6ff',
                borderRadius: '6px',
                color: '#000',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                padding: '10px'
              }}
            />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
            >
              {distributionRole.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {distributionRole.map((item) => (
          <div key={item.role} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">{item.role}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{item.count.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {((item.count / distributionRole.reduce((sum, r) => sum + r.count, 0)) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}