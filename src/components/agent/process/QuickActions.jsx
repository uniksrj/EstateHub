import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Calendar, FileText, Users, Home, Bell } from "lucide-react";
import { useNavigate } from "react-router";

const QuickActions = () => {
  const navigate = useNavigate()
  const actions = [
    {
      title: "Add New Listing",
      description: "Create a new property listing",
      icon: Plus,
      onClick: () => navigate("/agent/add-property"),
      variant: "default",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Schedule Tour",
      description: "Arrange property viewings",
      icon: Calendar,
      onClick: () => navigate("/agent/schedule"),
      variant: "outline"
    },
    {
      title: "Send Updates",
      description: "Notify clients about progress",
      icon: MessageSquare,
      onClick: () => console.log("Send updates"),
      variant: "outline"
    },
    {
      title: "Generate Contract",
      description: "Create purchase agreements",
      icon: FileText,
      onClick: () => console.log("Generate contract"),
      variant: "outline"
    },
    {
      title: "Add Client",
      description: "Register new client",
      icon: Users,
      onClick: () => console.log("Add client"),
      variant: "outline"
    },
    {
      title: "Market Analysis",
      description: "Run comps analysis",
      icon: Home,
      onClick: () => console.log("Market analysis"),
      variant: "outline"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className={`h-auto py-3 px-2 flex flex-col gap-2 ${action.color || ''}`}
              onClick={action.onClick}
            >
              <action.icon className="size-5" />
              <div className="text-center">
                <div className="font-medium text-sm leading-tight">{action.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;