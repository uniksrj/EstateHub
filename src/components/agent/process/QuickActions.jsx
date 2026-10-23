import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Calendar, FileText, Users, Home } from "lucide-react";
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
      color: ""
    },
    {
      title: "Schedule Tour",
      description: "Arrange property viewings",
      icon: Calendar,
      onClick: () => navigate("/agent/schedule"),
      variant: "outline"
    },
    {
      title: "Client inquiries",
      description: "Reply to client messages",
      icon: MessageSquare,
      onClick: () => navigate("/agent/inquiries"),
      variant: "outline"
    },
    {
      title: "Generate Contract",
      description: "Track active transactions",
      icon: FileText,
      onClick: () => navigate("/agent/pipeline"),
      variant: "outline"
    },
    {
      title: "Add Client",
      description: "View your client list",
      icon: Users,
      onClick: () => navigate("/agent/clients"),
      variant: "outline"
    },
    {
      title: "Browse listings",
      description: "Explore current properties",
      icon: Home,
      onClick: () => navigate("/properties"),
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
