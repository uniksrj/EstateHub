import React from 'react';
import { XCircle, TrendingUp, Calendar, DollarSign, Home, AlertCircle } from 'lucide-react';

const LoanDetailsModal = ({ isOpen, onClose, loan, onApply, showApplyButton = true }) => {
  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">{loan.type}</h2>
              <p className="text-muted-foreground mt-1">{loan.description}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <XCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-primary/5 rounded-lg">
                <TrendingUp className="w-4 h-4 text-primary mb-1" />
                <div className="text-xs text-muted-foreground">Interest Rate</div>
                <div className="text-lg font-bold text-primary">{loan.rate}%</div>
              </div>
              <div className="p-3 bg-success/5 rounded-lg">
                <DollarSign className="w-4 h-4 text-success mb-1" />
                <div className="text-xs text-muted-foreground">Monthly Payment</div>
                <div className="text-lg font-bold text-success">{formatCurrency(loan.monthlyPI)}</div>
              </div>
              <div className="p-3 bg-warning/5 rounded-lg">
                <Calendar className="w-4 h-4 text-warning mb-1" />
                <div className="text-xs text-muted-foreground">Loan Term</div>
                <div className="text-lg font-bold text-warning">
                  {loan.type.includes('15') ? '15' : loan.type.includes('30') ? '30' : '30'} Years
                </div>
              </div>
              <div className="p-3 bg-destructive/5 rounded-lg">
                <Home className="w-4 h-4 text-destructive mb-1" />
                <div className="text-xs text-muted-foreground">Total Cost</div>
                <div className="text-lg font-bold text-destructive">{formatCurrency(loan.totalCost)}</div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-success/5 rounded-lg">
                <h3 className="font-semibold text-success mb-2">Benefits</h3>
                <ul className="space-y-2">
                  {loan.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-success">✓</span>
                      <span className="text-card-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-destructive/5 rounded-lg">
                <h3 className="font-semibold text-destructive mb-2">Considerations</h3>
                <ul className="space-y-2">
                  {loan.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-destructive">✗</span>
                      <span className="text-card-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ARM Details */}
            {loan.armDetails && (
              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  ARM Specific Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Fixed Period:</span>
                    <span className="ml-2 font-medium text-card-foreground">{loan.armDetails.fixedPeriod} years</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Adjustment Cap:</span>
                    <span className="ml-2 font-medium text-card-foreground">{loan.armDetails.adjustmentCap}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lifetime Cap:</span>
                    <span className="ml-2 font-medium text-card-foreground">{loan.armDetails.lifetimeCap}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Margin:</span>
                    <span className="ml-2 font-medium text-card-foreground">{loan.armDetails.margin}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Amortization Preview */}
            <div>
              <h3 className="font-semibold text-card-foreground mb-3">First 12 Months</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground">Month</th>
                      <th className="text-right py-2 text-muted-foreground">Principal</th>
                      <th className="text-right py-2 text-muted-foreground">Interest</th>
                      <th className="text-right py-2 text-muted-foreground">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loan.schedule.slice(0, 6).map((row) => (
                      <tr key={row.month} className="border-b border-border">
                        <td className="py-2 text-card-foreground">{row.month}</td>
                        <td className="py-2 text-success text-right">{formatCurrency(row.principal)}</td>
                        <td className="py-2 text-destructive text-right">{formatCurrency(row.interest)}</td>
                        <td className="py-2 text-card-foreground text-right">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            {showApplyButton && onApply && (
              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    onApply(loan);
                    onClose();
                  }}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Apply for this Loan
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 border border-input text-card-foreground py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;