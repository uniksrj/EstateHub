import {  useState } from "react"
import LoanApplicationModal from "@/pages/Dashboard/Buyer/Loan/LoanApplicationModal"
import BuyerOfferCard from "./BuyerOfferCard"

export const BuyerOffersList = ({ offers, onAction, emptyState, user }) => {
  const [showLoanApplication, setShowLoanApplication] = useState(false)
  const [selectedOfferForMortgage, setSelectedOfferForMortgage] = useState(null)  
  // const [selectedLoan, setSelectedLoan] = useState(null);
  const handleApplyForMortgage = (offer) => {
    setSelectedOfferForMortgage(offer)
    setShowLoanApplication(true)
  }
  const handleLoanApplicationClose = () => {
    setShowLoanApplication(false)
    setSelectedOfferForMortgage(null)
  }
  if (offers.length === 0) {
    return emptyState;
  }

  return (
    <>
      <div className="space-y-4">
        {offers.map(offer => (
          <BuyerOfferCard
            offer={offer}
            onAction={onAction}
            onApplyForMortgage={handleApplyForMortgage}
            key={offer.id}
          />
        ))}
      </div>
      
      {showLoanApplication && selectedOfferForMortgage && (
        <LoanApplicationModal
          isOpen={showLoanApplication}
          onClose={handleLoanApplicationClose}
          propertyDetails={{
            id: selectedOfferForMortgage.property?.id,
            title: selectedOfferForMortgage.property?.title,
            address: selectedOfferForMortgage.property?.address,
            city: selectedOfferForMortgage.property?.city,
            state: selectedOfferForMortgage.property?.state,
            zip: selectedOfferForMortgage.property?.zip_code,
            price: selectedOfferForMortgage.final_price ||
              selectedOfferForMortgage.counter_price ||
              selectedOfferForMortgage.offer_amount ||
              selectedOfferForMortgage.offerAmount,
            bedrooms: selectedOfferForMortgage.property?.bedrooms,
            bathrooms: selectedOfferForMortgage.property?.bathrooms,
            square_feet: selectedOfferForMortgage.property?.sq_ft,
            image: selectedOfferForMortgage.property?.image ||
              selectedOfferForMortgage.property?.images?.[0],
            property_type: selectedOfferForMortgage.property?.property_type
          }}
          offerDetails={{
            id: selectedOfferForMortgage.id,
            accepted_date: selectedOfferForMortgage.accepted_at,
            final_price: selectedOfferForMortgage.final_price ||
              selectedOfferForMortgage.counterOffer ||
              selectedOfferForMortgage.offerAmount,
            status: selectedOfferForMortgage.status,
            offer_amount: selectedOfferForMortgage.offer_amount,
            counter_offer: selectedOfferForMortgage.counter_offer,
            has_mortgage_application: selectedOfferForMortgage.hasMortgageApplication
          }}
          userDetails={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            id: user?.id
          }}
          // loanDetails={selectedLoan}
          // initialLoanDetails={selectedOfferForMortgage?.loanDetails || null}
        />
      )}
    </>
  );
}
