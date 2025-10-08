import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#10b981', '#6b7280'];

export default function ActiveVsInactiveUsers({activeInactive}) {
  const totalUsers = activeInactive ? (activeInactive.active_users.value + activeInactive.inactive_users) : 0;
  const data = activeInactive ? [
    { name: 'Active Users', value: activeInactive.active_users.value },
    { name: 'Inactive Users', value: activeInactive.inactive_users },
  ] : data;
  const activePercentage = ((data[0].value / totalUsers) * 100).toFixed(1);

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm max-h-[420px]">
      <h3 className="text-lg font-semibold text-foreground mb-4">Active vs Inactive Users</h3>
      <div className="flex items-center justify-between">
        <div className="h-64 w-64">
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
                  backgroundColor: '#ffffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  // color: 'var(--foreground)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activePercentage}%</div>
            <div className="text-sm text-muted-foreground">Active Rate</div>
          </div>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium ml-auto">
                  {((item.value / totalUsers) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}