import { OFFER_STATUS } from "@/constants/offerTypes";
import { Search } from "lucide-react";

export const OfferFilter = ({ searchTerm, statusFilter, sortBy, onFilterChange }) => {
    return (
        <div className="bg-card rounded-xl shadow-lg border border-border p-4 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchTerm}
                            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => onFilterChange('statusFilter', e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">All Statuses</option>
                        {Object.keys(OFFER_STATUS).map(status => (
                            <option key={status} value={status}>
                                {OFFER_STATUS[status].text}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => onFilterChange('sortBy', e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="price_low">Price: Low to High</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
