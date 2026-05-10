// Default financing options
export const DEFAULT_FINANCING = {
    type: 'conventional',
    preApproved: true,
    downPayment: 20
};

// Default offer form data
export const getDefaultOfferFormData = (propertyPrice = 0) => ({
    offerAmount: propertyPrice,
    personalNote: '',
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    contingencies: {
        inspection: true,
        financing: true,
        appraisal: true
    },
    contingenciesPeriod: 17,
    earnestMoney: Math.round(propertyPrice * 0.02),
    financing: { ...DEFAULT_FINANCING },
    includeLetter: false
});

// Status options and colors
export const OFFER_STATUS = {
    pending: { text: 'Pending Review', color: 'bg-warning/20 text-warning border-warning/30' },
    accepted: { text: 'Accepted', color: 'bg-success/20 text-success border-success/30' },
    rejected: { text: 'Rejected', color: 'bg-destructive/20 text-destructive border-destructive/30' },
    countered: { text: 'Counter Offer', color: 'bg-primary/20 text-primary border-primary/30' },
    withdrawn: { text: 'Withdrawn', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
    cancelled: { text: 'Cancelled', color: 'bg-gray-500/20 text-gray-600 border-gray-500/30' }
};

// For Agent dropdown - different terminology and order
export const AGENT_OFFER_STATUS = {
    pending: { text: 'Needs Response', color: 'bg-warning/20 text-warning border-warning/30' },
    countered: { text: 'Countered - Awaiting Reply', color: 'bg-primary/20 text-primary border-primary/30' },
    accepted: { text: 'Accepted - Deal in Progress', color: 'bg-success/20 text-success border-success/30' },
    rejected: { text: 'Rejected', color: 'bg-destructive/20 text-destructive border-destructive/30' },
    withdrawn: { text: 'Buyer Withdrawn', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
    cancelled: { text: 'Buyer Cancelled', color: 'bg-gray-500/20 text-gray-600 border-gray-500/30' }
};

// Wizard steps
export const OFFER_WIZARD_STEPS = [
    { number: 1, title: 'Offer Terms', icon: 'DollarSign' },
    { number: 2, title: 'Contingencies', icon: 'Shield' },
    { number: 3, title: 'Financing', icon: 'Calculator' },
    { number: 4, title: 'Review', icon: 'CheckCircle' }
];

export const colorClasses = {
    foreground: "text-foreground",
    warning: "text-warning",
    success: "text-success",
    destructive: "text-destructive",
    primary: "text-primary",
    muted: "text-muted-foreground",
    blue: "text-blue-600",
    secondary: "text-secondary-foreground"
}
