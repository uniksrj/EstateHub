import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, FileText, Calendar, Users, Clock, DollarSign } from "lucide-react";

const PriorityTasks = ({ stats, deals }) => {
  const tasks = [
    {
      id: 1,
      title: "Review Counter-Offers",
      description: "2 offers waiting for response",
      icon: FileText,
      priority: "high",
      count: 2,
      deadline: "Today",
      type: "offer"
    },
    {
      id: 2,
      title: "Schedule Inspections",
      description: "3 properties need inspection dates",
      icon: Calendar,
      priority: "high",
      count: 3,
      deadline: "Tomorrow",
      type: "inspection"
    },
    {
      id: 3,
      title: "Client Follow-ups",
      description: "5 clients need updates",
      icon: Users,
      priority: "medium",
      count: 5,
      deadline: "This week",
      type: "followup"
    },
    {
      id: 4,
      title: "Contract Deadlines",
      description: "1 deadline approaching",
      icon: Clock,
      priority: "high",
      count: 1,
      deadline: "Tomorrow",
      type: "contract"
    },
    {
      id: 5,
      title: "EMD Verification",
      description: "2 deposits to confirm",
      icon: DollarSign,
      priority: "medium",
      count: 2,
      deadline: "Today",
      type: "deposit"
    }
  ];

  const getPriorityColor = (priority) => {
    return priority === "high" ? "text-red-500" : "text-amber-500";
  };

  const getPriorityVariant = (priority) => {
    return priority === "high" ? "destructive" : "secondary";
  };

  const handleTaskClick = (taskId) => {
    console.log(`Task ${taskId} clicked`);
    // Implement task handling logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Tasks</CardTitle>
        <CardDescription>Items requiring your attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors"
            onClick={() => handleTaskClick(task.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getPriorityColor(task.priority)} bg-opacity-10`}>
                <task.icon className={`size-4 ${getPriorityColor(task.priority)}`} />
              </div>
              <div>
                <div className="font-medium text-sm">{task.title}</div>
                <div className="text-xs text-muted-foreground">{task.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Due: {task.deadline}</span>
                </div>
              </div>
            </div>
            <Badge variant={getPriorityVariant(task.priority)} className="ml-2">
              {task.count}
            </Badge>
          </div>
        ))}
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            View All Tasks
          </Button>
          <Button className="flex-1">
            Mark All Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityTasks;