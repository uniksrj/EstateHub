import { useAuth } from '@/hooks/useAuth';
import { userAPI } from '@/services/api';
import { createBackendOffer, createFrontendOffer, transformBackendOffer } from '@/utils/offerUtils';
import { formatCurrency } from '@/utils/userHelpers';
import { createContext, useState } from 'react';
import { toast } from 'sonner';

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const { user } = useAuth()
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    const addNewOffer = async (property, offerData) => {
        const user_id = JSON.parse(localStorage.getItem('user')).id;
        const newId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
        setLoading(true);
        let toastId = null;
        try {
            const backendOffer = createBackendOffer(property, offerData, user_id);
            toastId = toast.loading("Submitting your offer...");

            await userAPI.store_offer_details(backendOffer);
            toast.success("Offer submitted successfully!", {
                id: toastId,
                description: `Your offer of ${formatCurrency(offerData.offerAmount)} for ${property.title} has been submitted.`
            });

            const frontendOffer = createFrontendOffer(backendOffer, property, offerData, newId);
            setOffers(prev => [frontendOffer, ...prev]);
            return frontendOffer;

        } catch (error) {
            console.error("Failed to store offer details to backend:", error);
            if (toastId) {
                toast.dismiss(toastId);
            }
            toast.error("Failed to submit offer", {
                description: error.response?.data?.message || "Please check your connection and try again."
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateOfferStatus = async (offerId, status, sellerResponse = null, counterOffer = null) => {
        try {
            setOffers(prev => prev.map(offer =>
                offer.id === offerId
                    ? {
                        ...offer,
                        status: status,
                        counter_offer_message: sellerResponse,
                        counter_offer_amount: counterOffer,
                        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        ...(status === 'accepted' && {
                            accepted_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                            rejected_at: null
                        }),
                        ...(status === 'rejected' && {
                            rejected_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                            accepted_at: null
                        }),
                        sellerResponse: sellerResponse,
                        counterOffer: counterOffer,
                        lastUpdated: new Date().toISOString().split('T')[0]
                    }
                    : offer
            ));

            const requestData = {
                status: status,
                ...(sellerResponse && { counter_offer_message: sellerResponse }),
                ...(counterOffer && { counter_offer_amount: counterOffer })
            };

            if (user.role_id === 5) {
                await userAPI.changeBuyerStatusOffer(offerId, requestData);
            } else if ([3, 6].includes(user.role_id)) {
                await userAPI.changeAgentStatusOffer(offerId, requestData);
            }

        } catch (error) {
            console.error("Failed to update offer status:", error);
            refreshOffers();
            throw error;
        }
    };

    const canceledOffer = async (offerId) => {
        return updateOfferStatus(offerId, 'cancelled');
    };

    const acceptedOffer = async (offerId) => {
        return updateOfferStatus(offerId, 'accepted');
    };

    const withdrawOffer = async (offerId) => {
        return updateOfferStatus(offerId, 'withdrawn', 'Offer withdrawn by buyer');
    };

    const acceptCounterOffer = async (offerId) => {
        return updateOfferStatus(offerId, 'accepted', 'Counter offer accepted', null);
    };

    const rejectCounterOffer = async (offerId) => {
        return updateOfferStatus(offerId, 'rejected', 'Counter offer rejected', null);
    };

    const makeCounterOffer = async (offerId, counterAmount, message) => {
        return updateOfferStatus(offerId, 'counter_offer', message, counterAmount);
    };

    const deleteOffer = async (offerId) => {
        try {
            await userAPI.deleteOffer(offerId);
        } catch (error) {
            console.error("Failed to delete offer :", error);
            refreshOffers();
            throw error;
        }
    };

    const refreshOffers = async () => {
        setLoading(true);
        try {
            const response = await userAPI.get_offers();
            const transformedOffers = response.data.offers.map(transformBackendOffer);

            setOffers(transformedOffers);
        } catch (error) {
            console.error("Failed to fetch offers:", error);
            toast.error("Failed to load offers.");
        } finally {
            setLoading(false);
        }
    };

    // Helper functions
    const getOfferById = (offerId) => {
        return offers.find(offer => offer.id === offerId);
    };

    const getOffersByProperty = (propertyId) => {
        return offers.filter(offer => offer.property_id === propertyId);
    };

    const getOffersByStatus = (status) => {
        return offers.filter(offer => offer.status === status);
    };

    const value = {
        // State
        offers,
        loading,

        // Core actions
        addNewOffer,
        refreshOffers,

        // Status updates
        updateOfferStatus,
        withdrawOffer,
        acceptCounterOffer,
        rejectCounterOffer,
        makeCounterOffer,
        canceledOffer,
        deleteOffer,
        acceptedOffer,

        // Getters
        getOfferById,
        getOffersByProperty,
        getOffersByStatus,
    };

    return (
        <OfferContext.Provider value={value}>
            {children}
        </OfferContext.Provider>
    );
};

export default OfferContext;