// components/agent/process/DealManagementModal.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  X, FileText, DollarSign, ClipboardCheck, Shield, CheckCircle2, 
  Calendar, User, Phone, Mail, Download, Upload, MessageSquare 
} from "lucide-react";

export const DealManagementModal = ({ deal, isOpen, onClose, onUpdate }) => {   
  if (!deal) return null;

  const processSteps = [
    { key: "contract_generation", label: "Contract", icon: FileText, color: "blue" },
    { key: "earnest_money", label: "Earnest Money", icon: DollarSign, color: "amber" },
    { key: "inspection", label: "Inspection", icon: ClipboardCheck, color: "purple" },
    { key: "mortgage", label: "Mortgage", icon: Shield, color: "green" },
    { key: "closing", label: "Closing", icon: CheckCircle2, color: "emerald" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] h-[90vh] max-w-none">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Manage Deal - {deal.address}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full pr-4 max-h-[70vh] ">
          <div className="space-y-6">
            {/* Deal Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Price & Terms</h4>
                <p className="text-2xl font-bold text-green-600">{deal.price}</p>
                <p className="text-sm">Accepted: {new Date(deal.acceptedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold">Parties</h4>
                <p className="text-sm"><User className="inline size-4 mr-1" />Buyer: {deal.buyer}</p>
                <p className="text-sm"><User className="inline size-4 mr-1" />Seller: {deal.seller}</p>
              </div>
              <div>
                <h4 className="font-semibold">Progress</h4>
                <Progress value={deal.progress} className="h-2 my-1" />
                <p className="text-sm">{deal.progress}% Complete</p>
              </div>
            </div>

            {/* Process Timeline */}
            <div className="space-y-3">
              <h4 className="font-semibold">Process Steps</h4>
              {processSteps.map((step) => {
                const isCurrent = deal.status === step.key;
                const isCompleted = deal.progress > processSteps.findIndex(s => s.key === step.key) * 25;
                
                return (
                  <div key={step.key} className={`flex items-center gap-3 p-3 border rounded-lg ${
                    isCurrent ? 'border-primary bg-primary/5' : ''
                  }`}>
                    <step.icon className={`size-5 ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={isCurrent ? 'font-semibold' : ''}>{step.label}</span>
                        {isCurrent && <Badge variant="secondary">Current</Badge>}
                        {isCompleted && <CheckCircle2 className="size-4 text-green-500" />}
                      </div>
                      {isCurrent && (
                        <p className="text-sm text-muted-foreground">Next: {deal.nextStep}</p>
                      )}
                    </div>
                    <Button size="sm" variant={isCurrent ? "default" : "outline"}>
                      {isCurrent ? "Mark Complete" : "View"}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="size-4" />
                Message Clients
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="size-4" />
                Schedule Event
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="size-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="size-4" />
                Download Package
              </Button>
            </div>

            {/* Contact Info */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-sm">Buyer</h5>
                  <p className="text-sm">{deal.buyer}</p>
                  <div className="flex gap-2 mt-1">
                    <Button size="sm" variant="ghost">
                      <Phone className="size-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Mail className="size-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Seller</h5>
                  <p className="text-sm">{deal.seller}</p>
                  <div className="flex gap-2 mt-1">
                    <Button size="sm" variant="ghost">
                      <Phone className="size-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Mail className="size-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};