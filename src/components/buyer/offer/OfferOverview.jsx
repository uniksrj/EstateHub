import { OFFER_STATUS } from "@/constants/offerTypes";

export const OfferOverview = ({ offers }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-foreground">{offers.length}</div>
                <div className="text-sm text-muted-foreground">Total Offers</div>
            </div>
            {/* Dynamic stats based on status */}
            {Object.keys(OFFER_STATUS).map(status => (
                <div key={status} className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold" style={{
                        color: `hsl(var(--${status === 'accepted' ? 'success' : status === 'rejected' ? 'destructive' : status === 'pending' ? 'warning' : 'primary'}))`
                    }}>
                        {offers.filter(o => o.status === status).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {OFFER_STATUS[status].text}
                    </div>
                </div>
            ))}
        </div>
    );
}