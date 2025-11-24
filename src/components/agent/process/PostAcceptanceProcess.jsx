import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, ClipboardCheck, Shield, Mail, Users, Home, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { processPostProcessSteps } from "@/data/demoData";

const PostAcceptanceProcess = () => {

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { variant: "default", label: "Completed", icon: CheckCircle2 },
      active: { variant: "secondary", label: "In Progress", icon: Clock },
      pending: { variant: "outline", label: "Upcoming", icon: AlertCircle }
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    const StatusIcon = statusInfo.icon;

    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <StatusIcon className="size-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post-Acceptance Process</CardTitle>
        <CardDescription>Step-by-step guide after counter-offer acceptance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {processPostProcessSteps.map((step) => {
            const StepIcon = step.icon;

            return (
              <div key={step.step} className={`border-l-4 ${step.color} pl-4 py-3 rounded-r-lg`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${step.iconColor} bg-opacity-10`}>
                      <StepIcon className={`size-5 ${step.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {/* {getStatusBadge(step.status)} */}
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-3">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Tasks:</h5>
                    <ul className="text-sm space-y-1">
                      {step.tasks.map((task, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className={`size-1 rounded-full ${step.iconColor} bg-current opacity-50`} />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 mr-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Duration:</span>
                      <span>{step.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Responsible:</span>
                      <span>{step.responsible}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostAcceptanceProcess;