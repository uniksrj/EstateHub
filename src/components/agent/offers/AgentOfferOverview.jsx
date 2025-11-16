import StatCard from "@/components/common/offers/StatCard";

export const AgentOfferOverview = ({ offers }) => {
    const stats = {
        total: offers.length,
        pending: offers.filter(o => o.status === 'pending').length,
        accepted: offers.filter(o => o.status === 'accepted').length,
        rejected: offers.filter(o => o.status === 'rejected').length,
        countered: offers.filter(o => o.status === 'countered').length,
        responseRate: offers.length > 0 ? 
            Math.round(((offers.filter(o => o.status !== 'pending').length) / offers.length) * 100) : 0,
        avgResponseTime: "24h", 
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <StatCard 
                value={stats.total}
                label="Total Offers"
                color="foreground"
            />
            <StatCard 
                value={stats.pending}
                label="Needs Response"
                color="warning"
            />
            <StatCard 
                value={stats.accepted}
                label="Accepted"
                color="success"
            />
            <StatCard 
                value={stats.countered}
                label="Countered"
                color="primary"
            />
            <StatCard 
                value={stats.rejected}
                label="Rejected"
                color="destructive"
            />
            <StatCard 
                value={`${stats.responseRate}%`}
                label="Response Rate"
                color="blue"
            />
            <StatCard 
                value={stats.avgResponseTime}
                label="Avg Response Time"
                color="secondary"
            />
        </div>
    );
}