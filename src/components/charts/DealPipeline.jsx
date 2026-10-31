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
        <div className="chart-scroll-box">
          <div className="chart-scroll-inner h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadPipeData?.dealPipeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'value') return [`₹${value} Cr`, 'Total Value'];
                    return [value, 'Number of Deals'];
                  }}
                />
                <Bar dataKey="deals" fill="#3B82F6" name="Deals" radius={[4, 4, 0, 0]} />
                <Bar dataKey="value" fill="#10B981" name="Value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealPipeline;
