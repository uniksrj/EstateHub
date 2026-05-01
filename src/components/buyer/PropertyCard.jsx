// import { getStatusColor, getStatusText } from "@/utils/userHelpers"
import { memo } from "react"
import { useMemo, useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Link } from "react-router"
import { Badge, Bath, Bed, Calendar, CalendarPlus, Eye, Handshake, Heart, MapPin, MessageCircle, Square } from "lucide-react"
import { Button } from "../ui/button"
import { userAPI } from "@/services/api"
import ContactSellerDialog from "./ContactSellerDialog"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import ScheduleManager from "../common/schedule/ScheduleManager"
import { useOffers } from "@/hooks/useOffers"
import OfferCreationWizard from "@/pages/Dashboard/Buyer/OfferCreationWizard"
import { buildPropertyPath, getImageUrl } from "@/utils/seo"


export const PropertyCard = memo(function PropertyCard({
    property,
    formatPrice,
    handleFavoriteChange
}) {
    const { user } = useAuth()
    const { addNewOffer } = useOffers();
    const [isSaved, setIsSaved] = useState(
        property.favorites?.[0]?.user_id === user.id
    )
    
    const [showOfferWizard, setShowOfferWizard] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    
    const contactSellerTrigger = useMemo(() => (
        <Button variant="outline" size="sm" title="Contact Seller" onClick={() => setShowContactDialog(true)}>
            <MessageCircle className="h-4 w-4" />
        </Button>
    ), []);

    const scheduleTourTrigger = useMemo(() => (
        <Button variant="outline" size="sm" onClick={() => setShowScheduleModal(true)} title="Schedule a Tour">
            <CalendarPlus className="h-4 w-4" />
        </Button>
    ), []);

    const makeOfferTrigger = useMemo(() => (
        <Button variant="outline" size="sm" onClick={() => handleMakeOffer(property)} title="Make Offer">
            <Handshake className="w-4 h-4" />
        </Button>
    ), [property]);

    const handleNewSchedule = (schedule) => {
        toast.success(`Tour scheduled on ${schedule.date} at ${schedule.time}!`)
    }
    
    const handleFavoriteProperty = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const optimisticValue = !isSaved
        setIsSaved(optimisticValue)
        handleFavoriteChange?.(property.id, optimisticValue)
        try {
            setIsSaved(prev => !prev)
            let resData = await userAPI.toggleFavorite({ property_id: property.id });
            setIsSaved(resData.data.is_favorite)
            handleFavoriteChange?.(property.id, resData.data.is_favorite)
        } catch (error) {
            console.error(error);
            setIsSaved(prev => !prev)
            toast.error("Failed to change favorite status.");
        }
    }
    

    const handleNewOfferSubmit = (property, offerData) => {
        addNewOffer(property, offerData);
        setShowOfferWizard(false);
    };


    const handleMakeOffer = (property) => {
        setSelectedProperty(property);
        setShowOfferWizard(true);
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={buildPropertyPath(property)}>
                <div className="relative">
                    <img
                        src={getImageUrl(property.images?.[0], "f_auto,q_auto,c_fill,w_480,h_320")}
                        alt={`${property.title} in ${property.city || "Estate Hub"}`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    {/* <div className="absolute top-3 left-3">
                        <Badge className={property.is_featured ? "bg-orange-500" : "bg-blue-500"}>
                            {property.is_featured ? "Featured" : "New"}
                        </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                        <Badge className={getStatusColor(property.status)}>
                            {getStatusText(property.status)}
                        </Badge>
                    </div> */}
                </div>

                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg leading-tight">{property.title}</h3>
                        <span className="font-bold text-xl text-blue-600">
                            {formatPrice(property.price)}
                        </span>
                    </div>

                    <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.city}, {property.state}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {property.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-4 text-sm">
                            <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                <span>{property.bedrooms} bed</span>
                            </div>
                            <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                <span>{property.bathrooms} bath</span>
                            </div>
                            <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1" />
                                <span>{property.sq_ft.toLocaleString()} sq ft</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span>{property.view_count} views</span>
                            <Calendar className="h-4 w-4 ml-2" />
                            <span>{property.days_on_market}d ago</span>
                        </div>
                    </div>
                </CardContent>
            </Link>
            <CardContent>
                <div className="flex space-x-2 mt-4">
                    <div className="flex items-center gap-3">
                        {contactSellerTrigger}
                        {showContactDialog && (
                            <ContactSellerDialog
                                property={property}
                                isOpen={showContactDialog}
                                onClose={() => setShowContactDialog(false)}
                            />
                        )}

                        {scheduleTourTrigger}
                        {showScheduleModal && (
                        <ScheduleManager
                            mode="modal"
                            isOpen={showScheduleModal}
                            onClose={() => setShowScheduleModal(false)}
                            property={property}
                            onScheduleCreated={handleNewSchedule}
                        />
                    )}
                    
                        {makeOfferTrigger}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="border"
                        onClick={handleFavoriteProperty}
                    >
                        <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>

                    {/* Offer Wizard */}
                    {showOfferWizard && selectedProperty && (
                        <OfferCreationWizard
                            property={selectedProperty}
                            onClose={() => {
                                setShowOfferWizard(false);
                                setSelectedProperty(null);
                            }}
                            onOfferSubmit={handleNewOfferSubmit}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
})
