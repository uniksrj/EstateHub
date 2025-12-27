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
import { useEffect, useState } from "react";
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
    X,
    ChevronRight
} from "lucide-react";
import { processSteps } from "@/data/demoData";
import { toast } from "sonner";
import { userAPI } from "@/services/api";

export const DealUpdateModal = ({ isOpen, onClose, deal, onUpdate }) => {
    console.log("DealUpdateModal opened for deal:", deal);
    const [progress, setProgress] = useState(deal?.progress || 40);
    const [status, setStatus] = useState(deal?.status || "contract_generation");
    const [nextStep, setNextStep] = useState(deal?.nextStep || "Review Purchase Agreement");
    const [deadline, setDeadline] = useState(deal?.deadline ? new Date(deal.deadline) : null);
    const [priority, setPriority] = useState(deal?.priority || "high");
    const [notes, setNotes] = useState("");
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen && deal) {
            fetchDocuments();
            setProgress(deal.progress || 40);
            setStatus(deal.status || "contract_generation");
            setNextStep(deal.nextStep || "Review Purchase Agreement");
            setDeadline(deal.deadline ? new Date(deal.deadline) : null);
            setPriority(deal.priority || "high");
            const statusValues = documents.map(item => item.document_type);
            setSelectedDocuments(statusValues);
        }
    }, [isOpen, deal]);
    console.log("this is selected documents :", selectedDocuments);
    const fetchDocuments = async () => {
        setIsSaving(true)
        try {
            const response = await userAPI.get_document(deal.id);
            setDocuments(response?.data?.document)
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!deal) return null;

    // Get current step details
    const currentStep = processSteps.find(step => step.key === status);
    const currentStepIndex = processSteps.findIndex(step => step.key === status);

    // Handle progress change with stage adjustment
    const handleProgressChange = (value) => {
        setProgress(value[0]);

        // Auto-suggest stage based on progress
        const newStageIndex = Math.floor(value[0] / 20);
        console.log("this is new stage index : ", newStageIndex)
        if (newStageIndex !== currentStepIndex && newStageIndex < processSteps.length) {
            setStatus(processSteps[newStageIndex].key);
        }
    };

    // Toggle document selection
    const toggleDocument = (docType) => {
        console.log("Selected Documents :", docType)
        setSelectedDocuments(prev =>
            prev.includes(docType)
                ? prev.filter(doc => doc !== docType)
                : [...prev, docType]
        );
    };

    const canAdvanceToStage = (targetStageKey) => {
        const currentStage = processSteps.find(s => s.key === deal.status);
        const targetStage = processSteps.find(s => s.key === targetStageKey);

        if (!currentStage || !targetStage) return true;

        // Get current stage index
        const currentIndex = processSteps.findIndex(s => s.key === deal.status);
        const targetIndex = processSteps.findIndex(s => s.key === targetStageKey);
        // Can only move forward if completing current stage
        if (targetIndex > currentIndex) {
            const requiredDocs = currentStage.requiredDocuments.filter(doc => doc.required);
            const allRequiredReceived = requiredDocs.every(doc =>
                selectedDocuments.includes(doc.type)
            );
            return allRequiredReceived;
        }

        // Can always move backward
        return true;
    };


    const handleStatusChange = (newStatus) => {
        const newIndex = processSteps.findIndex(step => step.key === newStatus);
        const progressValue = (newIndex + 1) * 20;

        setStatus(newStatus);
        setProgress(progressValue);

        // Auto-set next step suggestion
        const stage = processSteps[newIndex];
        if (stage) {
            const firstRequiredDoc = stage.requiredDocuments.find(doc => doc.required);
            if (firstRequiredDoc && !nextStep) {
                setNextStep(`Submit ${firstRequiredDoc.name}`);
            }
        }
    };

    const getCurrentStageCompletion = () => {
        const currentStage = processSteps.find(s => s.key === status);
        if (!currentStage) return { completed: 0, total: 0 };

        const requiredDocs = currentStage.requiredDocuments.filter(doc => doc.required);
        const completedDocs = requiredDocs.filter(doc =>
            selectedDocuments.includes(doc.type) ||
            (deal.documents_received || []).includes(doc.type)
        );

        return {
            completed: completedDocs.length,
            total: requiredDocs.length,
            percent: Math.round((completedDocs.length / requiredDocs.length) * 100)
        };
    };
    const completion = getCurrentStageCompletion();

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            // Determine if we're advancing to next stage
            const currentIndex = processSteps.findIndex(step => step.key === deal.status);
            const newIndex = processSteps.findIndex(step => step.key === status);

            // Check if we're advancing to next stage
            const isAdvancingStage = newIndex > currentIndex;

            // Prepare update data
            const updateData = {
                progress,
                status,
                next_step: nextStep,
                deadline: deadline ? format(deadline, 'yyyy-MM-dd') : null,
                priority,
                notes: notes.trim() || null,
                updated_at: new Date().toISOString()
            };

            // If moving to next stage, mark current stage as complete
            if (isAdvancingStage) {
                updateData.completed_stages = [
                    ...(deal.completed_stages || []),
                    deal.status
                ];
            }

            // Call your API to update the deal
            await userAPI.updateDeal(deal.id, updateData);

            // If documents were marked as received, update them too
            if (selectedDocuments.length > 0) {
                await Promise.all(
                    selectedDocuments.map(docType =>
                        userAPI.updateDocumentStatus(deal.id, docType, 'received')
                    )
                );
            }

            // Update parent with new deal data
            const updatedDeal = {
                ...deal,
                ...updateData,
                // Update next step based on new stage
                nextStep: nextStep || getDefaultNextStep(status)
            };

            if (onUpdate) {
                onUpdate(updatedDeal);
            }

            toast.success(isAdvancingStage ?
                `Advanced to ${processSteps[newIndex]?.label}` :
                "Deal updated successfully"
            );

            onClose();

        } catch (error) {
            toast.error("Failed to update deal");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper function to get default next step for a stage
    const getDefaultNextStep = (stageKey) => {
        const stage = processSteps.find(s => s.key === stageKey);
        if (!stage) return "Complete paperwork";

        const nextDoc = stage.requiredDocuments.find(doc => doc.required);
        return nextDoc ? `Submit ${nextDoc.name}` : "Complete stage requirements";
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
    console.log("this is status from :", deal);

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
                    {completion.total > 0 && (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Stage Completion</span>
                                <span>{completion.percent}%</span>
                            </div>
                            <Progress value={completion.percent} className="h-1" />
                        </div>
                    )}
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
                                    onChange={(e) => {
                                        if (canAdvanceToStage(e.target.value)) {
                                            handleStatusChange(e.target.value);
                                        } else {
                                            toast.error("Complete all required documents for current stage first");
                                        }
                                    }}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-8"
                                >
                                    {processSteps.map((step) => (
                                        <option key={step.key} selected={status === step.key} value={step.key}>
                                            {step.label}
                                        </option>
                                    ))}
                                </select>

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
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const currentIndex = processSteps.findIndex(step => step.key === status);
                                    const nextStage = processSteps[currentIndex + 1];
                                    if (nextStage && canAdvanceToStage(nextStage.key)) {
                                        handleStatusChange(nextStage.key);
                                    } else {
                                        toast.error("Cannot advance - complete current stage requirements");
                                    }
                                }}
                                disabled={status === processSteps[processSteps.length - 1].key}
                                className="flex items-center gap-2"
                            >
                                <ChevronRight className="h-4 w-4" />
                                Advance to Next Stage
                            </Button>
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