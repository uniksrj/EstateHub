import { Home, Users, Calendar, TrendingUp } from "lucide-react"
import PerformanceMetrics from "@/components/agent/PerformanceMetrics"
import StatCard from "@/components/common/StatCard";
import { useEffect, useState } from "react";
import { propertiesAPI } from "@/services/api";
import Loading from "@/pages/SearchPage/Loading";

export default function AgentDashboard() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAgentProperties();
  }, []);

  const fetchAgentProperties = async () => {
    setLoading(true)
    try {
      const response = await propertiesAPI.getPropertyListByUser();
      setProperties(response?.data || {});
    } catch (error) {
      console.error("Error:", error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }
  console.log("this is property list", properties);
  const pendingProperties = properties?.data?.data?.filter(p => p.status === "pending").length;
  const totalProperties = properties?.data?.data?.length || 0;
  const activeClients = properties?.agentClientStats?.active_clients || 0;
  const newClientsThisWeek = properties?.agentClientStats?.new_this_week || 0;

  const scheduledTours = 0;
  const commission = 0;



  const stats = [
    { title: "My Properties", value: totalProperties, subtitle: `${pendingProperties} pending approval`, Icon: Home },
    { title: "Active Clients", value: activeClients, subtitle:`+${newClientsThisWeek} new this week`, Icon: Users },
    { title: "Scheduled Tours", value: scheduledTours, subtitle: "This week", Icon: Calendar },
    { title: "Commission", value: `$${commission.toLocaleString()}`, subtitle: "This month", Icon: TrendingUp },
  ];

  if (loading) {
    return <Loading />
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
        <p className="text-muted-foreground">Track your performance and manage listings</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </div>
      <PerformanceMetrics />

    </div>
  )
}
