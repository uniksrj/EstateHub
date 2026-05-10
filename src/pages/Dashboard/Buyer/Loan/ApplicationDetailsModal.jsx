import { getStatusBadge } from "@/utils/loan";

// Application Details Modal Component
const ApplicationDetailsModal = ({ application, onClose, formatCurrency, formatDate }) => {

  const status = getStatusBadge(application.status);
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">Application Details</h2>
              <p className="text-sm text-muted-foreground mt-1">
                ID: <span className="font-mono">{application.applicationId}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <XCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Banner */}
            <div className={`p-4 rounded-lg ${status.color}`}>
              <div className="flex items-center gap-2">
                <StatusIcon className="w-5 h-5" />
                <span className="font-medium">Current Status: {status.text}</span>
              </div>
            </div>

            {/* Loan Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Loan Amount</div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(application.loanAmount)}
                </div>
              </div>
              <div className="p-4 bg-success/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Interest Rate</div>
                <div className="text-2xl font-bold text-success">
                  {application.interestRate}%
                </div>
              </div>
              <div className="p-4 bg-warning/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Loan Term</div>
                <div className="text-2xl font-bold text-warning">
                  {application.loanTerm} years
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Property Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-card-foreground">{application.propertyAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-medium text-card-foreground">{application.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Occupancy</p>
                  <p className="font-medium text-card-foreground">{application.occupancyType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Down Payment</p>
                  <p className="font-medium text-card-foreground">{formatCurrency(application.downPayment)}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-card-foreground mb-3">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-card-foreground">
                    {application.firstName} {application.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-card-foreground">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-card-foreground">{application.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Income</p>
                  <p className="font-medium text-card-foreground">{formatCurrency(application.annualIncome)}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-card-foreground mb-3">Application Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Application Submitted</p>
                    <p className="text-xs text-muted-foreground">{formatDate(application.applicationDate)}</p>
                  </div>
                </div>
                {application.timeline?.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-muted-foreground" />
                    <div>
                      <p className="text-sm text-card-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-muted-foreground" />
                  <div>
                    <p className="text-sm text-card-foreground">Expected Decision</p>
                    <p className="text-xs text-muted-foreground">{formatDate(application.expectedDecision)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-card-foreground mb-3">Documents</h3>
              <div className="space-y-2">
                {application.documents?.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-card-foreground">{doc.name}</span>
                    </div>
                    <button className="text-primary hover:text-primary/80 text-sm flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90">
                Contact Loan Officer
              </button>
              <button className="flex-1 border border-input text-card-foreground py-3 rounded-lg font-medium hover:bg-muted">
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;