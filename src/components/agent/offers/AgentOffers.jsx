
import { AgentOfferFilter } from "./AgentOfferFilter";
import { Loading } from "@/pages/misc/Loading";
import { AgentOfferOverview } from "./AgentOfferOverview";
import { AgentOffersList } from "./AgentOffersList";
import { Tag } from "lucide-react";
import { AgentEmptyState } from "./AgentEmptyState";

export const AgentOffers = ({ 
  offers, 
  filteredOffers, 
  loading, 
  filters, 
  onFilterChange, 
  onAction 
}) => {
  if (loading) return <Loading loading={loading} isLineLoader={true} />;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Agent Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Property Offers</h1>
          </div>
          <p className="text-muted-foreground">Manage offers and inquiries from buyers</p>
        </div>

        <AgentOfferOverview offers={offers} />
        <AgentOfferFilter {...filters} onFilterChange={onFilterChange} />
        
        {/* Agent-specific content */}
        <AgentOffersList 
          offers={filteredOffers} 
          onAction={onAction}
          emptyState={<AgentEmptyState />}
        />
      </div>
    </div>
  );
};
