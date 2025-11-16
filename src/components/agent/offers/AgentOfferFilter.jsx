import { Button } from "@/components/ui/button";
import { AGENT_OFFER_STATUS } from "@/constants/offerTypes";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

// components/agent/AgentOfferFilter.jsx
export const AgentOfferFilter = ({ searchTerm, statusFilter, sortBy, onFilterChange }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search - Agent specific placeholder */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by property, buyer, or address..."
              value={searchTerm}
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter - Agent specific options */}
          <select
            value={statusFilter}
            onChange={(e) => onFilterChange('statusFilter', e.target.value)}
            className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {Object.keys(AGENT_OFFER_STATUS).map(status => (
              <option key={status} value={status}>
                {AGENT_OFFER_STATUS[status].text}
              </option>
            ))}
          </select>

          {/* Additional Agent-specific filters */}
          <select
            value={sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="priority">Priority</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
          </select>
        </div>

        {/* Agent-specific actions */}
        <Button variant="outline" onClick={() => navigate('/agent/analytics')}>
          View Analytics
        </Button>
      </div>
    </div>
  );
};