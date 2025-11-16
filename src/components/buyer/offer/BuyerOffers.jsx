import { Loading } from "@/pages/misc/Loading";
import { BuyerOfferOverview } from "./BuyerOfferOverview";
import { BuyerOffersList } from "./BuyerOffersList";
import { useNavigate } from "react-router";
import { Tag } from "lucide-react";
import { OfferFilter } from "./OfferFilter";
import { BuyerEmptyState } from "./BuyerEmptyState";

// components/buyer/BuyerOffers.jsx
export const BuyerOffers = ({ 
  offers, 
  filteredOffers, 
  loading, 
  filters, 
  onFilterChange, 
  onAction 
}) => {
  const navigate = useNavigate();
  if (loading) return <Loading loading={loading} isLineLoader={true} />;
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Buyer Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">My Offers</h1>
          </div>
          <p className="text-muted-foreground">Track and manage your property offers</p>
        </div>

        <BuyerOfferOverview offers={offers} />
        <OfferFilter {...filters} onFilterChange={onFilterChange} />
        
        {/* Buyer-specific content */}
        <BuyerOffersList 
          offers={filteredOffers} 
          onAction={onAction}
          emptyState={
            <BuyerEmptyState onBrowseProperties={() => navigate('/buyer/search')} />
          }
        />
      </div>
    </div>
  );
};