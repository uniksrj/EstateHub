"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import {
  MapPin,
  Star,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  ArrowLeft,
  Car,
  Wifi,
  Shield,
  Zap,
} from "lucide-react"
import { propertiesAPI } from "../../services/api"
import InquiryForm from "@/components/common/InquiryForm"

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    setLoading(true)
    try {
      const response = await propertiesAPI.getById(id)
      setProperty(response.data)
    } catch (error) {
      console.error("Error fetching property:", error)
      // Fallback to mock data
      setProperty({
        id: Number.parseInt(id),
        title: "Modern Downtown Loft",
        price: 850000,
        location: "Downtown District",
        beds: 2,
        baths: 2,
        sqft: 1200,
        type: "apartment",
        yearBuilt: 2020,
        description:
          "This stunning modern loft offers the perfect blend of luxury and convenience in the heart of downtown. With floor-to-ceiling windows, high-end finishes, and an open-concept design, this property is ideal for urban professionals seeking a sophisticated living experience.",
        features: [
          "Floor-to-ceiling windows",
          "High-end appliances",
          "Hardwood floors",
          "In-unit laundry",
          "Central air conditioning",
          "Balcony with city views",
        ],
        amenities: [
          "24/7 concierge",
          "Fitness center",
          "Rooftop terrace",
          "Parking garage",
          "Pet-friendly",
          "High-speed internet",
        ],
        images: [
          "/modern-loft-living-room.png",
          "/modern-loft-kitchen.png",
          "/modern-loft-bedroom.png",
          "/modern-loft-bathroom.png",
        ],
        agent: {
          name: "Sarah Johnson",
          phone: "(555) 123-4567",
          email: "sarah@estatehub.com",
          image: "/professional-woman-realtor.jpg",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Call API to add/remove from favorites
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-1/4"></div>
            <div className="h-96 bg-muted rounded mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/properties">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/properties" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Link>

        {/* Property Images */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3">
            <img
              src={property.images?.[0] || "/placeholder.svg?height=400&width=600&query=property main image"}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images?.slice(1, 4).map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-28 lg:h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="capitalize">
                      {property.type}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm">4.8 (24 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={toggleFavorite}>
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-3xl font-bold text-accent mb-4">{formatPrice(property.price)}</div>
            </div>

            {/* Property Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{property.beds}</div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{property.baths}</div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{property.sqft?.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{property.yearBuilt}</div>
                      <div className="text-sm text-muted-foreground">Year Built</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {property.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {property.amenities?.map((amenity, index) => {
                  const getIcon = (amenity) => {
                    if (amenity.toLowerCase().includes("parking")) return Car
                    if (amenity.toLowerCase().includes("internet")) return Wifi
                    if (amenity.toLowerCase().includes("security")) return Shield
                    if (amenity.toLowerCase().includes("fitness")) return Zap
                    return Shield
                  }
                  const Icon = getIcon(amenity)

                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-accent" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>

                {/* Agent Info */}
                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={property.agent?.image || "/placeholder.svg?height=60&width=60&query=professional realtor"}
                    alt={property.agent?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{property.agent?.name}</div>
                    <div className="text-sm text-muted-foreground">Licensed Agent</div>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Call {property.agent?.phone}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>

                <Separator className="my-6" />
                <div className="">
                  <InquiryForm propertyId={property.id} propertyTitle={property.title} />
                </div>

                {/* Schedule Tour */}
                {/* <div>
                  <h4 className="font-semibold mb-3">Schedule a Tour</h4>
                  <Button variant="outline" className="w-full mb-2 bg-transparent">
                    Request Showing
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Available 7 days a week</p>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
        {/* <div className="mt-12">
          <InquiryForm propertyId={property.id} propertyTitle={property.title}/>
        </div>         */}
      </div>
    </div>
  )
}

export default PropertyDetail
