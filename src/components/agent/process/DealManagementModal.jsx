// components/agent/process/DealManagementModal.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import {
  X, FileText, CheckCircle2, ChevronDown, ChevronUp,
  Calendar, User, Download, Upload, MessageSquare,
  Eye, CheckCircle, Clock, AlertCircle, Plus,
  CalendarIcon
} from "lucide-react";
import { processSteps } from "@/data/demoData";
import ViewDocumentModal from "../deal/ViewDocumentModal";
import UploadDocumentModal from "../deal/UploadDocumentModal";
import { userAPI } from "@/services/api";
import { toast } from "sonner";
import { DeadlineStatusBadge } from "../DeadlineStatusBadge";
import { DeadlineExtensionPanel } from "../deal/DeadlineExtensionPanel";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export const DealManagementModal = ({ isOpen, onClose, deal, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("process");
  const [expandedStep, setExpandedStep] = useState(deal?.status || null);
  const [documents, setDocuments] = useState([]);
  const [uploadModal, setUploadModal] = useState({ open: false, documentType: null });
  const [viewModal, setViewModal] = useState({ open: false, document: null });
  const [loading, setLoading] = useState(true);
  const [extensionAdded, handleExtensionAdded] = useState(true);
  const [missedDeadline, setMissedDeadline] = useState(deal?.deadline_status === 'missed');
  const [extraFields, setExtraFields] = useState({
    earnestAmount: '',
    earnestPaymentMethod: '',
    earnestReference: '',
    earnestStatus: '',
    earnestDueDate: null,
    earnestReceivedDate: null
  });

  // Fetch documents when modal opens
  useEffect(() => {
    if (isOpen && deal) {
      fetchDocuments();
      setExpandedStep(deal.status);
      setMissedDeadline(deal?.deadline_status === 'missed');
    }
  }, [isOpen, deal]);

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const response = await userAPI.get_document(deal.id);
      setDocuments(response?.data?.document)
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Deal Data :", deal);

  const handleUploadComplete = (newDocument) => {
    setDocuments(prev => [...prev, newDocument]);
    if (typeof onUpdate === 'function') {
      onUpdate({ ...deal });
    }
  };

  const handleMarkComplete = async (stepKey) => {
    const step = processSteps.find(s => s.key === stepKey);
    const requiredDocs = step.requiredDocuments.filter(doc => doc.required);
    const uploadedDocs = documents.filter(doc =>
      requiredDocs.some(req => req.type === doc.document_type)
    );

    if (uploadedDocs.length < requiredDocs.length) {
      alert(`Please upload all required documents for ${step.label} before marking complete.`);
      return;
    }
    try {
      const resp = await userAPI.changeStep(deal.id, stepKey);
      console.log("response from chnage status data :", resp)
      const nextStep = getNextStep(stepKey);
      console.log("Next Step Key :", nextStep)
      toast.success(`${step.label} marked as complete.`);
      onUpdate(prevDeals =>
        prevDeals.map(d =>
          d.id === deal.id
            ? {
              ...d,
              status: nextStep,
              progress: resp?.data?.percentage
            }
            : d
        )
      );

      setExpandedStep(nextStep);
    } catch (error) {
      console.error("something went wrong!", error)
      toast("something went wrong!" + error.message)
    }

  };

  const handleUpdate = async () => {
    try {
      const payload = {
        earnest_amount: extraFields.earnestAmount,
        earnest_payment_method: extraFields.earnestPaymentMethod,
        earnest_reference: extraFields.earnestReference,
        earnest_status: extraFields.earnestStatus,
        earnest_due_date: extraFields.earnestDueDate ? format(new Date(extraFields.earnestDueDate), 'yyyy-MM-dd') : null,
        earnest_received_date: extraFields.earnestReceivedDate ? format(new Date(extraFields.earnestReceivedDate), 'yyyy-MM-dd') : null,
      };
      await userAPI.update_earnest_deal(deal.id, payload);
    } catch (error) {
      console.error("Error updating earnest money details:", error);
      toast.error("Error updating earnest money details: " + error.message);
    }
  };

  const getNextStep = (currentStep) => {
    const currentIndex = processSteps.findIndex(step => step.key === currentStep);
    return processSteps[currentIndex + 1]?.key || 'closed';
  };

  const getStepDocuments = (stepKey) => {
    console.log("Getting documents for step:", documents);
    const step = processSteps.find(s => s.key === stepKey);
    return step.requiredDocuments.map(reqDoc => {
      const uploadedDoc = documents.find(doc => doc.document_type === reqDoc.type);
      // console.log("Getting documents for step:", uploadedDoc);
      return {
        ...reqDoc,
        uploaded: !!uploadedDoc,
        document: uploadedDoc,
      };
    });
  };

  const toggleStep = (stepKey) => {
    setExpandedStep(expandedStep === stepKey ? null : stepKey);
  };

  const handleUploadClick = (documentType, e) => {

    e.stopPropagation();
    setUploadModal({ open: true, documentType });
  };

  const handleViewClick = (document, e) => {

    e.stopPropagation();
    setViewModal({ open: true, document });
  };

  if (!deal) return null;

  const DocumentStatus = ({ document }) => {
    if (document.uploaded) {
      return (
        <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="size-3" />
          Uploaded
        </Badge>
      );
    }

    if (document.required) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="size-3" />
          Required
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Clock className="size-3" />
        Optional
      </Badge>
    );
  };
  console.log("This is after add next step data :", deal);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] h-[90vh] max-w-none">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex mt-4">Manage Deal - {deal?.address}</span>
              <div className="flex gap-2 mt-4">
                <Button
                  variant={activeTab === "process" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("process")}
                >
                  Process
                </Button>
                <Button
                  variant={activeTab === "documents" ? "default" : "outline"}
                  size="sm"
                  disabled={missedDeadline}
                  onClick={() => setActiveTab("documents")}
                >
                  Documents
                </Button>
              </div>
            </DialogTitle>
            <div className="flex items-center gap-3">
              <DeadlineStatusBadge status={deal?.deadline_status} />
            </div>
          </DialogHeader>
          <ScrollArea className="h-full pr-4 max-h-[70vh]">
            {deal?.deadline_status === 'missed' && (
              <DeadlineExtensionPanel
                deal={deal}
                onExtensionAdded={handleExtensionAdded}
                setMissedDeadline={setMissedDeadline}
              />
            )}
            {activeTab === "process" && (
              <div className="space-y-4">
                {/* Deal Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-card shadow-sm">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Price & Terms</h4>
                    <p className="text-2xl font-bold text-green-600 mt-1">{deal?.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">Accepted: {new Date(deal?.acceptedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Parties</h4>
                    <p className="text-sm mt-1 flex items-center gap-1"><User className="size-3" />Buyer: {deal?.buyer}</p>
                    <p className="text-sm mt-1 flex items-center gap-1"><User className="size-3" />Seller: {deal?.seller}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Progress</h4>
                    <Progress value={deal?.progress} className="h-2 mt-2 mb-1" />
                    <p className="text-xs text-muted-foreground">{deal?.progress}% Complete</p>
                  </div>
                </div>

                {/* Process Timeline */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Process Steps</h4>
                  <div className="space-y-3">
                    {processSteps.map((step) => {
                      const isCurrent = deal?.status === step.key;
                      const isCompleted = deal?.progress > processSteps.findIndex(s => s.key === step.key) * 20;
                      const isExpanded = expandedStep === step.key;
                      const stepDocuments = getStepDocuments(step.key);
                      const allRequiredUploaded = stepDocuments.filter(d => d.required).every(d => d.uploaded);
                      const pendingCount = stepDocuments.filter(d => d.required && !d.uploaded).length;

                      return (
                        <div
                          key={step.key}
                          className={`
                            border rounded-lg transition-all duration-300 ease-in-out overflow-hidden 
                            ${isCurrent ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200'}
                            ${isExpanded ? 'bg-card shadow-md' : 'hover:bg-primary-foreground'}
                          `}
                        >
                          {/* Step Header */}
                          <div
                            className="flex items-center gap-3 p-4 cursor-pointer transition-colors duration-200"
                            onClick={() => toggleStep(step.key)}
                          >
                            <div className={`
                              p-2 rounded-full transition-colors duration-200 
                              ${isCurrent ? 'bg-primary text-primary-foreground' :
                                isCompleted ? 'bg-green-100 text-green-600' :
                                  'bg-gray-100 text-gray-500'}
                            `}>
                              <step.icon className="size-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`
                                  font-medium truncate
                                  ${isCurrent ? 'text-primary' :
                                    isCompleted ? 'text-green-700' :
                                      'text-gray-700'}
                                `}>
                                  {step.label}
                                </span>
                                <div className="flex items-center gap-2 ml-2">
                                  {isCurrent && (
                                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                      Current
                                    </Badge>
                                  )}
                                  {isCompleted && (
                                    <CheckCircle2 className="size-4 text-green-500 flex-shrink-0" />
                                  )}
                                </div>
                              </div>

                              {isCurrent && (
                                <p className="text-sm text-muted-foreground mt-1 truncate">
                                  {allRequiredUploaded ?
                                    "✅ Ready to complete" :
                                    `📋 ${pendingCount} document${pendingCount !== 1 ? 's' : ''} pending`
                                  }
                                </p>
                              )}
                            </div>

                            <div className={`
                              transition-transform duration-300 ease-in-out flex-shrink-0
                              ${isExpanded ? 'rotate-180' : 'rotate-0'}
                            `}>
                              <ChevronDown className="size-4 text-muted-foreground" />
                            </div>
                          </div>

                          {/* Step Content */}
                          <div className={`
                            transition-all duration-300 ease-in-out overflow-y-auto
                            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                          `}>
                            <div className="px-4 pb-4 border-t pt-4 space-y-4">
                              {/* Action Buttons */}
                              <div className="flex gap-2 justify-end">
                                {isCurrent && (
                                  <Button
                                    size="sm"
                                    variant={allRequiredUploaded ? "default" : "outline"}
                                    disabled={!allRequiredUploaded}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMarkComplete(step.key);
                                    }}
                                    className="transition-all duration-200"
                                  >
                                    {allRequiredUploaded ? (
                                      <>
                                        <CheckCircle2 className="size-4 mr-1" />
                                        Complete Step
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="size-4 mr-1" />
                                        Need Documents
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>

                              {/* Documents List */}
                              <div>
                                <h5 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
                                  <FileText className="size-4" />
                                  Required Documents
                                </h5>
                                <div className="space-y-2">
                                  {stepDocuments.map((doc) => {
                                    const isMarkedReceived = documents.find(d => String(d.document_type) === String(doc.type) && d.marked_received_at !== null);  
                                    console.log("Document Received Status :", missedDeadline);                                  
                                    const titleTXT = isMarkedReceived ? "This document has been received in onsite documentation process." : missedDeadline ? "Cannot upload document until deadline extension is added." : "";
                                    return (
                                      <div
                                        key={doc.type}
                                        className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg transition-colors duration-200 hover:bg-muted/50"
                                      >
                                        <div className="flex items-center gap-3 min-w-0">
                                          <FileText className={`size-4 flex-shrink-0 ${doc.uploaded ? 'text-green-500' : 'text-muted-foreground'
                                            }`} />
                                          <div className="min-w-0">
                                            <div className="font-medium truncate">{doc.name}</div>
                                            {doc.document && (
                                              <div className="text-xs text-muted-foreground">
                                                Uploaded {new Date(doc.document.created_at).toLocaleDateString()}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0 relative group">
                                          <DocumentStatus document={doc} />
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            disabled={loading || missedDeadline || isMarkedReceived}
                                            onClick={(e) => doc.uploaded ? handleViewClick(doc.document, e) : handleUploadClick(doc, e)}
                                            className="transition-colors duration-200 "
                                          >
                                            {doc.uploaded ? (
                                              <Eye className="size-3" />
                                            ) : (
                                              <Upload className="size-3" />
                                            )}
                                          </Button>
                                          {(missedDeadline || isMarkedReceived) && (
                                            <div
                                              className="
                                            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                                            opacity-0 scale-95
                                            transition-all duration-200
                                            group-hover:opacity-100 group-hover:scale-100
                                            pointer-events-none
                                          "
                                            >
                                              <div className="
                                              relative  min-w-[180px] max-w-[240px]
                                              rounded-xl bg-white px-4 py-2
                                              text-xs font-medium text-gray-800
                                              shadow-[0_8px_20px_rgba(0,0,0,0.15)]
                                              border border-gray-200 text-center
                                            ">
                                                {titleTXT}

                                                <span
                                                  className="
                                               absolute -bottom-2 right-9
                                              h-3 w-3 rotate-45
                                              bg-white
                                              border-r border-b border-gray-200
                                              "
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {step.key === 'earnest_money' && (
                                    <div className="border bg-card rounded-lg p-4 space-y-4">
                                      <h4 className="font-semibold">Earnest Money Details</h4>

                                      <div className="grid grid-cols-1 gap-4">
                                        {/* Amount */}
                                        <div className="space-y-2">
                                          <Label>Amount</Label>
                                          <div className="flex">
                                            <span className="px-3 py-2 border border-r-0 rounded-l-md">$</span>
                                            <input
                                              type="number"
                                              value={extraFields.earnestAmount}
                                              onChange={(e) => setExtraFields({ ...extraFields, earnestAmount: e.target.value })}
                                              placeholder="0.00"
                                              className="flex-1 rounded-r-md border px-3 py-2"
                                            />
                                          </div>
                                        </div>

                                        {/* Payment Method */}
                                        <div className="space-y-2">
                                          <Label>Payment Method</Label>
                                          <select
                                            value={extraFields.earnestPaymentMethod}
                                            onChange={(e) => setExtraFields({ ...extraFields, earnestPaymentMethod: e.target.value })}
                                            className="w-full rounded-md border px-3 py-2"
                                          >
                                            <option value="">Select</option>
                                            <option value="wire">Wire Transfer</option>
                                            <option value="check">Cashier's Check</option>
                                            <option value="cash">Cash</option>
                                            <option value="other">Other</option>
                                          </select>
                                        </div>
                                      </div>

                                      {/* Reference Number */}
                                      <div className="space-y-2">
                                        <Label>Reference / Check #</Label>
                                        <input
                                          type="text"
                                          value={extraFields.earnestReference}
                                          onChange={(e) => setExtraFields({ ...extraFields, earnestReference: e.target.value })}
                                          placeholder="Wire reference or check number"
                                          className="w-full rounded-md border px-3 py-2"
                                        />
                                      </div>

                                      {/* Status */}
                                      <div className="space-y-2">
                                        <Label>Status</Label>
                                        <div className="flex gap-2">
                                          {['pending', 'received', 'cleared'].map((s) => (
                                            <Button
                                              key={s}
                                              type="button"
                                              size="sm"
                                              variant={extraFields.earnestStatus === s ? "default" : "outline"}
                                              onClick={() => setExtraFields({ ...extraFields, earnestStatus: s })}
                                              className="capitalize"
                                            >
                                              {s}
                                            </Button>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Dates */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label>Due Date</Label>
                                          <div className="relative">
                                            <input
                                              type="date"
                                              value={extraFields.earnestDueDate || ''}
                                              onChange={(e) => setExtraFields({ ...extraFields, earnestDueDate: e.target.value })}
                                              className="w-full rounded-md border overflow-hidden border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                            />
                                            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                          </div>
                                        </div>
                                        {extraFields.earnestStatus === 'received' && (
                                          <div className="space-y-2">
                                            <Label>Received Date</Label>
                                            <div className="relative">
                                              <input
                                                type="date"
                                                value={extraFields.earnestReceivedDate || ''}
                                                onChange={(e) => setExtraFields({ ...extraFields, earnestReceivedDate: e.target.value })}
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                              />
                                              <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex justify-end">
                                        <Button
                                          className="cursor-pointer"
                                          type="button"
                                          size="sm"
                                          onClick={() => {
                                            handleUpdate();
                                            toast.success("Earnest Money details saved.");
                                          }}
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <Button variant="outline" className="flex items-center gap-2 h-11 transition-colors duration-200">
                    <MessageSquare className="size-4" />
                    Message Clients
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-11 transition-colors duration-200">
                    <Calendar className="size-4" />
                    Schedule Event
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-11 transition-colors duration-200">
                    <Download className="size-4" />
                    Download Package
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-11 transition-colors duration-200">
                    <User className="size-4" />
                    Assign Professional
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">All Deal Documents</h4>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {/* Add bulk upload functionality */ }}
                  >
                    <Plus className="size-4" />
                    Upload Multiple
                  </Button>
                </div>
                <div className="space-y-4">
                  {processSteps.map(step => (
                    <div key={step.key} className="border rounded-lg p-4 bg-white shadow-sm">
                      <h5 className="font-medium mb-3 flex items-center gap-2">
                        <step.icon className="size-4" />
                        {step.label}
                      </h5>
                      <div className="space-y-2">
                        {getStepDocuments(step.key).map(doc => (
                          <div key={doc.type} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 transition-colors duration-200 hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <FileText className="size-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                {doc.document && (
                                  <div className="text-xs text-muted-foreground">
                                    Uploaded: {new Date(doc.document.created_at).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DocumentStatus document={doc} />
                              {doc.document ? (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setViewModal({ open: true, document: doc.document })}
                                >
                                  <Eye className="size-3" />
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setUploadModal({ open: true, documentType: doc })}
                                >
                                  <Upload className="size-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog >

      {/* Upload Document Modal */}
      < UploadDocumentModal
        isOpen={uploadModal.open}
        onClose={() => setUploadModal({ open: false, documentType: null })}
        deal={deal}
        documentType={uploadModal.documentType}
        onUploadComplete={handleUploadComplete}
      />

      <ViewDocumentModal
        isOpen={viewModal.open}
        onClose={() => setViewModal({ open: false, document: null })}
        document={viewModal.document}
      />
    </>
  );
};