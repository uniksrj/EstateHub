// components/agent/process/DealUpdateModal.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import {
    CalendarIcon,
    ChevronUp,
    ChevronDown,
    Clock,
    AlertCircle,
    CheckCircle,
    Upload,
    MessageSquare,
    Send,
    FileText,
    X
} from "lucide-react";
import { processSteps } from "@/data/demoData";
import { toast } from "sonner";

export const DealUpdateModal = ({ isOpen, onClose, deal, onUpdate }) => {
    console.log("DealUpdateModal opened for deal:", deal);
    const [progress, setProgress] = useState(deal?.progress || 40);
    const [status, setStatus] = useState(deal?.status || "earnest_money");
    const [nextStep, setNextStep] = useState(deal?.nextStep || "Review Purchase Agreement");
    const [deadline, setDeadline] = useState(deal?.deadline ? new Date(deal.deadline) : null);
    const [priority, setPriority] = useState(deal?.priority || "high");
    const [notes, setNotes] = useState("");
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (!deal) return null;

    // Get current step details
    const currentStep = processSteps.find(step => step.key === status);
    const currentStepIndex = processSteps.findIndex(step => step.key === status);

    // Handle progress change with stage adjustment
    const handleProgressChange = (value) => {
        setProgress(value[0]);

        // Auto-suggest stage based on progress
        const newStageIndex = Math.floor(value[0] / 20);
        if (newStageIndex !== currentStepIndex && newStageIndex < processSteps.length) {
            setStatus(processSteps[newStageIndex].key);
        }
    };

    // Handle status change with progress adjustment
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        const newIndex = processSteps.findIndex(step => step.key === newStatus);
        setProgress((newIndex + 1) * 20);
    };

    // Toggle document selection
    const toggleDocument = (docType) => {
        setSelectedDocuments(prev =>
            prev.includes(docType)
                ? prev.filter(doc => doc !== docType)
                : [...prev, docType]
        );
    };

    // Submit update
    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            // Prepare update data
            const updateData = {
                progress,
                status,
                nextStep,
                deadline: deadline ? format(deadline, 'yyyy-MM-dd') : null,
                priority,
                notes: notes.trim() ? notes : null,
                updatedAt: new Date().toISOString()
            };

            // Here you would call your API
            // await userAPI.updateDeal(deal.id, updateData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Call parent update
            if (typeof onUpdate === 'function') {
                onUpdate({
                    ...deal,
                    ...updateData
                });
            }

            toast.success("Deal updated successfully");

            // Auto-generate message if notes exist
            if (notes.trim()) {
                toast.info("Consider sending update to clients via Messages");
            }

            onClose();
        } catch (error) {
            toast.error("Failed to update deal");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    // Quick action buttons
    const quickActions = [
        {
            label: "Mark as Urgent",
            icon: AlertCircle,
            action: () => setPriority("high"),
            variant: priority === "high" ? "destructive" : "outline"
        },
        {
            label: "Send Update",
            icon: MessageSquare,
            action: () => window.open(`/messages?deal=${deal.id}`, '_blank'),
            variant: "outline"
        },
        {
            label: "Upload Doc",
            icon: Upload,
            action: () => window.open(`/documents/upload?deal=${deal.id}`, '_blank'),
            variant: "outline"
        }
    ];

    // Document checklist for current step
    const currentStepDocuments = currentStep?.requiredDocuments || [];
    const uploadedDocsCount = currentStepDocuments.filter(doc => selectedDocuments.includes(doc.type)).length;
    const requiredDocsCount = currentStepDocuments.filter(doc => doc.required).length;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Quick Update - {deal.address}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                    {/* Progress Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="progress">Progress: {progress}%</Label>
                            <Badge variant={progress >= 80 ? "default" : progress >= 50 ? "secondary" : "destructive"}>
                                {progress >= 80 ? "Almost Done" : progress >= 50 ? "On Track" : "Getting Started"}
                            </Badge>
                        </div>
                        <Slider
                            id="progress"
                            value={[progress]}
                            onValueChange={handleProgressChange}
                            max={100}
                            step={5}
                            className="w-full"
                        />
                    </div>

                    {/* Status & Next Step */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Current Stage</Label>
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    {processSteps.map((step) => (
                                        <option key={step.key} value={step.key}>
                                            {step.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Next Step</Label>
                            <input
                                type="text"
                                value={nextStep}
                                onChange={(e) => setNextStep(e.target.value)}
                                placeholder="Enter next action..."
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            />
                        </div>
                    </div>

                    {/* Deadline & Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Deadline</Label>
                            <div className="overflow-x-auto whitespace-nowrap">
                                <div className="inline-block min-w-full">
                                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal inline-block",
                                                    !deadline && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 inline-block align-middle" />
                                                <span className="inline-block align-middle overflow-x-auto">
                                                    {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                                                </span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={deadline}
                                                onSelect={(date) => {
                                                    setDeadline(date);
                                                    setIsCalendarOpen(false);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <div className="overflow-x-auto">
                                <div className="flex gap-2 pb-1" style={{ minWidth: "calc(3 * 80px + 2 * 8px)" }}>
                                    {["low", "medium", "high"].map((level) => (
                                        <Button
                                            key={level}
                                            type="button"
                                            size="sm"
                                            variant={priority === level ? "default" : "outline"}
                                            onClick={() => setPriority(level)}
                                            className="flex-1 capitalize min-w-[80px]"
                                        >
                                            {level}
                                            {level === "high" && <AlertCircle className="ml-1 h-3 w-3" />}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Document Checklist */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Documents ({uploadedDocsCount}/{requiredDocsCount})
                            </Label>
                            <Badge variant={uploadedDocsCount >= requiredDocsCount ? "default" : "destructive"}>
                                {uploadedDocsCount >= requiredDocsCount ? "Complete" : "Pending"}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            {currentStepDocuments.map((doc) => (
                                <div
                                    key={doc.type}
                                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleDocument(doc.type)}
                                        className={cn(
                                            "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                                            selectedDocuments.includes(doc.type)
                                                ? "bg-primary border-primary"
                                                : "border-input"
                                        )}
                                    >
                                        {selectedDocuments.includes(doc.type) && (
                                            <CheckCircle className="h-3 w-3 text-primary-foreground" />
                                        )}
                                    </button>
                                    <span className="text-sm font-medium flex-1">{doc.name}</span>
                                    {doc.required && (
                                        <Badge variant="destructive" className="text-xs">
                                            Required
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Notes */}
                    <div className="space-y-2">
                        <Label>Quick Notes</Label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add internal notes or client update..."
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                        <Label className="text-sm text-muted-foreground">Quick Actions</Label>
                        <div className="flex flex-wrap gap-2">
                            {quickActions.map((action) => (
                                <Button
                                    key={action.label}
                                    type="button"
                                    variant={action.variant}
                                    size="sm"
                                    onClick={action.action}
                                    className="flex items-center gap-2"
                                >
                                    <action.icon className="h-3 w-3" />
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="flex-1 gap-2"
                    >
                        {isSaving ? (
                            <>
                                <Clock className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Save & Update
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};