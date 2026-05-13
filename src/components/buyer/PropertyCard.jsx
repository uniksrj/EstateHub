// import { getStatusColor, getStatusText } from "@/utils/userHelpers"
import { lazy, memo, Suspense } from "react"
import { useMemo, useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Link } from "react-router"
import { Bath, Bed, Calendar, CalendarPlus, Eye, Handshake, Heart, MapPin, MessageCircle, Square } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { userAPI } from "@/services/api"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { useOffers } from "@/hooks/useOffers"
import { buildPropertyPath, getImageUrl } from "@/utils/seo"

const ContactSellerDialog = lazy(() => import("./ContactSellerDialog"))
const ScheduleManager = lazy(() => import("../common/schedule/ScheduleManager"))
const OfferCreationWizard = lazy(() => import("@/pages/Dashboard/Buyer/OfferCreationWizard"))

export const PropertyCard = memo(function PropertyCard({    
    property,
    formatPrice,
    handleFavoriteChange
}) {
    const { user } = useAuth()
    const { addNewOffer } = useOffers();
    const [isSaved, setIsSaved] = useState(
        property.favorites?.[0]?.user_id === user?.id
    )
    
    const [showOfferWizard, setShowOfferWizard] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    
    const contactSellerTrigger = useMemo(() => (
        <Button variant="outline" size="sm" title="Contact Seller" className="rounded-full" onClick={() => setShowContactDialog(true)}>
            <MessageCircle className="h-4 w-4" />
        </Button>
    ), []);

    const scheduleTourTrigger = useMemo(() => (
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => setShowScheduleModal(true)} title="Schedule a Tour">
            <CalendarPlus className="h-4 w-4" />
        </Button>
    ), []);

    const makeOfferTrigger = useMemo(() => (
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleMakeOffer(property)} title="Make Offer">
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
        <Card
            className={`group overflow-hidden rounded-[1.75rem] bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                property?.is_boost_active
                    ? "border-gold/70 shadow-lg shadow-gold/10 hover:shadow-gold/20"
                    : "border-border shadow-sm hover:shadow-primary/10"
            }`}
        >
            <Link to={buildPropertyPath(property)}>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                        src={getImageUrl(property.images?.[0], "f_auto,q_auto,c_fill,w_480,h_320")}
                        alt={`${property.title} in ${property.city || "Estate Hub"}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        <Badge className="rounded-full border border-border bg-card px-3 py-1 text-[12px] font-semibold text-foreground shadow-lg">
                            {property.property_type || property.type || "Property"}
                        </Badge>
                        {property?.is_boost_active && (
                            <Badge className="rounded-full bg-gold px-3 py-1 text-[12px] font-semibold text-accent-foreground shadow-lg">
                                Featured
                            </Badge>
                        )}
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1 text-[12px] font-medium text-foreground backdrop-blur-md">
                        {property.view_count || 0} views
                    </div>
                </div>

                <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-[18px] font-semibold leading-snug md:text-[20px]">{property.title}</h3>
                        <span className="shrink-0 text-[20px] font-bold text-foreground md:text-[24px]">
                            {formatPrice(property.price)}
                        </span>
                    </div>

                    <div className="mb-4 flex items-center text-muted-foreground">
                        <MapPin className="mr-1.5 h-4 w-4 shrink-0" />
                        <span className="text-[14px]">{property.city}, {property.state}</span>
                    </div>

                    <p className="mb-5 line-clamp-2 text-[14px] leading-6 text-muted-foreground md:text-[15px]">
                        {property.description}
                    </p>

                    <div className="mb-5 grid grid-cols-3 gap-2 text-[12px] md:text-[13px]">
                            <div className="flex items-center justify-center rounded-2xl bg-muted/70 px-3 py-2 font-semibold">
                                <Bed className="mr-1.5 h-4 w-4" />
                                <span>{property.bedrooms} bed</span>
                            </div>
                            <div className="flex items-center justify-center rounded-2xl bg-muted/70 px-3 py-2 font-semibold">
                                <Bath className="mr-1.5 h-4 w-4" />
                                <span>{property.bathrooms} bath</span>
                            </div>
                            <div className="flex items-center justify-center rounded-2xl bg-muted/70 px-3 py-2 font-semibold">
                                <Square className="mr-1.5 h-4 w-4" />
                                <span>{property.sq_ft?.toLocaleString()} sq ft</span>
                            </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[12px] text-muted-foreground md:text-[13px]">
                            <Eye className="h-4 w-4" />
                            <span>{property.view_count} views</span>
                            <Calendar className="ml-2 h-4 w-4" />
                            <span>{property.days_on_market}d ago</span>
                        </div>
                        <span className="text-[13px] font-semibold text-foreground">View Details</span>
                    </div>
                </CardContent>
            </Link>
            <CardContent className="border-t border-border p-5 pt-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {contactSellerTrigger}
                        {showContactDialog && (
                            <Suspense fallback={null}>
                                <ContactSellerDialog
                                    id={property.id}
                                    property={property}
                                    isOpen={showContactDialog}
                                    onClose={() => setShowContactDialog(false)}
                                />
                            </Suspense>
                        )}

                        {scheduleTourTrigger}
                        {showScheduleModal && (
                            <Suspense fallback={null}>
                                <ScheduleManager
                                    mode="modal"
                                    isOpen={showScheduleModal}
                                    onClose={() => setShowScheduleModal(false)}
                                    property={property}
                                    onScheduleCreated={handleNewSchedule}
                                />
                            </Suspense>
                        )}
                    
                        {makeOfferTrigger}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full border"
                        onClick={handleFavoriteProperty}
                        title={isSaved ? "Remove from favorites" : "Save property"}
                    >
                        <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>

                    {/* Offer Wizard */}
                    {showOfferWizard && selectedProperty && (
                        <Suspense fallback={null}>
                            <OfferCreationWizard
                                property={selectedProperty}
                                onClose={() => {
                                    setShowOfferWizard(false);
                                    setSelectedProperty(null);
                                }}
                                onOfferSubmit={handleNewOfferSubmit}
                            />
                        </Suspense>
                    )}
                </div>
            </CardContent>
        </Card>
    );
})
