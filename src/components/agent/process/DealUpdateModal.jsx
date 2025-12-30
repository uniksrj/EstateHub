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
import { useEffect, useReducer, useState } from "react";
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
    ChevronRight,
    Save
} from "lucide-react";
import { processSteps } from "@/data/demoData";
import { toast } from "sonner";
import { userAPI } from "@/services/api";

export const DealUpdateModal = ({ isOpen, onClose, deal, onUpdate }) => {
    // const [progress, setProgress] = useState(deal?.progress || 40);
    // const [status, setStatus] = useState(deal?.status || "contract_generation");
    // const [nextStep, setNextStep] = useState(deal?.nextStep || "Review Purchase Agreement");
    // const [deadline, setDeadline] = useState(deal?.deadline ? new Date(deal.deadline) : null);
    // const [priority, setPriority] = useState(deal?.priority || "high");
    const [notes, setNotes] = useState("");
    // const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [documents, setDocuments] = useState([]);
    // const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    // const [isSaving, setIsSaving] = useState(false);
    // const [pendingUpdates, setPendingUpdates] = useState([]);

    const initialState = {
        progress: deal?.progress || 40,
        status: deal?.status || "contract_generation",
        nextStep: deal?.nextStep || "Review Purchase Agreement",
        deadline: deal?.deadline ? new Date(deal.deadline) : null,
        priority: deal?.priority || "high",

        notes: [],
        selectedDocuments: [],

        isCalendarOpen: false,
        isSaving: false,
        pendingUpdates: []
    };

    function dealReducer(state, action) {
        switch (action.type) {

            case "UPDATE_FIELD":
                return {
                    ...state,
                    [action.field]: action.value
                };

            case "ADD_NOTE":
                return {
                    ...state,
                    notes: [...state.notes, action.value]
                };

            case "ADD_SELECTED_DOCUMENT":
                return {
                    ...state,
                    selectedDocuments: [
                        ...state.selectedDocuments,
                        action.value
                    ]
                };

            case "REMOVE_SELECTED_DOCUMENT":
                return {
                    ...state,
                    selectedDocuments: state.selectedDocuments.filter(
                        doc => doc !== action.id
                    )
                };

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(dealReducer, initialState);
    console.log("this is deal data : ", deal);
    useEffect(() => {
        if (isOpen && deal) {
            fetchDocuments();
            dispatch({ type: "UPDATE_FIELD", field: "progress", value: deal.progress || 40 });
            dispatch({ type: "UPDATE_FIELD", field: "status", value: deal.status || "contract_generation" });
            dispatch({ type: "UPDATE_FIELD", field: "nextStep", value: deal.nextStep || "Review Purchase Agreement" });
            dispatch({ type: "UPDATE_FIELD", field: "deadline", value: deal.deadline ? new Date(deal.deadline) : null });
            dispatch({ type: "UPDATE_FIELD", field: "priority", value: deal.priority || "high" });
            const filteredDocument = documents.map(item => item.document_type);
            dispatch({ type: "UPDATE_FIELD", field: "selectedDocuments", value: filteredDocument });
        }
    }, [isOpen, deal]);

    const fetchDocuments = async () => {
        dispatch({ type: "UPDATE_FIELD", field: "isSaving", value: true });
        try {
            const response = await userAPI.get_document(deal.id);
            setDocuments(response?.data?.document)
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            dispatch({ type: "UPDATE_FIELD", field: "isSaving", value: false });
        }
    };

    if (!deal) return null;

    // Get current step details
    const currentStep = processSteps.find(step => step.key === state.status);
    const currentStepIndex = processSteps.findIndex(step => step.key === state.status);
    
    const hasChanges =
        state.progress !== deal.progress ||
        state.status !== deal.status ||
        state.nextStep !== deal.nextStep ||
        (state.deadline ? format(state.deadline, 'yyyy-MM-dd') : null) !== deal.deadline ||
        state.priority !== deal.priority ||
        // state.notes.find(note => note.stage === state.status) !== deal.notes ||
        state.selectedDocuments.length > 0;
    const pendingUpdatesCount = Object.values(state.pendingUpdates).reduce((count, value) => {
        if (Array.isArray(value)) {
            return count + value.length;
        }
        return count;
    }, 0);
console.log("Current state haschanges Info:", state);
    const handleProgressChange = (value) => {
        const newProgress = value[0];

        const newStageIndex = Math.min(
            Math.floor(newProgress / 20),
            processSteps.length - 1
        );

        const stage_key_item = processSteps[newStageIndex];
        console.log("this is new key  which find :", stage_key_item)
        if (!stage_key_item) return;
        if (newStageIndex > currentStepIndex) {
            const targetStage = processSteps[newStageIndex];
            const result = canAdvanceToStage(targetStage.key);
            if (!result.canAdvance) {
                toast.error(result.message);
                return;
            }
        }
        dispatch({ type: "UPDATE_FIELD", field: "progress", value: newProgress });
        dispatch({ type: "UPDATE_FIELD", field: "nextStep", value: `Complete ${processSteps[newStageIndex].label} requirements` });
        if (newStageIndex !== currentStepIndex) {
            dispatch({ type: "UPDATE_FIELD", field: "status", value: processSteps[newStageIndex].key });
        }
    };

    console.log("Selected Documents:", state.selectedDocuments);
    // Toggle document selection
    const toggleDocument = (docType) => {
        dispatch({
            type: state.selectedDocuments.includes(docType)
                ? "REMOVE_SELECTED_DOCUMENT"
                : "ADD_SELECTED_DOCUMENT",
            ...(state.selectedDocuments.includes(docType)
                ? { id: docType }
                : { value: docType })
        });
    };

    const canAdvanceToStage = (targetStageKey) => {
        const currentStage = processSteps.find(s => s.key === deal.status);
        const targetStage = processSteps.find(s => s.key === targetStageKey);

        if (!currentStage || !targetStage) return true;

        const currentIndex = processSteps.findIndex(s => s.key === deal.status);
        const targetIndex = processSteps.findIndex(s => s.key === targetStageKey);

        if (targetIndex > currentIndex) {
            const requiredDocs = currentStage.requiredDocuments.filter(doc => doc.required);
            const allRequiredReceived = requiredDocs.every(doc =>
                state.selectedDocuments.includes(doc.type)
            );
            if (notes !== "") {
                return {
                    canAdvance: false,
                    message: "Please save the note before advancing the stage."
                };
            }

            if (!allRequiredReceived) {
                return {
                    canAdvance: false,
                    message: "Please upload all required documents before advancing."
                };
            }
            return { canAdvance: true };
        }

        return { canAdvance: true };
    };


    const handleStatusChange = (newStatus) => {
        const newIndex = processSteps.findIndex(step => step.key === newStatus);
        const progressValue = (newIndex + 1) * 20;

        dispatch({ type: "UPDATE_FIELD", field: "status", value: newStatus });
        dispatch({ type: "UPDATE_FIELD", field: "progress", value: progressValue });

        const stage = processSteps[newIndex];
        console.log("Stage info for next step determination:", stage);
        dispatch({ type: "UPDATE_FIELD", field: "nextStep", value: `Complete ${stage.label} requirements` });
        if (stage) {
            const firstRequiredDoc = stage.requiredDocuments.find(doc => doc.required);
            if (firstRequiredDoc && !state.nextStep) {
                dispatch({ type: "UPDATE_FIELD", field: "nextStep", value: `Submit ${firstRequiredDoc.name}` });
            }
        }
    };

    const getCurrentStageCompletion = () => {
        const currentStage = processSteps.find(s => s.key === state.status);
        if (!currentStage) return { completed: 0, total: 0 };

        const requiredDocs = currentStage.requiredDocuments.filter(doc => doc.required);
        const completedDocs = requiredDocs.filter(doc =>
            state.selectedDocuments.includes(doc.type) ||
            (deal.documents_received || []).includes(doc.type)
        );

        return {
            completed: completedDocs.length,
            total: requiredDocs.length,
            percent: Math.round((completedDocs.length / requiredDocs.length) * 100)
        };
    };

    //Handle submit data to backend for saving
    const handleSubmit = async () => {
        dispatch({ type: "UPDATE_FIELD", field: "isSaving", value: true });
        try {
            // Determine if we're advancing to next stage
            const currentIndex = processSteps.findIndex(step => step.key === deal.status);
            const newIndex = processSteps.findIndex(step => step.key === status);

            // Check if we're advancing to next stage
            const isAdvancingStage = newIndex > currentIndex;

            // Prepare update data
            const updateData = {
                progress: state.progress,
                status,
                next_step: state.nextStep,
                deadline: state.deadline ? format(state.deadline, 'yyyy-MM-dd') : null,
                priority: state.priority,
                notes: state.notes.trim() || null,
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
            if (state.selectedDocuments.length > 0) {
                await Promise.all(
                    state.selectedDocuments.map(docType =>
                        userAPI.updateDocumentStatus(deal.id, docType, 'received')
                    )
                );
            }

            // Update parent with new deal data
            const updatedDeal = {
                ...deal,
                ...updateData,
                // Update next step based on new stage
                nextStep: state.nextStep || getDefaultNextStep(status)
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
            dispatch({ type: "UPDATE_FIELD", field: "isSaving", value: false });
        }
    };

    const getDefaultNextStep = (stageKey) => {
        const stage = processSteps.find(s => s.key === stageKey);
        if (!stage) return "Complete paperwork";

        const nextDoc = stage.requiredDocuments.find(doc => doc.required);
        return nextDoc ? `Submit ${nextDoc.name}` : "Complete stage requirements";
    };

    function setPriority(level) {
        dispatch({ type: "UPDATE_FIELD", field: "priority", value: level });
    }

    const quickActions = [
        {
            label: "Mark as Urgent",
            icon: AlertCircle,
            action: () => setPriority("high"),
            variant: state.priority === "high" ? "destructive" : "outline"
        },
        {
            label: "Send Update",
            icon: MessageSquare,
            action: () => window.open(`/messages?deal=${deal.id}`, '_blank'),
            variant: "outline"
        },
    ];

    const completion = getCurrentStageCompletion();
    const currentStepDocuments = currentStep?.requiredDocuments || [];
    const uploadedDocsCount = currentStepDocuments.filter(doc => state.selectedDocuments.includes(doc.type)).length;
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
                            <Label htmlFor="progress">Progress: {state.progress}%</Label>
                            <Badge variant={state.progress >= 80 ? "default" : state.progress >= 50 ? "secondary" : "destructive"}>
                                {state.progress >= 80 ? "Almost Done" : state.progress >= 50 ? "On Track" : "Getting Started"}
                            </Badge>
                        </div>
                        <Slider
                            id="progress"
                            value={[state.progress]}
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
                                    value={state.status}
                                    onChange={(e) => {
                                        const result = canAdvanceToStage(e.target.value);
                                        if (result.canAdvance) {
                                            handleStatusChange(e.target.value);
                                        } else {
                                            toast.error(result.message);
                                        }
                                    }}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-8"
                                >
                                    {processSteps.map((step) => (
                                        <option key={step.key} selected={state.status === step.key} value={step.key}>
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
                                disabled
                                value={state.nextStep}
                                // onChange={(e) => setNextStep(e.target.value)}
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
                                    <Popover open={state.isCalendarOpen} onOpenChange={() => dispatch({ type: "UPDATE_FIELD", field: "isCalendarOpen", value: !state.isCalendarOpen })}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal inline-block",
                                                    !state.deadline && "text-muted-foreground"
                                                )}
                                                disabled
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 inline-block align-middle" />
                                                <span className="inline-block align-middle overflow-x-auto">
                                                    {state.deadline ? format(state.deadline, "PPP") : <span>Pick a date</span>}
                                                </span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={state.deadline}
                                                // onSelect={(date) => {
                                                //     setDeadline(date);
                                                //     setIsCalendarOpen(false);
                                                // }}
                                                initialFocus
                                                disabled
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
                                            variant={state.priority === level ? "default" : "outline"}
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
                                            state.selectedDocuments.includes(doc.type)
                                                ? "bg-primary border-primary"
                                                : "border-input"
                                        )}
                                    >
                                        {state.selectedDocuments.includes(doc.type) && (
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
                        <p className="line-clamp-1">{state.notes.find(note => note.stage === state.status)?.text || ""}</p>
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "ADD_NOTE",
                                    value: {
                                        stage: state.status,
                                        text: notes,
                                        createdAt: new Date()
                                    }
                                });
                                setNotes("");
                            }}
                        >
                            Add Note
                        </Button>
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
                                    const currentIndex = processSteps.findIndex(step => step.key === state.status);
                                    const nextStage = processSteps[currentIndex + 1];
                                    const result = canAdvanceToStage(nextStage.key);
                                    if (nextStage && result.canAdvance) {
                                        handleStatusChange(nextStage.key);
                                    } else {
                                        toast.error(result.message);
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
                        disabled={state.isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleSubmit}
                        disabled={state.isSaving || !hasChanges}
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Step
                    </Button>

                    {/* Bulk Save */}
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={state.isSaving || pendingUpdatesCount === 0}
                        className="col-span-2"
                    >
                        <Send className="h-4 w-4 mr-2" />
                        {pendingUpdatesCount > 0
                            ? `Save All ${pendingUpdatesCount} Changes`
                            : 'Save All Changes'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};