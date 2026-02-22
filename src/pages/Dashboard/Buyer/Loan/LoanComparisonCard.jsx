import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { formatCurrency } from '@/utils/userHelpers';

const LoanComparisonCard = ({ loan, onViewDetails, onApply, showApplyButton = true }) => { 
  console.log('LoanComparisonCard rendered with loan:', loan);

  return (
    <div className="border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-card-foreground">{loan.type}</h3>
            {loan.recommended && (
              <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full">
                Recommended
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold text-primary">{loan.rate}%</span>
            <span className="text-sm text-muted-foreground">APR</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{loan.description}</p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {loan.pros.slice(0, 2).map((pro, idx) => (
              <div key={idx} className="flex items-start gap-1 text-xs">
                <Check className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right ml-4">
          <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
          <div className="text-2xl font-bold text-card-foreground mb-2">
            {formatCurrency(loan?.payment?.payment)}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onViewDetails(loan)}
              className="w-full px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-1"
            >
              Details <ArrowRight className="w-3 h-3" />
            </button>
            {showApplyButton && onApply && (
              <button
                onClick={() => onApply(loan)}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Total Interest</span>
          <span className="font-medium text-card-foreground">{formatCurrency(loan?.payment?.totalInterest)}</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-muted-foreground">Total Cost</span>
          <span className="font-medium text-card-foreground">{formatCurrency(loan?.payment?.totalCost)}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanComparisonCard;