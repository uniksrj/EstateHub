import { useState, useEffect } from 'react';
import { Loading } from '@/pages/misc/Loading';
import { getDefaultOfferFormData } from '@/constants/offerTypes';
import { useOffers } from '@/hooks/useOffers';
import { toast } from 'sonner';
import ContactSellerDialog from '@/components/buyer/ContactSellerDialog';
import { OfferDetailsModal } from '@/components/buyer/offer/OfferDetailsModal';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { useAuth } from '@/hooks/useAuth';
import { AgentOfferOverview } from '@/components/agent/offers/AgentOfferOverview';
import { BuyerOffers } from '@/components/buyer/offer/BuyerOffers';
import { AgentOffers } from '@/components/agent/offers/AgentOffers';


const Offers = () => {

  const {
    offers,
    loading,
    canceledOffer,
    deleteOffer,
    refreshOffers
  } = useOffers();

  // User authentication and role checking
  const { user } = useAuth()

  const [filteredOffers, setFilteredOffers] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    sortBy: 'newest'
  });
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    offerId: null,
    action: null,
    data: null
  })

  // Fetch offers on component mount
  useEffect(() => {
    refreshOffers();
  }, []);

  // Filter offers whenever filters, or offers change
  useEffect(() => {
    filterOffers();
  }, [filters, offers]);
  
  if (loading) {
    return (
      <Loading loading={loading} isLineLoader={true} />
    );
  }

  /**
   * Filters and sorts offers based on current filter criteria
   */
  const filterOffers = () => {
    
    if (!offers || offers.length === 0) {
      setFilteredOffers([]);
      return;
    }

    let filtered = [...offers];
    
    if (filters.searchTerm) {
      filtered = filtered.filter(offer =>
        offer.property?.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        offer.property?.address?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    if (filters.statusFilter !== 'all') {
      filtered = filtered.filter(offer => offer.status === filters.statusFilter);
    }
    
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.offer_date || b.offerDate) - new Date(a.offer_date || a.offerDate);
        case 'oldest':
          return new Date(a.offer_date || a.offerDate) - new Date(b.offer_date || b.offerDate);
        case 'price_high':
          return (b.offer_amount || b.offerAmount) - (a.offer_amount || a.offerAmount);
        case 'price_low':
          return (a.offer_amount || a.offerAmount) - (b.offer_amount || b.offerAmount);
        default:
          return 0;
      }
    });

    setFilteredOffers(filtered);
  };

  /**
   * Updates offer status and refreshes local state
   * @param {number} offerId - ID of the offer to update
   * @param {string} newStatus - New status to set
   * @param {object} confirmData - Success/error message configuration
   */
  const handleUpdateOfferStatus = async (offerId, newStatus, confirmData = {}) => {
    try {
      switch (newStatus) {
        case "cancelled":

          canceledOffer(offerId);
          toast.success(confirmData.successMessage || 'Action completed successfully');
          break;
      }

      setFilteredOffers(prevOffers =>
        prevOffers.map(offer =>
          offer.id === offerId
            ? {
              ...offer,
              status: newStatus,
              updated_at: new Date().toISOString()
            }
            : offer
        )
      );
    } catch (error) {
      console.error("Error withdrawing offer:", error);
      toast.error(confirmData.errorMessage || 'Failed to complete action');
    }
  };

  /**
   * Permanently deletes an offer
   * @param {number} offerId - ID of the offer to delete
   * @param {string} newStatus - Not used, can be removed
   * @param {object} confirmData - Success/error message configuration
   */
  const handleDeleteOffer = async (offerId, newStatus, confirmData = {}) => {
    try {
      deleteOffer(offerId)
      toast.success(confirmData.successMessage || 'Action completed successfully');
      setFilteredOffers(prevOffers =>
        prevOffers.filter(offer => offer.id !== offerId)
      );
    } catch (error) {
      console.error("Error withdrawing offer:", error);
      toast.error(confirmData.errorMessage || 'Failed to complete action');
    }
  }

  /**
   * Opens confirmation modal for destructive actions
   * @param {number} offerId - ID of the offer being acted upon
   * @param {string} action - Type of action (cancel, delete, etc.)
   * @param {object} data - Modal configuration (title, description, etc.)
   */
  const openConfirmation = (offerId, action, data) => {
    setConfirmModal({
      isOpen: true,
      offerId,
      action,
      data
    })
  }

  /**
   * Handles confirmation from modal and executes the appropriate action
   */
  const handleConfirm = async () => {
    const { offerId, action, data } = confirmModal

    switch (action) {
      case 'cancel':
        await handleUpdateOfferStatus(offerId, 'cancelled', {
          successMessage: 'Offer cancelled successfully',
          errorMessage: 'Failed to cancel offer'
        })
        break

      case 'accept_counter':
        await handleUpdateOfferStatus(offerId, 'accepted', {
          successMessage: 'Counter offer accepted!',
          errorMessage: 'Failed to accept counter offer'
        })
        break

      case 'reject_counter':
        await handleUpdateOfferStatus(offerId, 'rejected', {
          successMessage: 'Counter offer rejected',
          errorMessage: 'Failed to reject counter offer'
        })
        break

      case 'renew':
        await handleUpdateOfferStatus(offerId, 'pending', {
          successMessage: 'Offer renewed successfully',
          errorMessage: 'Failed to renew offer'
        })
        break

      case 'delete':
        await handleDeleteOffer(offerId, 'delete', {
          successMessage: 'Offer Deleted successfully',
          errorMessage: 'Failed to delete offer'
        })
        break
    }
    
    setConfirmModal({ isOpen: false, offerId: null, action: null, data: null })
  }

  /**
   * Unified filter handler - updates specific filter property
   */
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const handleAction = (actionType, offer, additionalData = {}) => {

    switch (actionType) {
      case 'view':
        setSelectedOffer(offer);
        setShowModal(true);
        break;
      case 'contact':
        setSelectedOffer(offer);
        setShowContactDialog(true);
        break;
      case 'cancel':
        openConfirmation(offer.id, 'cancel', {
          title: "Cancel Offer?",
          description: "Are you sure you want to cancel this offer? This action cannot be undone.",
          confirmText: "Yes, Cancel Offer",
          variant: "destructive"
        });
        break;
      case 'delete':
        openConfirmation(offer.id, 'cancel', {
          title: "Delete Offer?",
          description: "Are you sure you want to delete this offer? This action cannot be undone.",
          confirmText: "Yes, Delete Offer",
          variant: "destructive"
        });
        break;
      default:
        console.warn('Unknown action type:', actionType);
    }
  }

  const RoleSpecificComponent = user.role_id === 3 ? AgentOffers : BuyerOffers;
  
  return (
    <>
      <RoleSpecificComponent
        offers={offers}
        filteredOffers={filteredOffers}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
        onAction={handleAction}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirm}
        title={confirmModal.data?.title}
        description={confirmModal.data?.description}
        confirmText={confirmModal.data?.confirmText}
        variant={confirmModal.data?.variant}
      />

      {
        selectedOffer && (
          <OfferDetailsModal
            offer={selectedOffer}
            isOpen={showModal}
            onClose={() => {
              setShowModal(false)
              setSelectedOffer(null)
            }}
          />
        )
      }

      {
        showContactDialog && selectedOffer && (
          <ContactSellerDialog
            property={selectedOffer?.property}
            isOpen={showContactDialog}
            onClose={() => setShowContactDialog(false)}
          />
        )
      }
    </>
  );
};

export default Offers;