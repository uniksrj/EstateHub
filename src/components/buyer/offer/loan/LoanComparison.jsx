import { loanOptions } from '@/data/loanData';
import LoanComparisonCard from '@/pages/Dashboard/Buyer/Loan/LoanComparisonCard';
import LoanDetailsModal from '@/pages/Dashboard/Buyer/Loan/LoanDetailsModal';
import { generateLoanDetails } from '@/utils/loan';
import React, { useState } from 'react';

const LoanComparison = ({ 
  loanAmount = 400000,
  onLoanSelect, 
  showApplyButton = true,
  title = "Compare Loan Options",
  description = "Compare different loan types to find the best option for your situation"
}) => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);  

  const handleViewDetails = (loan) => {
    const loanWithDetails = generateLoanDetails(loan, loanAmount);
    setSelectedLoan(loanWithDetails);
    setShowDetailsModal(true);
  };

  const handleApply = (loan) => {
    const loanWithDetails = generateLoanDetails(loan, loanAmount);
    if (onLoanSelect) {
      onLoanSelect(loanWithDetails);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Loan Amount Summary (if provided) */}
      {loanAmount > 0 && (
        <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Loan Amount</span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(loanAmount)}
            </span>
          </div>
        </div>
      )}

      {/* Loan Cards */}
      <div className="space-y-4">
        {loanOptions.map((loan, index) => {
          const monthlyPI = generateLoanDetails(loan, loanAmount);
          const loanWithPayment = { ...loan, payment: monthlyPI };

          return (
            <LoanComparisonCard
              key={index}
              loan={loanWithPayment}
              onViewDetails={() => handleViewDetails(loan)}
              onApply={showApplyButton ? () => handleApply(loan) : undefined}
              showApplyButton={showApplyButton}
            />
          );
        })}
      </div>

      {/* Details Modal */}
      <LoanDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        loan={selectedLoan}
        onApply={showApplyButton ? (loan) => {
          setShowDetailsModal(false);
          if (onLoanSelect) {
            onLoanSelect(loan);
          }
        } : undefined}
        showApplyButton={showApplyButton}
      />
    </div>
  );
};

export default LoanComparison;