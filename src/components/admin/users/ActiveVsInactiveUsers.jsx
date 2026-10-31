import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#10B981', '#94A3B8'];

export default function ActiveVsInactiveUsers({activeInactive}) {
  const totalUsers = activeInactive ? (activeInactive.active_users.value + activeInactive.inactive_users) : 0;
  const data = activeInactive ? [
    { name: 'Active Users', value: activeInactive.active_users.value },
    { name: 'Inactive Users', value: activeInactive.inactive_users },
  ] : [];
  const activePercentage = totalUsers > 0 ? ((data[0]?.value / totalUsers) * 100).toFixed(1) : 0;

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm max-h-[420px]">
      <h3 className="text-lg font-semibold text-foreground mb-4">Active vs Inactive Users</h3>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="chart-scroll-box w-full">
          <div className="chart-scroll-inner h-64 w-full max-w-[320px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value.toLocaleString(), 'Users']}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--foreground)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{activePercentage}%</div>
            <div className="text-sm text-muted-foreground">Active Rate</div>
          </div>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium ml-auto">
                  {totalUsers > 0 ? ((item.value / totalUsers) * 100).toFixed(1) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
