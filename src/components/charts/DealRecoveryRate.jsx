// components/DealRecoveryRate.jsx
import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const recoveryData = [
  { type: 'Commercial', recoveryRate: 22, total: 45 },
  { type: 'Residential', recoveryRate: 15, total: 68 },
  { type: 'Industrial', recoveryRate: 28, total: 23 },
  { type: 'Land', recoveryRate: 12, total: 34 },
  { type: 'Mixed Use', recoveryRate: 19, total: 28 },
];

const DealRecoveryRate = () => {
  return (
    <div className="chart-scroll-box">
      <div className="chart-scroll-inner h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={recoveryData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 30]} />
            <YAxis type="category" dataKey="type" width={80} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'recoveryRate') return [`${value}%`, 'Recovery Rate'];
                return [value, 'Total Dead Deals'];
              }}
            />
            <Bar dataKey="recoveryRate" name="recoveryRate">
              {recoveryData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.recoveryRate > 20 ? '#10b981' : entry.recoveryRate > 15 ? '#f59e0b' : '#ef4444'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DealRecoveryRate;
