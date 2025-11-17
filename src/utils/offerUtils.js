// utils/offerUtils.js
import { getDefaultOfferFormData } from '../constants/offerTypes';

// Create backend offer data (for database)
export const createBackendOffer = (property, offerData, buyerId = 1) => {
    return {
        property_id: property.id,
        buyer_id: buyerId,
        offer_amount: parseFloat(offerData.offerAmount),
        message: offerData.personalNote,
        status: 'pending',
        counter_offer_amount: null,
        counter_offer_message: null,
         commission_rate: offerData.commission_rate || 2.50,
        special_conditions: JSON.stringify({
            contingencies: Object.keys(offerData.contingencies).filter(key => offerData.contingencies[key]),
            contingencies_period: offerData.contingenciesPeriod,
            financing_type: offerData.financing.type,
            down_payment: offerData.financing.downPayment,
            pre_approved: offerData.financing.preApproved,
            financing: offerData.financing,
            earnest_money: offerData.earnestMoney,
            closing_date: offerData.closingDate,
            original_offer_data: offerData
        }),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').substring(0, 19),
        offer_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        accepted_at: null,
        rejected_at: null,        
    };
};

// Create frontend offer data (for UI state)
export const createFrontendOffer = (backendOffer, property, offerData, frontendId = null) => {
    return {
        ...backendOffer,
        id: frontendId || backendOffer.id,
        property: property,
        offerDetails: offerData
    };
};

// Parse special conditions from database
export const parseSpecialConditions = (specialConditions) => {
    try {
        return typeof specialConditions === 'string'
            ? JSON.parse(specialConditions)
            : specialConditions;
    } catch {
        return {};
    }
};

// Get offer details for display
export const getOfferDetails = (offer) => {
    const specialConditions = parseSpecialConditions(offer.special_conditions);

    return {
        closingDate: specialConditions.closing_date,
        contingencies: specialConditions.contingencies || {},
        contingenciesPeriod: specialConditions.contingencies_period,
        earnestMoney: specialConditions.earnest_money,
        financing: specialConditions.financing || {},
        includeLetter: specialConditions.include_letter,
        offerAmount: offer.offer_amount,
        offerDate: offer.offer_date?.split(' ')[0],
        personalNote: offer.message,
        propertyId: offer.property_id,
        status: offer.status
    };
};

export const transformBackendOffer = (backendOffer) => {
    // Parse special_conditions JSON
    const specialConditions = typeof backendOffer.special_conditions === 'string' 
        ? JSON.parse(backendOffer.special_conditions) 
        : backendOffer.special_conditions || {};

    // Get original_offer_data or reconstruct it
    const originalOfferData = specialConditions.original_offer_data || {
        propertyId: backendOffer.property_id,
        offerAmount: parseFloat(backendOffer.offer_amount),
        earnestMoney: specialConditions.earnest_money || 0,
        closingDate: specialConditions.closing_date,
        contingencies: specialConditions.contingencies || {},
        contingenciesPeriod: specialConditions.contingencies_period || 17,
        financing: specialConditions.financing || {
            type: specialConditions.financing_type || 'conventional',
            preApproved: specialConditions.pre_approved || true,
            downPayment: specialConditions.down_payment || 20
        },
        personalNote: backendOffer.message || '',
        includeLetter: specialConditions.include_letter || false,
        offerDate: backendOffer.offer_date?.split('T')[0],
        expiration: backendOffer.expires_at?.split('T')[0],
        status: backendOffer.status
    };

    return {
        // Database fields
        id: backendOffer.id,
        property_id: backendOffer.property_id,
        buyer_id: backendOffer.buyer_id,
        offer_amount: parseFloat(backendOffer.offer_amount), 
        message: backendOffer.message,
        status: backendOffer.status,
        counter_offer_amount: backendOffer.counter_offer_amount ? parseFloat(backendOffer.counter_offer_amount) : null,
        counter_offer_message: backendOffer.counter_offer_message,
        commission_rate: parseFloat(backendOffer.commission_rate),
        special_conditions: backendOffer.special_conditions,
        expires_at: backendOffer.expires_at,
        offer_date: backendOffer.offer_date,
        accepted_at: backendOffer.accepted_at,
        rejected_at: backendOffer.rejected_at,
        created_at: backendOffer.created_at,
        updated_at: backendOffer.updated_at,
        buyer_info : backendOffer.buyer ?? [],

        // Frontend display fields
        property: backendOffer.property || {},
        offerDetails: originalOfferData,
        
        // Legacy frontend fields (for compatibility)
        offerAmount: parseFloat(backendOffer.offer_amount),
        offerDate: backendOffer.offer_date?.split('T')[0],
        expiration: backendOffer.expires_at?.split('T')[0],
        lastUpdated: backendOffer.updated_at?.split('T')[0],
        sellerResponse: backendOffer.counter_offer_message,
        counterOffer: backendOffer.counter_offer_amount ? parseFloat(backendOffer.counter_offer_amount) : null,
        contingencies: specialConditions.contingencies || [],
        earnestMoney: specialConditions.earnest_money || 0,
        notes: backendOffer.message
    };
};