import { useState, useEffect } from 'react';
import { Tag, Home, MapPin, MoreVertical, Eye, FileText, MessageSquare } from 'lucide-react';
import { formatCurrency, getOfferStatusColor, getOfferStatusText } from '@/utils/userHelpers';
import { Loading } from '@/pages/misc/Loading';
import { OfferOverview } from '@/components/buyer/offer/OfferOverview';
import { OfferFilter } from '@/components/buyer/offer/OfferFilter';
import { OfferTerms } from '@/components/buyer/offer/OfferTerms';
import { useNavigate } from 'react-router';
import { getDefaultOfferFormData } from '@/constants/offerTypes';
import { useOffers } from '@/hooks/useOffers';
import { toast } from 'sonner';

const BuyerOffers = () => {
  const {
    offers,
    loading,
    withdrawOffer,
    acceptCounterOffer,
    rejectCounterOffer,
    refreshOffers
  } = useOffers();
  // const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    refreshOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [searchTerm, statusFilter, sortBy, offers]);

  const filterOffers = () => {
    if (!offers || offers.length === 0) {
      setFilteredOffers([]);
      return;
    }

    let filtered = [...offers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(offer =>
        offer.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.property?.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(offer => offer.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
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


  const handleWithdrawOffer = async (offerId) => {
    if (confirm('Are you sure you want to withdraw this offer?')) {
      try {
        await withdrawOffer(offerId);
        toast.success("Offer withdrawn successfully!");
      } catch (error) {
        console.error("Error withdrawing offer:", error);
        toast.error("Failed to withdraw offer.");
      }
    }
  };

  const handleAcceptCounter = async (offerId) => {
    if (confirm('Accept the counter offer?')) {
      try {
        await acceptCounterOffer(offerId);
        toast.success("Counter offer accepted!");
      } catch (error) {
        console.error("Error accepting counter offer:", error);
        toast.error("Failed to accept counter offer.");
      }
    }
  };

  const handleRejectCounter = async (offerId) => {
    try {
      await rejectCounterOffer(offerId);
      toast.success("Counter offer rejected.");
    } catch (error) {
      console.error("Failed to reject counter offer:", error);
      toast.error("Failed to reject counter offer.");
    }
  };

  if (loading) {
    return (
      <Loading loading={loading} isLineLoader={true} />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">My Offers</h1>
          </div>
          <p className="text-muted-foreground">Track and manage your property offers</p>
        </div>

        {/* Stats Overview */}
        <OfferOverview offers={offers} />

        {/* Filters and Search */}
        <OfferFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="bg-card rounded-xl shadow-lg border border-border p-12 text-center">
              <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-card-foreground mb-2">
                {offers.length === 0 ? "No offers yet" : "No matching offers"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {offers.length === 0
                  ? "Start by exploring properties and making your first offer!"
                  : "Try adjusting your filters to see more offers."}
              </p>

              {/* ✅ PROPER navigation to where offers are made */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/buyer/search')}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90"
                >
                  Browse Properties
                </button>
                <button
                  onClick={() => navigate('/buyer/favorites')}
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90"
                >
                  View Saved Properties
                </button>
              </div>
            </div>
          ) : (
            filteredOffers.map(offer => (
              <div key={offer.id} className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                        <Home className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Offer Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-card-foreground mb-1">
                            {offer.property.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{`${offer?.property?.address}, ${offer?.property?.city}, ${offer?.property?.state}, ${offer?.property?.country}(${offer?.property?.zip_code})`}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{offer.property?.bedrooms} beds</span>
                            <span>{offer.property?.bathrooms} baths</span>
                            <span>{offer.property?.sq_ft.toLocaleString()} sqft</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getOfferStatusColor(offer.status)}`}>
                            {getOfferStatusText(offer.status)}
                          </span>
                          <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      {/* Offer Terms */}
                      <OfferTerms offer={offer} />

                      {/* Seller Response */}
                      {offer.sellerResponse && (
                        <div className="bg-muted/30 rounded-lg p-4 mb-4">
                          <div className="text-sm font-medium text-card-foreground mb-1">
                            Seller Response
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {offer.sellerResponse}
                          </div>
                          {offer.counterOffer && (
                            <div className="mt-2 text-sm">
                              <span className="text-card-foreground">Counter Offer: </span>
                              <span className="font-semibold text-primary">
                                {formatCurrency(offer.counterOffer)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                          View Property
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
                          <FileText className="w-4 h-4" />
                          Offer Details
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
                          <MessageSquare className="w-4 h-4" />
                          Contact Agent
                        </button>

                        {/* Status-specific actions */}
                        {offer.status === 'pending' && (
                          <button
                            onClick={() => handleWithdrawOffer(offer.id)}
                            className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors duration-200"
                          >
                            Withdraw Offer
                          </button>
                        )}

                        {offer.status === 'counter_offer' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAcceptCounter(offer.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                            >
                              Accept Counter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors duration-200">
                              Reject Counter
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerOffers;