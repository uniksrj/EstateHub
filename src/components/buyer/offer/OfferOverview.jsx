export const OfferOverview = ({ offers }) => {
    return (
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
    );
}