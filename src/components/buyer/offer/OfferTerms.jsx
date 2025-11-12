import { formatCurrency, formatDate, getDaysRemaining } from "@/utils/userHelpers"

export const OfferTerms = ({ offer }) => {
    return (
        <>
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
        </>
    )
}