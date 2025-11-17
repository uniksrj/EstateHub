import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, DollarSign, FileText, ClipboardCheck, Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "offer",
      message: "Counter-offer accepted for 123 Main St",
      time: "2 hours ago",
      status: "completed",
      icon: CheckCircle2,
      color: "text-green-500",
      property: "123 Main Street"
    },
    {
      id: 2,
      type: "inspection",
      message: "Home inspection scheduled for 456 Oak Ave",
      time: "5 hours ago",
      status: "pending",
      icon: Clock,
      color: "text-amber-500",
      property: "456 Oak Avenue"
    },
    {
      id: 3,
      type: "mortgage",
      message: "Mortgage contingency deadline tomorrow",
      time: "1 day ago",
      status: "urgent",
      icon: AlertCircle,
      color: "text-red-500",
      property: "789 Pine Road"
    },
    {
      id: 4,
      type: "closing",
      message: "Earnest deposit received for 789 Pine Rd",
      time: "2 days ago",
      status: "completed",
      icon: DollarSign,
      color: "text-green-500",
      property: "789 Pine Road"
    },
    {
      id: 5,
      type: "contract",
      message: "Purchase agreement sent for 123 Main St",
      time: "3 hours ago",
      status: "completed",
      icon: FileText,
      color: "text-blue-500",
      property: "123 Main Street"
    },
    {
      id: 6,
      type: "deposit",
      message: "Earnest money received for 456 Oak Ave",
      time: "1 day ago",
      status: "completed",
      icon: DollarSign,
      color: "text-green-500",
      property: "456 Oak Avenue"
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      completed: { variant: "default", label: "Completed" },
      pending: { variant: "secondary", label: "Pending" },
      urgent: { variant: "destructive", label: "Urgent" }
    };
    return variants[status] || variants.pending;
  };

  const getTypeIcon = (type) => {
    const icons = {
      offer: CheckCircle2,
      inspection: ClipboardCheck,
      mortgage: Shield,
      closing: DollarSign,
      contract: FileText,
      deposit: DollarSign
    };
    return icons[type] || CheckCircle2;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const statusInfo = getStatusBadge(activity.status);
          const ActivityIcon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-full ${activity.color} bg-opacity-10`}>
                <ActivityIcon className={`size-4 ${activity.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium leading-tight">{activity.message}</p>
                  <Badge variant={statusInfo.variant} className="text-xs ml-2">
                    {statusInfo.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.property}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        <Button variant="outline" className="w-full">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;