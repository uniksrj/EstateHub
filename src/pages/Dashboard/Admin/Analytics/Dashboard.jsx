import DeadDealAnalysis from "@/components/charts/DeadDealAnalysis";
import MetricsGrid from "@/components/charts/MetricsGrid";
import RecentActivity from "@/components/charts/RecentActivity";
import DealPipeline from "@/components/charts/DealPipeline";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { betaFeedbackAPI, superAdminAPI } from "@/services/api";
import Loading from "@/pages/SearchPage/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bug, Inbox, MessageSquareWarning } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
    const { user } = useAuth();
    const [propertiesData, setPropertiesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newFeedbackCount, setNewFeedbackCount] = useState(0);
    const [totalFeedbackCount, setTotalFeedbackCount] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const requests = [superAdminAPI.getAllProperties({})];

                if (user?.role_id === 1) {
                    requests.push(betaFeedbackAPI.getAll({ per_page: 100 }));
                    requests.push(betaFeedbackAPI.getAll({ status: "new", per_page: 100 }));
                }

                const responses = await Promise.all(requests);
                const propertiesResponse = responses[0];

                setPropertiesData(propertiesResponse.data);

                if (user?.role_id === 1) {
                    const allFeedbackResponse = responses[1];
                    const newFeedbackResponse = responses[2];
                    const allFeedbackList = Array.isArray(allFeedbackResponse.data?.data) ? allFeedbackResponse.data.data : [];
                    const newFeedbackList = Array.isArray(newFeedbackResponse.data?.data) ? newFeedbackResponse.data.data : [];
                    setTotalFeedbackCount(allFeedbackResponse.data?.total ?? allFeedbackList.length);
                    setNewFeedbackCount(newFeedbackResponse.data?.total ?? newFeedbackList.length);
                } else {
                    setTotalFeedbackCount(0);
                    setNewFeedbackCount(0);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [user?.role_id]);
    
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
                            {user?.role_id === 1 && (
                                <Card className="border-border bg-card">
                                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Bug className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">Beta Feedback Inbox</CardTitle>
                                                    <p className="text-sm text-muted-foreground">
                                                        Review bug reports and tester messages submitted across the beta.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="border-border">
                                                <Inbox className="mr-1 h-3.5 w-3.5" />
                                                {totalFeedbackCount} reports
                                            </Badge>
                                            {newFeedbackCount > 0 && (
                                                <Badge className="bg-primary text-primary-foreground">
                                                    <MessageSquareWarning className="mr-1 h-3.5 w-3.5" />
                                                    {newFeedbackCount} new
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Open the feedback queue to update status, review screenshots, and follow beta issues.
                                        </p>
                                        <Button asChild>
                                            <Link to="/dashboard/beta-feedback">Open Feedback Inbox</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
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
