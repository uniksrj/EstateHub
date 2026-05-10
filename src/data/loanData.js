export const loanOptions = [
    {
        type: '30-Year Fixed',
        rate: 6.5,
        description: 'Stable monthly payments for the life of the loan',
        pros: ['Predictable payments', 'Lower monthly payment', 'Good for long-term ownership'],
        cons: ['Higher interest rate', 'More interest paid over time'],
        recommended: true,
        term: 30
    },
    {
        type: '15-Year Fixed',
        rate: 6.0,
        description: 'Build equity faster with higher monthly payments',
        pros: ['Lower interest rate', 'Pay off loan faster', 'Less total interest'],
        cons: ['Higher monthly payment', 'Less cash flow flexibility'],
        recommended: false,
        term: 15
    },
    {
        type: '5/1 ARM',
        rate: 5.75,
        description: 'Fixed rate for 5 years, then adjusts annually',
        pros: ['Lower initial rate', 'Good for short-term ownership', 'Lower initial payments'],
        cons: ['Rate can increase', 'Payment uncertainty', 'Complex terms'],
        recommended: false,
        term: 30,
        armDetails: {
            fixedPeriod: 5,
            adjustmentCap: 2,
            lifetimeCap: 5,
            margin: 2.75,
            index: 'SOFR'
        }
    }
];