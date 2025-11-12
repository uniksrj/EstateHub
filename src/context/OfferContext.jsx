
import { createContext, useState } from 'react';

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const addNewOffer = (property, offerData) => {
        const newId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;

        const newOffer = {
            id: newId,
            property_id: property.id,
            buyer_id: 1,
            offer_amount: offerData.offerAmount,
            message: offerData.personalNote,
            status: 'pending', 
            counter_offer_amount: null, 
            counter_offer_message: null, 
            commission_rate: 2.50,
            special_conditions: JSON.stringify({
                contingencies: Object.keys(offerData.contingencies).filter(key => offerData.contingencies[key]),
                contingencies_period: offerData.contingenciesPeriod,
                financing_type: offerData.financing.type,
                down_payment: offerData.financing.downPayment,
                pre_approved: offerData.financing.preApproved,
                earnest_money: offerData.earnestMoney,
                closing_date: offerData.closingDate
            }), 
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').substring(0, 19),
            offer_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            accepted_at: null,
            rejected_at: null,
            created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
            updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
            
            property: property,
            offerDetails: offerData
        };

        setOffers(prev => [newOffer, ...prev]);
        return newOffer;
    };

    const updateOfferStatus = (offerId, status, sellerResponse = null, counterOffer = null) => {
        setOffers(prev => prev.map(offer =>
            offer.id === offerId
                ? {
                    ...offer,
                    // Database fields
                    status: status,
                    counter_offer_message: sellerResponse,
                    counter_offer_amount: counterOffer,
                    updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    // Set accepted_at or rejected_at based on status
                    ...(status === 'accepted' && {
                        accepted_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        rejected_at: null
                    }),
                    ...(status === 'rejected' && {
                        rejected_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        accepted_at: null
                    }),

                    // Frontend fields
                    sellerResponse: sellerResponse,
                    counterOffer: counterOffer,
                    lastUpdated: new Date().toISOString().split('T')[0]
                }
                : offer
        ));
    };

    const value = {
        offers,
        addNewOffer,
        updateOfferStatus
    };

    return (
        <OfferContext.Provider value={value}>
            {children}
        </OfferContext.Provider>
    );
};

export default OfferContext;

