import DeadDealAnalysis from "@/components/charts/DeadDealAnalysis";
import MetricsGrid from "@/components/charts/MetricsGrid";
import RecentActivity from "@/components/charts/RecentActivity";
import DealPipeline from "@/components/charts/DealPipeline";
import { useEffect, useState } from "react";
import { superAdminAPI } from "@/services/api";
import Loading from "@/pages/SearchPage/Loading";

export default function AdminDashboard() {
    const [propertiesData, setPropertiesData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPropertiesData = async () => {
            setLoading(true);
            try {
                const response = await superAdminAPI.getAllProperties({});
                setPropertiesData(response.data);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching properties data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPropertiesData();
    }, []);
    
    if (loading) {
        return (
            <Loading loading={loading} isLineLoader={true} />
        )
    }
    
    return (
        <>
            <div className="flex h-screen bg-background">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            <MetricsGrid metricsData={propertiesData?.metrics}/>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <DealPipeline deadPipeData={propertiesData?.charts}/>
                                <RecentActivity activities={propertiesData?.activity.original?.activities}/>
                            </div>
                        </div>
                        <hr className="my-6" />
                        <DeadDealAnalysis />
                    </main>
                </div>
            </div>
        </>
    );
}
