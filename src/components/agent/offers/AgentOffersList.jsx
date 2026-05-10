// components/agent/AgentOffersList.jsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Phone, Home, MapPin, MoreVertical } from "lucide-react"
import { getOfferStatusColor, getOfferStatusText } from "@/utils/userHelpers"
import { OfferTerms } from "@/components/buyer/offer/OfferTerms"
import { Link } from "react-router"

export const AgentOffersList = ({ offers, onAction, emptyState }) => {
  if (offers.length === 0) {
    return emptyState;
  }

  return (
    <div className="space-y-4">
      {offers.map(offer => (
        <AgentOfferCard
          key={offer.id}
          offer={offer}
          onAction={onAction}
        />
      ))}
    </div>
  );
}

const AgentOfferCard = ({ offer, onAction }) => {
  console.log("This is offer details :", offer)
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate sm:whitespace-normal sm:break-words">{offer.property?.address}</span>
                </div>

                {/* Buyer Information */}
                <div className="flex flex-wrap items-center gap-3 text-sm mt-2">
                  <span className="font-medium text-foreground">Buyer Info:</span>

                  <div className="flex items-center gap-1 text-muted-foreground min-w-0">
                    <User className="w-4 h-4" />
                    <span className="break-words">{offer.buyer_info?.name}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground min-w-0">
                    <Phone className="w-4 h-4" />
                    <span className="break-words">{offer.buyer_info?.phone || 'No phone provided'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge className={getOfferStatusColor(offer.status, 'agent')}>
                  {getOfferStatusText(offer.status, 'agent')}
                </Badge>
                <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Offer Terms */}
            <OfferTerms offer={offer} />

            {/* Agent Actions */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Link className="w-full sm:w-auto" to={`/properties/${offer.property?.id}/view`}>
                <Button variant="outline" size="sm">
                  View Property
                </Button>
              </Link>

              <Button
                className="w-full sm:w-auto"
                variant="outline"
                size="sm"
                onClick={() => onAction('view', offer)}
              >
                Offer Details
              </Button>

              {offer.status === 'pending' && (
                <>
                  <Button
                    className="w-full sm:w-auto"
                    size="sm"
                    onClick={() => onAction('accept', offer)}
                  >
                    Accept Offer
                  </Button>
                  <Button
                    className="w-full sm:w-auto"
                    variant="outline"
                    size="sm"
                    onClick={() => onAction('counter', offer)}
                  >
                    Make Counter Offer
                  </Button>
                  <Button
                    className="w-full sm:w-auto"
                    variant="destructive"
                    size="sm"
                    onClick={() => onAction('reject', offer)}
                  >
                    Reject Offer
                  </Button>
                </>
              )}

              {offer.status === 'countered' && (
                <div className="text-sm text-muted-foreground">
                  Waiting for buyer response
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
