import { Home, Target, AlertCircle, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react";
import { propertiesAPI, userAPI } from "@/services/api";
import { Loading } from "@/pages/misc/Loading";
import StatCard from "@/components/agent/StatCard";
import PerformanceMetrics from "@/components/agent/PerformanceMetrics";
import DealPipeline from "@/components/agent/process/DealPipeline";
import RecentActivity from "@/components/agent/process/RecentActivity";
import QuickActions from "@/components/agent/process/QuickActions";
import PriorityTasks from "@/components/agent/process/PriorityTasks";
import PostAcceptanceProcess from "@/components/agent/process/PostAcceptanceProcess";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/utils/userHelpers";

export default function AgentDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDeals, setActiveDeals] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalProperties: 0,
    pendingProperties: 0,
    underContract: 0,
    activeClients: 0,
    newClientsThisWeek: 0,
    urgentTasks: 0,
    scheduledTours: 0,
    commission: 0,
    dealsInProgress: 0
  });

  useEffect(() => {
    fetchAgentProperties();
    fetchActiveDeals();
  }, []);

  const fetchAgentProperties = async () => {
    setLoading(true)
    try {
      const response = await propertiesAPI.getPropertyListByUser();
      setProperties(response?.data || {});
      calculateDashboardStats(response?.data);
    } catch (error) {
      console.error("Error:", error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  const fetchActiveDeals = async () => {
    setLoading(true)
    try {
      const response = await userAPI.get_deal_list();
      setActiveDeals(response?.data || []);
    } catch (error) {
      console.error("Error:", error)
      setActiveDeals([]);
    } finally {
      setLoading(false)
    }
  }

    const handleUpdateDeal = (updatedDeal) => {
    setActiveDeals(prevDeals =>
      prevDeals.map(deal =>
        Number(deal.id) === Number(updatedDeal.id)
          ? updatedDeal
          : deal
      )
    );
  };

  const calculateDashboardStats = (propertiesData) => {
    const propertiesList = propertiesData?.data?.data || [];
    const pendingProperties = propertiesList.filter(p => p.status === "pending").length;
    const underContract = propertiesList.filter(p => p.status === "under_contract" || p.status === "pending_sale").length;
    const urgentTasks = propertiesList.filter(p =>
      p.status === "under_contract" ||
      p.status === "counter_offer"
    ).length;

    setDashboardStats({
      totalProperties: propertiesList.length,
      pendingProperties,
      underContract,
      activeClients: propertiesData?.agentClientStats?.active_clients || 0,
      newClientsThisWeek: propertiesData?.agentClientStats?.new_this_week || 0,
      urgentTasks: urgentTasks + 3,
      scheduledTours: 5,
      commission: 12500,
      dealsInProgress: underContract + activeDeals.length
    });
  };

  const stats = [
    {
      title: "Total Listings",
      value: dashboardStats.totalProperties,
      subtitle: `${dashboardStats.underContract} under contract`,
      Icon: Home,
      trend: "up"
    },
    {
      title: "Active Deals",
      value: dashboardStats.dealsInProgress,
      subtitle: "In contract phase",
      Icon: Target,
      trend: "up"
    },
    {
      title: "Priority Tasks",
      value: dashboardStats.urgentTasks,
      subtitle: "Need attention",
      Icon: AlertCircle,
      iconColor: "text-amber-500",
      trend: "neutral"
    },
    {
      title: "This Month's Commission",
      value: formatCurrency(dashboardStats.commission),
      subtitle: "Estimated",
      Icon: TrendingUp,
      trend: "up"
    },
  ];

  if (loading) {
    return <Loading loading={loading} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
          <p className="text-muted-foreground">Manage your listings, deals, and performance</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics Grid - Always Visible */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB - Just 2 main components */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <DealPipeline deals={activeDeals} loading={loading} setActiveDeals={handleUpdateDeal}/>
            <RecentActivity />
          </div>
        </TabsContent>

        {/* DEALS TAB - Focused on deal process */}
        <TabsContent value="deals" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <DealPipeline deals={activeDeals} />
            <PostAcceptanceProcess />
          </div>
        </TabsContent>

        {/* TASKS TAB - Focused on actions */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <PriorityTasks stats={dashboardStats} deals={activeDeals} />
            <QuickActions />
          </div>
        </TabsContent>

        {/* PERFORMANCE TAB - Focused on analytics */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6">
            <PerformanceMetrics />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
