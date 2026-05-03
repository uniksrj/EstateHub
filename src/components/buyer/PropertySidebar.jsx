import { formatPrice } from "@/utils/userHelpers"
import { Badge, Bath, Bed, Clock, Mail, MapPin, Phone, Square } from "lucide-react"

export const PropertySidebar = ({ propertyData }) => {
    console.log("this is sidebar details", propertyData)
    return (
        <>
            {/* Property & Agent Info Sidebar */}
            <div className="lg:w-96 flex-shrink-0 overflow-y-auto bg-muted/30 border-l p-8">
                <div className="space-y-8">
                    {/* Property Summary */}
                    <div className="bg-card rounded-xl border shadow-sm p-6">
                        <h3 className="font-bold text-xl mb-6 text-card-foreground border-b pb-3">
                            Property Details
                        </h3>

                        <div className="aspect-video rounded-lg overflow-hidden mb-4 shadow-md">
                            <img
                                src={propertyData?.images[0]?.thumbnail_url}
                                alt={propertyData?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="mb-4">
                            <h4 className="font-semibold text-lg mb-3 text-card-foreground leading-tight">
                                {propertyData?.title}
                            </h4>
                            <div className="flex items-center text-muted-foreground mb-3">
                                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="text-base">{propertyData?.city}, {propertyData?.state}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                                {formatPrice(propertyData?.price)}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                                <Bed className="h-5 w-5 mb-2 text-primary" />
                                <span className="font-medium">{propertyData?.bedrooms} bed</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                                <Bath className="h-5 w-5 mb-2 text-primary" />
                                <span className="font-medium">{propertyData?.bathrooms} bath</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                                <Square className="h-5 w-5 mb-2 text-primary" />
                                <span className="font-medium text-center">{propertyData?.sq_ft.toLocaleString()} sq ft</span>
                            </div>
                        </div>

                        <Badge variant="secondary" className="w-full justify-center py-3 text-base">
                            {propertyData?.property_type}
                        </Badge>
                    </div>

                    {/* Agent Information */}
                    <div className="bg-card rounded-xl border shadow-sm p-6">
                        <h3 className="font-bold text-m mb-6 text-card-foreground border-b pb-3">
                            Listing Agent
                        </h3>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                                <img
                                    src={propertyData?.agent?.avatar}
                                    alt={propertyData?.agent?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-lg truncate">{propertyData?.agent?.name}</h4>
                                <p className="text-muted-foreground truncate">{propertyData?.agent?.company}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-base mb-6">
                            <div className="flex items-center p-3 bg-muted rounded-lg">
                                <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                                <span className="truncate">{propertyData?.agent?.email}</span>
                            </div>
                            <div className="flex items-center p-3 bg-muted rounded-lg">
                                <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                                <span className="truncate">{propertyData?.agent?.phone}</span>
                            </div>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 text-primary font-semibold">
                                <Clock className="h-5 w-5" />
                                <span>Quick Response</span>
                            </div>
                            <p className="text-primary/80 text-sm mt-1">
                                Usually responds within 2 hours during business hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}