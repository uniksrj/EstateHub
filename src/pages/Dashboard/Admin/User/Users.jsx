import { TrendingUp, User, UserCheck, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import ActiveVsInactiveUsers from "@/components/admin/users/ActiveVsInactiveUsers";
import UserGrowthChart from "@/components/admin/users/UserGrowthChart";
import UserManagementTable from "@/components/admin/users/UserManagementTable";
import UserRetentionChart from "@/components/admin/users/UserRetentionChart";
import UserRoleDistribution from "@/components/admin/users/UserRoleDistribution";
import DateRangePicker from "@/components/common/DateRangePicker";
import MetricCard from "@/components/common/MetricCard";
import { userAPI } from "@/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/pages/SearchPage/Loading";


export default function UserManagementPage() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch user data based on date range

    useEffect(() => {
        const loadingUsers = async () => {
            setLoading(true);
            try {
                const response = await userAPI.getUser_metrics();
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error loading user:", error);
            } finally {
                setLoading(false);
            }
        }
        loadingUsers();
    }, []);


    if (loading) {
        return (
           <Loading loading={loading} isLineLoader={true} />
        )
    }


    return (
        <div className="flex h-screen bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
                            <p className="text-muted-foreground">Manage users and analyze user growth</p>
                        </div>
                        <DateRangePicker />
                    </div>

                    <div className="space-y-6">
                        {/* User Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <MetricCard title="Total Users" value={userData.metrics.total_users.value.toLocaleString()} change={`${userData.metrics.total_users.change >= 0 ? '+' : ''}${userData.metrics.total_users.change}%`} icon={User} />
                            <MetricCard title="Active Users" value={userData.metrics.active_users.value.toLocaleString()} change={`${userData.metrics.active_users.change >= 0 ? '+' : ''}${userData.metrics.active_users.change}%`} icon={UserCheck} />
                            <MetricCard title="New This Month" value={userData.metrics.new_users_this_month.value.toLocaleString()} change={`${userData.metrics.new_users_this_month.change >= 0 ? '+' : ''}${userData.metrics.new_users_this_month.change}%`} icon={TrendingUp} />
                            <MetricCard title="Conversion Rate" value={`${userData.metrics.conversion_rate.value}%`} change={`${userData.metrics.conversion_rate.change >= 0 ? '+' : ''}${userData.metrics.conversion_rate.change}%`} icon={UserX} />
                        </div>
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList className="bg-muted p-1">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-background">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="management" className="data-[state=active]:bg-background">
                                    User Management
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-6">
                                {/* User Analytics */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <UserGrowthChart value={userData.charts} />
                                    <UserRetentionChart retentionData={userData.charts.retention_rates} />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <ActiveVsInactiveUsers activeInactive={userData.metrics} />
                                    <UserRoleDistribution distributionRole={userData.roles} />
                                </div>
                            </TabsContent>
                            {/* User Table */}
                            <TabsContent value="management" className="space-y-6">
                                <UserManagementTable user_list={userData.user_list} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    )
}