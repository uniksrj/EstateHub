// frontend/src/pages/Dashboard/Buyer/OfferCreationWizard.jsx

import { useState } from 'react';
import {
  DollarSign, CheckCircle,
  ArrowLeft, ArrowRight, Shield,
  Calendar,
  Calculator
} from 'lucide-react';
import { OFFER_WIZARD_STEPS } from '@/constants/offerTypes';

const OfferCreationWizard = ({ property, onClose, onOfferSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [offerData, setOfferData] = useState({
    propertyId: property?.id || null,
    offerAmount: property?.price || 0,
    earnestMoney: Math.round((property?.price || 0) * 0.02),
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    contingencies: {
      inspection: true,
      financing: true,
      appraisal: true
    },
    contingenciesPeriod: 17,
    financing: {
      type: 'conventional',
      preApproved: true,
      downPayment: 20
    },
    personalNote: '',
    includeLetter: false,
    commission_rate: property?.commission_rate || 2.50
  });
  const steps = OFFER_WIZARD_STEPS;

  const updateOfferData = (updates) => {
    setOfferData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {
    const finalOffer = {
      ...offerData,
      offerDate: new Date().toISOString().split('T')[0],
      expiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending'
    };
    onOfferSubmit(property, finalOffer);
  };
  console.log("Offer Data at submission:", offerData);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">Make an Offer</h2>
              <p className="text-muted-foreground">{property?.title || 'Select a property'}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              ×
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mt-6">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-muted-foreground text-muted-foreground'
                  }`}>
                  {step.icon === 'DollarSign' && <DollarSign className="w-5 h-5" />}
                  {step.icon === 'Shield' && <Shield className="w-5 h-5" />}
                  {step.icon === 'Calculator' && <Calculator className="w-5 h-5" />}
                  {step.icon === 'CheckCircle' && <CheckCircle className="w-5 h-5" />}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > step.number ? 'bg-primary' : 'bg-muted'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Offer Terms */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Offer Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={offerData.offerAmount}
                      onChange={(e) => updateOfferData({ offerAmount: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    List price: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(property?.price || 0)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Earnest Money
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={offerData.earnestMoney}
                      onChange={(e) => updateOfferData({ earnestMoney: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Proposed Closing Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={offerData.closingDate}
                      onChange={(e) => updateOfferData({ closingDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Offer Expires After
                  </label>
                  <select
                    value={offerData.offerExpiration}
                    onChange={(e) => updateOfferData({ offerExpiration: e.target.value })}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="24">24 hours</option>
                    <option value="48">48 hours</option>
                    <option value="72">72 hours</option>
                    <option value="168">7 days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Personal Note to Seller (Optional)
                </label>
                <textarea
                  value={offerData.personalNote}
                  onChange={(e) => updateOfferData({ personalNote: e.target.value })}
                  rows="3"
                  placeholder="Tell the seller why you love their home..."
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Contingencies */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-card-foreground">Protect Your Investment</h3>

              <div className="space-y-4">
                {[
                  { key: 'inspection', label: 'Home Inspection Contingency', description: 'Allows you to inspect the property and request repairs or withdraw if major issues are found' },
                  { key: 'financing', label: 'Financing Contingency', description: 'Protects you if your mortgage falls through' },
                  { key: 'appraisal', label: 'Appraisal Contingency', description: 'Allows you to renegotiate or withdraw if appraisal comes in low' }
                ].map(contingency => (
                  <div key={contingency.key} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                    <input
                      type="checkbox"
                      checked={offerData.contingencies[contingency.key]}
                      onChange={(e) => updateOfferData({
                        contingencies: {
                          ...offerData.contingencies,
                          [contingency.key]: e.target.checked
                        }
                      })}
                      className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <label className="font-medium text-card-foreground cursor-pointer">
                        {contingency.label}
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {contingency.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Commission Rate - Moved outside contingencies list */}
              <div className="p-4 border border-border rounded-lg bg-muted/20">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Commission Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={offerData.commission_rate || 2.50}
                    onChange={(e) => updateOfferData({
                      commission_rate: parseFloat(e.target.value) || 2.50
                    })}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                    placeholder="2.50"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Typical buyer agent commission rates: 2.5% - 3%. This affects your agent's compensation.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Contingency Period (Days)
                </label>
                <input
                  type="number"
                  value={offerData.contingenciesPeriod}
                  onChange={(e) => updateOfferData({ contingenciesPeriod: Number(e.target.value) })}
                  min="7"
                  max="30"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Number of days you have to complete inspections and secure financing
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Financing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-card-foreground">Financing Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Loan Type
                  </label>
                  <select
                    value={offerData.financing.type}
                    onChange={(e) => updateOfferData({
                      financing: { ...offerData.financing, type: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="conventional">Conventional</option>
                    <option value="fha">FHA</option>
                    <option value="va">VA</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={offerData.financing.downPayment}
                      onChange={(e) => updateOfferData({
                        financing: { ...offerData.financing, downPayment: Number(e.target.value) }
                      })}
                      className="w-full pr-12 pl-4 py-3 border border-input rounded-lg bg-background text-card-foreground focus:ring-2 focus:ring-primary"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={offerData.financing.preApproved}
                    onChange={(e) => updateOfferData({
                      financing: { ...offerData.financing, preApproved: e.target.checked }
                    })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <label className="text-sm font-medium text-card-foreground">
                    I have a pre-approval letter
                  </label>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-card-foreground mb-2">Estimated Monthly Payment</h4>
                <div className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                    (offerData.offerAmount * (1 - offerData.financing.downPayment / 100) * 0.06) / 12
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on 6% interest rate, 30-year fixed
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-card-foreground">Review Your Offer</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Financial Terms</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Offer Amount:</span>
                        <span className="font-semibold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(offerData.offerAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Earnest Money:</span>
                        <span className="font-semibold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(offerData.earnestMoney)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Closing Date:</span>
                        <span className="font-semibold">{new Date(offerData.closingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Financing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Type:</span>
                        <span className="font-semibold capitalize">{offerData.financing.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Down Payment:</span>
                        <span className="font-semibold">{offerData.financing.downPayment}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pre-Approved:</span>
                        <span className="font-semibold">{offerData.financing.preApproved ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Contingencies</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(offerData.contingencies).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className={`font-semibold ${value ? 'text-success' : 'text-destructive'}`}>
                            {value ? 'Included' : 'Waived'}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contingency Period:</span>
                        <span className="font-semibold">{offerData.contingenciesPeriod} days</span>
                      </div>
                    </div>
                  </div>

                  {offerData.personalNote && (
                    <div>
                      <h4 className="font-medium text-card-foreground mb-2">Personal Note</h4>
                      <p className="text-sm text-muted-foreground italic">"{offerData.personalNote}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Legal Disclaimer</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      This is a legally binding offer. By submitting, you agree to the terms and conditions.
                      We recommend reviewing with your real estate attorney before submission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="border-t border-border p-6">
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-input rounded-lg text-card-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Offer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCreationWizard;