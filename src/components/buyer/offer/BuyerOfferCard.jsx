import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, MapPin, MoreVertical, Eye, FileText, MessageSquare, X, Check, RefreshCw, Edit, Trash2, CreditCard } from "lucide-react"
import { formatCurrency } from "@/utils/loan";
import { getOfferStatusColor, getOfferStatusText } from "@/utils/userHelpers";
import { OfferTerms } from "@/components/buyer/offer/OfferTerms"
import { Link } from "react-router"

const BuyerOfferCard = ({ offer, onAction, onApplyForMortgage }) => {
  console.log("this is offer lsit array :",  offer)
  const mortgageStatus = offer.loanApplications?.[0]?.status ?? null; 
  const canApplyForMortgage = ['pending', 'accepted', 'counter_offer'].includes(offer.status) && !offer.loanApplications?.[0]?.status;
  // const canApplyForMortgage = (offer) => offer.status === 'accepted' && !offer.loanApplications?.[0]?.status;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
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
                  {offer.property?.title}
                </h3>

                {/* Property Address */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{offer.property?.address}</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{offer.property?.bedrooms} beds</span>
                  <span>{offer.property?.bathrooms} baths</span>
                  <span>{offer.property?.sq_ft?.toLocaleString()} sqft</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge className={getOfferStatusColor(offer.status)}>
                  {getOfferStatusText(offer.status)}
                </Badge>
                <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Offer Terms */}
            <OfferTerms offer={offer} />

            {/* Seller Response (if any) */}
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

            {/* Buyer Actions */}
            <div className="flex flex-wrap gap-3">
              <Link to={`/properties/${offer.property?.id}/view`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Property
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onAction('view', offer)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Offer Details
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onAction('contact', offer)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Agent
              </Button>

              {canApplyForMortgage && (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onApplyForMortgage(offer)}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Apply for Mortgage
                </Button>
              )}

              {/* Mortgage Applied Status Badge */}
              {mortgageStatus && (
                <Badge className="bg-blue-500 text-white">
                  {mortgageStatus === 'approved' ? 'Mortgage Approved' : 'Mortgage Applied'}
                </Badge>
              )}

              {/* Status-specific actions */}
              {offer.status === 'pending' && (
                <>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onAction('cancel', offer)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Offer
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onAction('delete', offer)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Offer
                  </Button>
                </>
              )}

              {offer.status === 'counter_offer' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onAction('accept_counter', offer)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept Counter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAction('reject_counter', offer)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Counter
                  </Button>
                </div>
              )}

              {offer.status === 'expired' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAction('renew', offer)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renew Offer
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onAction('new_offer', offer)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    New Offer
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerOfferCard;