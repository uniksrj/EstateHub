// pages/agent/AgentPipeline.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { userAPI } from '@/services/api';

const AgentPipeline = () => {
    const [pipelineData, setPipelineData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeadDeal();
    }, []);

    const fetchDeadDeal = async () => {
        setLoading(true)
        try {
            const response = await userAPI.get_agent_pipeline();
            console.log(response);

            setPipelineData(response?.data || []);
        } catch (error) {
            console.error("Error:", error)
            setPipelineData([])
        } finally {
            setLoading(false)
        }
    }

    console.log("This is pipe line Details",pipelineData);
    
    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-6 w-6" /></div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Deal Pipeline</CardTitle>
                <CardDescription>Overview of your deals by stage</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="chart-scroll-box">
                    <div className="chart-scroll-inner h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pipelineData?.pipeline || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }  }>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip formatter={(value, name) => [value, name === 'count' ? 'Deals' : 'Value ($)']} />
                                <Bar dataKey="count" name="Deals" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AgentPipeline;
