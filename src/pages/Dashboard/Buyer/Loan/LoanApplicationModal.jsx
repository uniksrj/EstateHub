import React, { useState } from 'react';
import { DollarSign, User, Mail, Phone, Home, Briefcase, CheckCircle, XCircle, ArrowLeft, FileText, Upload, Badge, Info } from 'lucide-react';
import { loanOptions } from '@/data/loanData';
import { calculateMonthlyPayment, generateLoanDetails } from '@/utils/loan';
import { toast } from 'sonner';
import { userAPI } from '@/services/api';

const LoanApplicationModal = ({ isOpen, onClose, propertyDetails, offerDetails, userDetails, loanDetails, initialLoanDetails }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: userDetails?.name?.split(' ')[0] || '',
    lastName: userDetails?.name?.split(' ').slice(1).join(' ') || '',
    email: userDetails?.email || '',
    phone: userDetails?.phone || '',
    dateOfBirth: '',
    ssn: '',

    // Employment
    employmentStatus: 'employed',
    employerName: '',
    jobTitle: '',
    yearsAtJob: '',
    annualIncome: '',

    // Property
    propertyAddress: propertyDetails ?
      `${propertyDetails.address}, ${propertyDetails.city}, ${propertyDetails.state} ${propertyDetails.zip}` : '',
    propertyType: propertyDetails?.property_type || 'singleFamily',
    propertyPrice: propertyDetails?.price || '',
    propertyId: propertyDetails?.id || null,
    occupancyType: 'primary',
    offerId: offerDetails?.id || null,

    // Financial
    downPayment: '',
    creditScore: '',
    hasBankruptcies: false,
    bankruptcyExplanation: '',

    // Documents
    documents: {
      id: null,
      payStubs: null,
      taxReturns: null,
      bankStatements: null
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(initialLoanDetails || null);
  const [applicationRefNumber, setApplicationRefNumber] = useState(`REF${Math.floor(100000 + Math.random() * 900000)}`);
  if (!isOpen) return null;

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.ssn) newErrors.ssn = 'SSN is required';
      else if (formData.ssn.replace(/\D/g, '').length !== 9) newErrors.ssn = 'SSN must be 9 digits';
    }

    if (stepNumber === 2) {
      if (!formData.employerName && formData.employmentStatus === 'employed') {
        newErrors.employerName = 'Employer name is required';
      }
      if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
    }

    if (stepNumber === 3) {
      if (!formData.propertyAddress) newErrors.propertyAddress = 'Property address is required';
      if (!formData.downPayment) newErrors.downPayment = 'Down payment amount is required';
    }

    if (stepNumber === 4) {
      if (!formData.documents.id) newErrors.id = 'ID document is required';
      if (!formData.documents.payStubs) newErrors.payStubs = 'Pay stubs are required';
      if (!formData.documents.taxReturns) newErrors.taxReturns = 'Tax returns are required';
      if (!formData.documents.bankStatements) newErrors.bankStatements = 'Bank statements are required';
      if (!formData.downPayment) newErrors.downPayment = 'Down payment amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1 && !initialLoanDetails) {
      setStep(0);
    } else {
      setStep(step - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setIsSubmitting(true);
    let toastId = null;
    try {      
      toastId = toast.loading("Submitting your loan application...");
      
      const UpdatedFormData = {
        ...formData,
        selectedLoan: selectedLoan,
      }
      let res = await userAPI.save_property_loan_details(UpdatedFormData);
      console.log("Backend response after saving loan application:", res);
      setApplicationRefNumber(res.data.application.application_number);
      toast.success("Loan application submitted successfully!", {
        id: toastId,
        description: `Your loan application for ${propertyDetails.title} has been submitted. Reference Number: ${applicationRefNumber}`
      });

    } catch (error) {
      console.error("Failed to store loan application details to backend:", error);
      if (toastId) {
        toast.dismiss(toastId);
      }
      toast.error("Failed to submit offer", {
        description: error.response?.data?.message || "Please check your connection and try again."
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const steps = [
    { number: 1, name: 'Personal Information', icon: User },
    { number: 2, name: 'Employment & Income', icon: Briefcase },
    { number: 3, name: 'Loan Details', icon: Home },
    { number: 4, name: 'Documents', icon: FileText },
    { number: 5, name: 'Review & Submit', icon: CheckCircle }
  ];

  const handleLoanSelect = (loan) => {
    console.log("Selected loan inside function:", loan);
    const final_price = offerDetails?.status === 'accepted' ? offerDetails.final_price : propertyDetails?.price || 400000;
    const fullLoan = generateLoanDetails(loan, final_price);
    setSelectedLoan(fullLoan);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto">

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-card-foreground">Loan Application</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between">
                  {steps.map((s, idx) => (
                    <div key={s.number} className="flex-1">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${s.number === step
                          ? 'bg-primary text-primary-foreground'
                          : s.number < step
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                          }`}>
                          <s.icon className="w-4 h-4" />
                        </div>
                        {idx < steps.length - 1 && (
                          <div className={`flex-1 h-1 mx-2 ${s.number < step ? 'bg-success' : 'bg-muted'
                            }`} />
                        )}
                      </div>
                      <div className="text-xs mt-1 text-muted-foreground">{s.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Loan Summary Card */}
                {loanDetails && (
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">Selected Loan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Loan Type</div>
                        <div className="font-medium text-card-foreground">{loanDetails.type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Interest Rate</div>
                        <div className="font-medium text-card-foreground">{loanDetails.rate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Monthly Payment</div>
                        <div className="font-medium text-card-foreground">{formatCurrency(loanDetails.monthlyPI)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Loan Amount</div>
                        <div className="font-medium text-card-foreground">{formatCurrency(loanDetails.loanAmount)}</div>
                      </div>
                    </div>
                  </div>
                )}

                {propertyDetails && (
                  <div className="bg-primary/5 border-b border-primary/20 p-4">
                    <div className="flex items-center gap-4">
                      {propertyDetails.image && (
                        <img src={propertyDetails.image} alt={propertyDetails.title} className="w-16 h-16 rounded-lg object-cover" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground">{propertyDetails.title}</h3>
                        <p className="text-sm text-muted-foreground">{propertyDetails.address}</p>
                        <div className="flex gap-4 mt-1 text-sm">
                          <span>{propertyDetails.bedrooms} beds</span>
                          <span>{propertyDetails.bathrooms} baths</span>
                          <span>{propertyDetails.square_feet?.toLocaleString()} sqft</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Purchase Price</p>
                        <p className="text-xl font-bold text-primary">{formatCurrency(offerDetails.status === 'accepted' ? offerDetails.final_price : propertyDetails.price)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 0 && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">Choose Your Loan Type</h3>
                    <div className="space-y-4">
                      {loanOptions.map((loan, idx) => {
                        const monthly = calculateMonthlyPayment(propertyDetails?.price || 400000, loan.rate, loan.term);
                        return (
                          <div
                            key={idx}
                            onClick={() => handleLoanSelect(loan)}
                            className="border border-border rounded-lg p-4 hover:border-primary cursor-pointer transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-card-foreground">{loan.type}</h4>
                                <p className="text-sm text-muted-foreground">{loan.rate}% APR</p>
                                <p className="text-xs text-muted-foreground mt-1">{loan.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">{formatCurrency(monthly)}/mo</p>
                                <p className="text-xs text-muted-foreground">estimated</p>
                              </div>
                            </div>
                            {loan.recommended && (
                              <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded-md inline-block mt-2">
                                Recommended
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedLoan && step > 0 && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-primary">Selected Loan</h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">Estimated</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Loan Type</div>
                        <div className="font-medium text-card-foreground">{selectedLoan.type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Interest Rate</div>
                        <div className="font-medium text-card-foreground">{selectedLoan.rate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Monthly Payment</div>
                        <div className="font-medium text-card-foreground">{formatCurrency(selectedLoan.monthlyPI)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Loan Amount</div>
                        <div className="font-medium text-card-foreground">{formatCurrency(selectedLoan.loanAmount)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-start gap-3 rounded-lg border border-accent bg-accent/10 p-3 text-sm">
                      <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-foreground" />
                      <p className="text-foreground/80">
                        This is an estimate based on the property price and selected loan terms.
                        The final loan amount, interest rate, and monthly payment may vary after
                        underwriting and based on your financial profile.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">Personal Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full p-3 border rounded-lg bg-background ${errors.firstName ? 'border-destructive' : 'border-input'
                            }`}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full p-3 border rounded-lg bg-background ${errors.lastName ? 'border-destructive' : 'border-input'
                            }`}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full p-3 border rounded-lg bg-background ${errors.email ? 'border-destructive' : 'border-input'
                            }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full p-3 border rounded-lg bg-background ${errors.phone ? 'border-destructive' : 'border-input'
                            }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className={`w-full p-3 border rounded-lg bg-background ${errors.dateOfBirth ? 'border-destructive' : 'border-input'
                            }`}
                        />
                        {errors.dateOfBirth && (
                          <p className="text-xs text-destructive mt-1">{errors.dateOfBirth}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Social Security Number *
                        </label>
                        <input
                          type="password"
                          placeholder="XXX-XX-XXXX"
                          value={formData.ssn}
                          onChange={(e) => handleInputChange('ssn', e.target.value)}
                          className={`w-full p-3 border rounded-lg bg-background ${errors.ssn ? 'border-destructive' : 'border-input'
                            }`}
                        />
                        {errors.ssn && (
                          <p className="text-xs text-destructive mt-1">{errors.ssn}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Employment & Income */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">Employment & Income</h3>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">
                        Employment Status
                      </label>
                      <select
                        value={formData.employmentStatus}
                        onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                        className="w-full p-3 border border-input rounded-lg bg-background"
                      >
                        <option value="employed">Employed Full-time</option>
                        <option value="partTime">Employed Part-time</option>
                        <option value="selfEmployed">Self-employed</option>
                        <option value="retired">Retired</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {formData.employmentStatus !== 'retired' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-card-foreground mb-1">
                              Employer Name *
                            </label>
                            <input
                              type="text"
                              value={formData.employerName}
                              onChange={(e) => handleInputChange('employerName', e.target.value)}
                              className={`w-full p-3 border rounded-lg bg-background ${errors.employerName ? 'border-destructive' : 'border-input'
                                }`}
                            />
                            {errors.employerName && (
                              <p className="text-xs text-destructive mt-1">{errors.employerName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-card-foreground mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={formData.jobTitle}
                              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                              className="w-full p-3 border border-input rounded-lg bg-background"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-card-foreground mb-1">
                              Years at Current Job
                            </label>
                            <input
                              type="number"
                              value={formData.yearsAtJob}
                              onChange={(e) => handleInputChange('yearsAtJob', e.target.value)}
                              className="w-full p-3 border border-input rounded-lg bg-background"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-card-foreground mb-1">
                              Annual Income *
                            </label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="number"
                                value={formData.annualIncome}
                                onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                                className={`w-full pl-10 p-3 border rounded-lg bg-background ${errors.annualIncome ? 'border-destructive' : 'border-input'
                                  }`}
                              />
                            </div>
                            {errors.annualIncome && (
                              <p className="text-xs text-destructive mt-1">{errors.annualIncome}</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Step 3: Loan Details */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">Loan Details</h3>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">
                        Property Address *
                      </label>
                      <input
                        type="text"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        className={`w-full p-3 border rounded-lg bg-background ${errors.propertyAddress ? 'border-destructive' : 'border-input'
                          }`}
                        placeholder="123 Main St, City, State 12345"
                      />
                      {errors.propertyAddress && (
                        <p className="text-xs text-destructive mt-1">{errors.propertyAddress}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Property Type
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => handleInputChange('propertyType', e.target.value)}
                          className="w-full p-3 border border-input rounded-lg bg-background"
                        >
                          <option value="singleFamily">Single Family Home</option>
                          <option value="condo">Condo</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="multiFamily">Multi-family (2-4 units)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Occupancy Type
                        </label>
                        <select
                          value={formData.occupancyType}
                          onChange={(e) => handleInputChange('occupancyType', e.target.value)}
                          className="w-full p-3 border border-input rounded-lg bg-background"
                        >
                          <option value="primary">Primary Residence</option>
                          <option value="secondary">Second Home</option>
                          <option value="investment">Investment Property</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Down Payment Amount *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="number"
                            value={formData.downPayment}
                            onChange={(e) => handleInputChange('downPayment', e.target.value)}
                            className={`w-full pl-10 p-3 border rounded-lg bg-background ${errors.downPayment ? 'border-destructive' : 'border-input'
                              }`}
                          />
                        </div>
                        {errors.downPayment && (
                          <p className="text-xs text-destructive mt-1">{errors.downPayment}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-1">
                          Estimated Credit Score
                        </label>
                        <select
                          value={formData.creditScore}
                          onChange={(e) => handleInputChange('creditScore', e.target.value)}
                          className="w-full p-3 border border-input rounded-lg bg-background"
                        >
                          <option value="">Select range</option>
                          <option value="excellent">760+ (Excellent)</option>
                          <option value="good">700-759 (Good)</option>
                          <option value="fair">620-699 (Fair)</option>
                          <option value="poor">Below 620 (Poor)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-warning/5 rounded-lg">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.hasBankruptcies}
                          onChange={(e) => handleInputChange('hasBankruptcies', e.target.checked)}
                          className="mt-1"
                        />
                        <span className="text-sm text-card-foreground">
                          I have had a bankruptcy or foreclosure in the last 7 years
                        </span>
                      </label>
                      {formData.hasBankruptcies && (
                        <textarea
                          placeholder="Please explain..."
                          value={formData.bankruptcyExplanation}
                          onChange={(e) => handleInputChange('bankruptcyExplanation', e.target.value)}
                          className="w-full mt-3 p-3 border border-input rounded-lg bg-background"
                          rows="3"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Documents */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">Required Documents</h3>

                    <div className="space-y-3">
                      {[
                        { key: 'id', label: 'Government ID', accept: '.jpg,.png,.pdf' },
                        { key: 'payStubs', label: 'Recent Pay Stubs (last 30 days)', accept: '.pdf' },
                        { key: 'taxReturns', label: 'Tax Returns (last 2 years)', accept: '.pdf' },
                        { key: 'bankStatements', label: 'Bank Statements (last 3 months)', accept: '.pdf' }
                      ].map((doc) => (
                        <div key={doc.key} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-card-foreground">{doc.label}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Accepted formats: {doc.accept}
                              </p>
                              {errors[doc.key] && (
                                <p className="text-xs text-destructive mt-1">{errors[doc.key]}</p>
                              )}
                            </div>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept={doc.accept}
                                onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                                className="hidden"
                              />
                              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                <Upload className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {formData.documents[doc.key] ? 'Change' : 'Upload'}
                                </span>
                              </div>
                            </label>
                          </div>
                          {formData.documents[doc.key] && (
                            <div className="mt-2 p-2 bg-success/10 rounded-lg flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span className="text-xs text-success">
                                {formData.documents[doc.key].name} uploaded
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {step === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">Review Your Application</h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <h4 className="font-medium text-card-foreground mb-2">Personal Information</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Name:</div>
                          <div className="text-card-foreground">{formData.firstName} {formData.lastName}</div>
                          <div className="text-muted-foreground">Email:</div>
                          <div className="text-card-foreground">{formData.email}</div>
                          <div className="text-muted-foreground">Phone:</div>
                          <div className="text-card-foreground">{formData.phone}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-card border border-border rounded-lg">
                        <h4 className="font-medium text-card-foreground mb-2">Employment & Income</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Status:</div>
                          <div className="text-card-foreground">{formData.employmentStatus}</div>
                          <div className="text-muted-foreground">Annual Income:</div>
                          <div className="text-card-foreground">{formatCurrency(formData.annualIncome)}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-card border border-border rounded-lg">
                        <h4 className="font-medium text-card-foreground mb-2">Loan Details</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Property:</div>
                          <div className="text-card-foreground">{formData.propertyAddress}</div>
                          <div className="text-muted-foreground">Down Payment:</div>
                          <div className="text-card-foreground">{formatCurrency(formData.downPayment)}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-warning/5 rounded-lg">
                        <p className="text-sm text-warning">
                          By submitting this application, you authorize us to check your credit and verify the information provided.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-6">
                <div className="flex justify-between">
                  <button
                    onClick={step > 1 ? handleBack : onClose}
                    className="px-6 py-3 border border-input text-card-foreground rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    {step > 1 ? 'Back' : 'Cancel'}
                  </button>

                  <button
                    onClick={step === 5 ? handleSubmit : handleNext}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : step === 5 ? (
                      'Submit Application'
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Success State
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-3">Application Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your application. A loan officer will contact you within 24-48 hours to discuss next steps.
              </p>
              <div className="p-4 bg-card border border-border rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">Application Reference Number</p>
                <p className="text-lg font-mono font-bold text-card-foreground">
                  {applicationRefNumber}
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;