import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Home, TrendingUp, Calendar, Percent, ArrowRight, Download, Share2 } from 'lucide-react';

const MortgageTools = () => {
  const [formData, setFormData] = useState({
    homePrice: 500000,
    downPayment: 20,
    loanTerm: 30,
    interestRate: 6.5,
    annualTax: 6000,
    annualInsurance: 1200,
    pmiRate: 0.5
  });

  const [calculations, setCalculations] = useState({
    monthlyPayment: 0,
    principalInterest: 0,
    tax: 0,
    insurance: 0,
    pmi: 0,
    totalPayment: 0,
    loanAmount: 0,
    downPaymentAmount: 0
  });

  const [amortization, setAmortization] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  useEffect(() => {
    calculateMortgage();
  }, [formData]);

  const calculateMortgage = () => {
    const {
      homePrice,
      downPayment,
      loanTerm,
      interestRate,
      annualTax,
      annualInsurance,
      pmiRate
    } = formData;

    const downPaymentAmount = homePrice * (downPayment / 100);
    const loanAmount = homePrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Principal & Interest
    const monthlyPI = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Monthly costs
    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    const monthlyPMI = downPayment < 20 ? (loanAmount * (pmiRate / 100)) / 12 : 0;
    
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;

    setCalculations({
      monthlyPayment: totalMonthly,
      principalInterest: monthlyPI,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      pmi: monthlyPMI,
      totalPayment: totalMonthly,
      loanAmount,
      downPaymentAmount
    });

    generateAmortizationSchedule(loanAmount, monthlyRate, numberOfPayments, monthlyPI);
  };

  const generateAmortizationSchedule = (loanAmount, monthlyRate, numberOfPayments, monthlyPayment) => {
    const schedule = [];
    let balance = loanAmount;

    for (let i = 1; i <= 12; i++) { // First year only for demo
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;

      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance)
      });
    }

    setAmortization(schedule);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const affordabilityCalculator = () => {
    const monthlyIncome = 8000; // Example
    const debtPayments = 500; // Example
    const maxPayment = monthlyIncome * 0.28 - debtPayments;
    return formatCurrency(maxPayment);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Mortgage Tools</h1>
          </div>
          <p className="text-muted-foreground">Calculate payments, compare loans, and plan your purchase</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          {['calculator', 'affordability', 'compare'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'calculator' && 'Payment Calculator'}
              {tab === 'affordability' && 'Affordability'}
              {tab === 'compare' && 'Compare Loans'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="xl:col-span-2 space-y-6">
            {activeTab === 'calculator' && (
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">Mortgage Calculator</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Home Price */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                      <Home className="w-4 h-4" />
                      Home Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        value={formData.homePrice}
                        onChange={(e) => handleInputChange('homePrice', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                      <Percent className="w-4 h-4" />
                      Down Payment ({formData.downPayment}%)
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="50"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(formData.homePrice * (formData.downPayment / 100))}
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                      <Calendar className="w-4 h-4" />
                      Loan Term
                    </label>
                    <select
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="15">15 Years</option>
                      <option value="20">20 Years</option>
                      <option value="30">30 Years</option>
                    </select>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                      <TrendingUp className="w-4 h-4" />
                      Interest Rate ({formData.interestRate}%)
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Additional Costs */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-card-foreground">Annual Property Tax</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        value={formData.annualTax}
                        onChange={(e) => handleInputChange('annualTax', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-card-foreground">Annual Insurance</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        value={formData.annualInsurance}
                        onChange={(e) => handleInputChange('annualInsurance', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amortization Schedule */}
            {activeTab === 'calculator' && (
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">Amortization Schedule (First Year)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Month</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Payment</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Principal</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Interest</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortization.map((row) => (
                        <tr key={row.month} className="border-b border-border">
                          <td className="py-3 text-sm text-card-foreground">{row.month}</td>
                          <td className="py-3 text-sm text-card-foreground text-right">{formatCurrency(row.payment)}</td>
                          <td className="py-3 text-sm text-success text-right">{formatCurrency(row.principal)}</td>
                          <td className="py-3 text-sm text-destructive text-right">{formatCurrency(row.interest)}</td>
                          <td className="py-3 text-sm text-card-foreground text-right">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Affordability Calculator */}
            {activeTab === 'affordability' && (
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">What Can I Afford?</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-card-foreground">Annual Income</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="100,000"
                          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-card-foreground">Monthly Debts</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="500"
                          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="text-sm text-success font-medium">Estimated Affordable Home Price</div>
                    <div className="text-2xl font-bold text-success mt-1">{affordabilityCalculator()}/month</div>
                  </div>
                </div>
              </div>
            )}

            {/* Compare Loans */}
            {activeTab === 'compare' && (
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">Compare Loan Options</h2>
                <div className="space-y-4">
                  {[
                    { type: '30-Year Fixed', rate: 6.5, payment: 3160 },
                    { type: '15-Year Fixed', rate: 6.0, payment: 4220 },
                    { type: '5/1 ARM', rate: 5.75, payment: 2918 }
                  ].map((loan, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-card-foreground">{loan.type}</h3>
                          <p className="text-sm text-muted-foreground">{loan.rate}% Interest Rate</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-card-foreground">{formatCurrency(loan.payment)}/mo</div>
                          <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors duration-200">
                            View Details <ArrowRight className="w-4 h-4 inline ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            {/* Payment Breakdown */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Payment Breakdown</h2>
              
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatCurrency(calculations.monthlyPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Principal & Interest</span>
                    <span className="font-medium text-card-foreground">{formatCurrency(calculations.principalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Property Tax</span>
                    <span className="font-medium text-card-foreground">{formatCurrency(calculations.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Home Insurance</span>
                    <span className="font-medium text-card-foreground">{formatCurrency(calculations.insurance)}</span>
                  </div>
                  {calculations.pmi > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">PMI</span>
                      <span className="font-medium text-card-foreground">{formatCurrency(calculations.pmi)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-card-foreground">Total Monthly Payment</span>
                    <span className="text-primary">{formatCurrency(calculations.totalPayment)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="text-card-foreground">{formatCurrency(calculations.loanAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Down Payment</span>
                  <span className="text-card-foreground">{formatCurrency(calculations.downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Interest Paid</span>
                  <span className="text-card-foreground">
                    {formatCurrency(calculations.principalInterest * formData.loanTerm * 12 - calculations.loanAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                  <Download className="w-4 h-4" />
                  Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-input text-card-foreground py-2 px-4 rounded-lg font-medium hover:bg-muted transition-colors duration-200">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Mortgage Tips</h2>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="font-medium text-card-foreground mb-1">20% Down Payment</div>
                  <div className="text-muted-foreground">Avoid PMI by putting down 20% or more</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="font-medium text-card-foreground mb-1">Compare Rates</div>
                  <div className="text-muted-foreground">Shop around with multiple lenders for the best rate</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="font-medium text-card-foreground mb-1">Credit Score</div>
                  <div className="text-muted-foreground">A higher score can qualify you for better rates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageTools;