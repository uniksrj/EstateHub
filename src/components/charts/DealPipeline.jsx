// components/DealPipeline.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const DealPipeline = ({ deadPipeData }) => {  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal Pipeline</CardTitle>
        <CardDescription>
          Current deals by stage in the pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deadPipeData?.dealPipeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'value') return [`$${value}M`, 'Total Value'];
                return [value, 'Number of Deals'];
              }}
            />
            <Bar dataKey="deals" fill="#3b82f6" name="Deals" />
            <Bar dataKey="value" fill="#8b5cf6" name="Value" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DealPipeline;