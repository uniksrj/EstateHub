import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, ClipboardCheck, Shield, Mail, Users, Home, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const PostAcceptanceProcess = () => {
  const processSteps = [
    {
      step: 1,
      title: "Contract Generation",
      status: "active",
      description: "Generate and execute purchase agreement",
      tasks: [
        "Prepare formal contract documents",
        "Review all terms and conditions",
        "Coordinate e-signatures from all parties",
        "Distribute executed copies",
        "Update property status to 'Under Contract'"
      ],
      icon: FileText,
      color: "border-l-blue-500 bg-blue-50",
      iconColor: "text-blue-600",
      duration: "1-2 days",
      responsible: "Agent & Attorney"
    },
    {
      step: 2,
      title: "Earnest Money Deposit",
      status: "pending",
      description: "Collect and verify good faith deposit",
      tasks: [
        "Send EMD instructions to buyer",
        "Verify wire transfer receipt",
        "Confirm with title company",
        "Update system with receipt date",
        "Send confirmation to all parties"
      ],
      icon: DollarSign,
      color: "border-l-amber-500 bg-amber-50",
      iconColor: "text-amber-600",
      duration: "3-5 days",
      responsible: "Buyer & Title Company"
    },
    {
      step: 3,
      title: "Property Inspection",
      status: "pending",
      description: "Schedule and complete property inspections",
      tasks: [
        "Coordinate inspection schedule",
        "Attend inspection with buyer",
        "Review inspection report",
        "Negotiate repairs if needed",
        "Document all findings"
      ],
      icon: ClipboardCheck,
      color: "border-l-purple-500 bg-purple-50",
      iconColor: "text-purple-600",
      duration: "7-10 days",
      responsible: "Agent & Inspector"
    },
    {
      step: 4,
      title: "Mortgage Processing",
      status: "pending",
      description: "Manage buyer's loan approval process",
      tasks: [
        "Connect buyer with preferred lenders",
        "Submit required documentation",
        "Track appraisal schedule",
        "Monitor underwriting progress",
        "Secure final loan commitment"
      ],
      icon: Shield,
      color: "border-l-green-500 bg-green-50",
      iconColor: "text-green-600",
      duration: "21-30 days",
      responsible: "Buyer & Lender"
    },
    {
      step: 5,
      title: "Closing Preparation",
      status: "pending",
      description: "Finalize all closing details",
      tasks: [
        "Schedule closing date with all parties",
        "Review closing disclosure",
        "Coordinate with title company",
        "Prepare for final walkthrough",
        "Confirm all documents are ready"
      ],
      icon: CheckCircle2,
      color: "border-l-emerald-500 bg-emerald-50",
      iconColor: "text-emerald-600",
      duration: "3-5 days",
      responsible: "Agent & Title Company"
    }
  ];

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

  const handleStartStep = (stepNumber) => {
    console.log(`Starting step ${stepNumber}`);
    // Implement step initiation logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post-Acceptance Process</CardTitle>
        <CardDescription>Step-by-step guide after counter-offer acceptance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {processSteps.map((step) => {
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
                  {getStatusBadge(step.status)}
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
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Duration:</span>
                      <span>{step.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Responsible:</span>
                      <span>{step.responsible}</span>
                    </div>
                    
                    {step.status === "active" && (
                      <Button 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => handleStartStep(step.step)}
                      >
                        Start This Step
                      </Button>
                    )}
                    
                    {step.status === "pending" && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-2"
                        disabled
                      >
                        Start When Ready
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary rounded-full">
              <CheckCircle2 className="size-4 text-primary-foreground" />
            </div>
            <div>
              <h5 className="font-medium text-sm mb-1">💡 Pro Tip</h5>
              <p className="text-xs text-muted-foreground">
                Send automated status updates to both buyer and seller after completing each step 
                to maintain transparency and reduce inquiries. Use the notification system to keep 
                all parties informed throughout the process.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostAcceptanceProcess;