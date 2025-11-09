import { useState, useEffect } from 'react';
import { Tag, DollarSign, Calendar, Home, MapPin, Clock, Filter, Search, MoreVertical, Eye, FileText, MessageSquare } from 'lucide-react';

const BuyerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock offers data - replace with actual API calls
  const mockOffers = [
    {
      id: 1,
      property: {
        id: 101,
        title: "Modern Downtown Condo",
        address: "123 Main St, Downtown, CA",
        price: 485000,
        image: "/api/placeholder/400/300",
        beds: 2,
        baths: 2,
        sqft: 1200
      },
      offerAmount: 475000,
      offerDate: "2024-01-15",
      status: "pending", // pending, accepted, rejected, counter_offer, withdrawn
      expiration: "2024-01-22",
      lastUpdated: "2024-01-15",
      sellerResponse: null,
      counterOffer: null,
      contingencies: ["financing", "inspection"],
      earnestMoney: 10000,
      notes: "Love the natural light in this unit!"
    },
    {
      id: 2,
      property: {
        id: 102,
        title: "Luxury Waterfront Villa",
        address: "456 Beach Rd, Malibu, CA",
        price: 2500000,
        image: "/api/placeholder/400/300",
        beds: 5,
        baths: 4,
        sqft: 3800
      },
      offerAmount: 2450000,
      offerDate: "2024-01-12",
      status: "accepted",
      expiration: "2024-01-19",
      lastUpdated: "2024-01-13",
      sellerResponse: "Accepted your offer! Let's move forward.",
      counterOffer: null,
      contingencies: ["financing", "inspection", "appraisal"],
      earnestMoney: 50000,
      notes: "Perfect for our growing family"
    },
    {
      id: 3,
      property: {
        id: 103,
        title: "Charming Victorian House",
        address: "789 Oak Ave, Heritage, CA",
        price: 650000,
        image: "/api/placeholder/400/300",
        beds: 3,
        baths: 2,
        sqft: 1800
      },
      offerAmount: 620000,
      offerDate: "2024-01-10",
      status: "rejected",
      expiration: "2024-01-17",
      lastUpdated: "2024-01-11",
      sellerResponse: "Received a higher offer from another buyer.",
      counterOffer: null,
      contingencies: ["financing", "inspection"],
      earnestMoney: 15000,
      notes: "Great character but needs some updates"
    },
    {
      id: 4,
      property: {
        id: 104,
        title: "Urban Loft Apartment",
        address: "321 Loft St, Arts District, CA",
        price: 350000,
        image: "/api/placeholder/400/300",
        beds: 1,
        baths: 1,
        sqft: 900
      },
      offerAmount: 340000,
      offerDate: "2024-01-08",
      status: "counter_offer",
      expiration: "2024-01-15",
      lastUpdated: "2024-01-09",
      sellerResponse: "We'd like to counter at $345,000",
      counterOffer: 345000,
      contingencies: ["financing"],
      earnestMoney: 8000,
      notes: "Perfect downtown location"
    },
    {
      id: 5,
      property: {
        id: 105,
        title: "Suburban Family Home",
        address: "654 Pine St, Suburbia, CA",
        price: 750000,
        image: "/api/placeholder/400/300",
        beds: 4,
        baths: 3,
        sqft: 2200
      },
      offerAmount: 730000,
      offerDate: "2024-01-05",
      status: "withdrawn",
      expiration: "2024-01-12",
      lastUpdated: "2024-01-06",
      sellerResponse: null,
      counterOffer: null,
      contingencies: ["financing", "inspection"],
      earnestMoney: 20000,
      notes: "Found another property we liked better"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchOffers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOffers(mockOffers);
      setFilteredOffers(mockOffers);
      setLoading(false);
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [searchTerm, statusFilter, sortBy, offers]);

  const filterOffers = () => {
    let filtered = [...offers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(offer =>
        offer.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.property.address.toLowerCase().includes(searchTerm.toLowerCase())
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
          return new Date(b.offerDate) - new Date(a.offerDate);
        case 'oldest':
          return new Date(a.offerDate) - new Date(b.offerDate);
        case 'price_high':
          return b.offerAmount - a.offerAmount;
        case 'price_low':
          return a.offerAmount - b.offerAmount;
        default:
          return 0;
      }
    });

    setFilteredOffers(filtered);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/20 text-warning border-warning/30',
      accepted: 'bg-success/20 text-success border-success/30',
      rejected: 'bg-destructive/20 text-destructive border-destructive/30',
      counter_offer: 'bg-primary/20 text-primary border-primary/30',
      withdrawn: 'bg-muted text-muted-foreground border-border'
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pending Review',
      accepted: 'Accepted',
      rejected: 'Rejected',
      counter_offer: 'Counter Offer',
      withdrawn: 'Withdrawn'
    };
    return texts[status] || status;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleWithdrawOffer = (offerId) => {
    if (confirm('Are you sure you want to withdraw this offer?')) {
      setOffers(prev => prev.map(offer =>
        offer.id === offerId ? { ...offer, status: 'withdrawn' } : offer
      ));
    }
  };

  const handleAcceptCounter = (offerId) => {
    if (confirm('Accept the counter offer?')) {
      setOffers(prev => prev.map(offer =>
        offer.id === offerId ? { ...offer, status: 'accepted' } : offer
      ));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-foreground">{offers.length}</div>
            <div className="text-sm text-muted-foreground">Total Offers</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-success">{offers.filter(o => o.status === 'accepted').length}</div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-warning">{offers.filter(o => o.status === 'pending').length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-primary">{offers.filter(o => o.status === 'counter_offer').length}</div>
            <div className="text-sm text-muted-foreground">Counter Offers</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-destructive">{offers.filter(o => o.status === 'rejected').length}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="counter_offer">Counter Offers</option>
                <option value="withdrawn">Withdrawn</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
              </select>
            </div>

            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap">
              Make New Offer
            </button>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="bg-card rounded-xl shadow-lg border border-border p-12 text-center">
              <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-card-foreground mb-2">No offers found</h3>
              <p className="text-muted-foreground mb-6">
                {offers.length === 0 
                  ? "You haven't made any offers yet. Start by exploring properties!" 
                  : "No offers match your current filters."}
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                Browse Properties
              </button>
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
                            <span>{offer.property.address}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{offer.property.beds} beds</span>
                            <span>{offer.property.baths} baths</span>
                            <span>{offer.property.sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(offer.status)}`}>
                            {getStatusText(offer.status)}
                          </span>
                          <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      {/* Offer Terms */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">List Price</div>
                          <div className="font-semibold text-card-foreground">
                            {formatCurrency(offer.property.price)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Your Offer</div>
                          <div className="font-semibold text-card-foreground">
                            {formatCurrency(offer.offerAmount)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Offer Date</div>
                          <div className="font-semibold text-card-foreground">
                            {formatDate(offer.offerDate)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Expires In</div>
                          <div className="font-semibold text-card-foreground">
                            {getDaysRemaining(offer.expiration)} days
                          </div>
                        </div>
                      </div>

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