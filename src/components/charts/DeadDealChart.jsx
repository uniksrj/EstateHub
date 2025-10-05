// components/DeadDealChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', deadDeals: 12, valueLost: 3.2, avgDealSize: 267 },
  { month: 'Feb', deadDeals: 9, valueLost: 2.8, avgDealSize: 311 },
  { month: 'Mar', deadDeals: 14, valueLost: 4.1, avgDealSize: 293 },
  { month: 'Apr', deadDeals: 11, valueLost: 3.5, avgDealSize: 318 },
  { month: 'May', deadDeals: 13, valueLost: 3.9, avgDealSize: 300 },
  { month: 'Jun', deadDeals: 10, valueLost: 3.0, avgDealSize: 300 },
  { month: 'Jul', deadDeals: 15, valueLost: 4.5, avgDealSize: 300 },
  { month: 'Aug', deadDeals: 12, valueLost: 3.6, avgDealSize: 300 },
  { month: 'Sep', deadDeals: 16, valueLost: 4.8, avgDealSize: 300 },
  { month: 'Oct', deadDeals: 14, valueLost: 4.2, avgDealSize: 300 },
  { month: 'Nov', deadDeals: 11, valueLost: 3.3, avgDealSize: 300 },
  { month: 'Dec', deadDeals: 15, valueLost: 4.5, avgDealSize: 300 },
];

const DeadDealChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'valueLost') return [`$${value}M`, 'Value Lost'];
            if (name === 'avgDealSize') return [`$${value}K`, 'Avg Deal Size'];
            return [value, 'Dead Deals'];
          }}
        />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="deadDeals" 
          stroke="#ef4444" 
          activeDot={{ r: 8 }} 
          name="Dead Deals"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="valueLost" 
          stroke="#8b5cf6" 
          name="Value Lost"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="avgDealSize" 
          stroke="#10b981" 
          name="Avg Deal Size"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeadDealChart;