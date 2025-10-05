// components/DealLossReasons.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Financing Issues', value: 35 },
  { name: 'Price Disagreement', value: 25 },
  { name: 'Property Condition', value: 15 },
  { name: 'Timing Issues', value: 12 },
  { name: 'Competitive Offers', value: 8 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

const DealLossReasons = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DealLossReasons;