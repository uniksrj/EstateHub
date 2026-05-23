import { Clock, CheckCircle, XCircle, FileText, TrendingUp } from "lucide-react"

export const getStatusBadge = (status) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Under Review' },
    approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rejected' },
    documents: { color: 'bg-blue-100 text-blue-800', icon: FileText, text: 'Documents Needed' },
    processing: { color: 'bg-purple-100 text-purple-800', icon: TrendingUp, text: 'Processing' }
  };
  return statusConfig[status] || statusConfig.pending;
};

// Calculate monthly payment
export const calculateMonthlyPayment = (loanAmount, interestRate, loanTerm) => {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  if (monthlyRate === 0) return loanAmount / numberOfPayments;

  return loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
};

// Generate detailed loan information
export const generateLoanDetails = (loan, amount) => {
  const monthlyRate = loan.rate / 100 / 12;
  const numberOfPayments = loan.term * 12;
  const monthlyPI = calculateMonthlyPayment(amount, loan.rate, loan.term);

  // Generate amortization schedule (first year)
  const schedule = [];
  let balance = amount;
  for (let i = 1; i <= 12; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPI - interest;
    balance -= principal;
    schedule.push({
      month: i,
      payment: monthlyPI,
      principal,
      interest,
      balance: Math.max(0, balance)
    });
  }

  const totalInterest = (monthlyPI * numberOfPayments) - amount;
  const totalCost = amount + totalInterest;

  return {
    ...loan,
    payment: monthlyPI,
    loanAmount: amount,
    monthlyPI,
    totalInterest,
    totalCost,
    schedule
  };
};

export  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
