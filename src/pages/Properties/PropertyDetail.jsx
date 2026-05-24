"use client"

import { useRef, useState, useEffect } from "react"
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
} from "lucide-react"
import { propertiesAPI, userAPI } from "../../services/api"
import InquiryForm from "@/components/common/InquiryForm"
import ImageCarousel from "@/components/common/ImageCarousel"
import AmenityIcons from "@/components/common/AmenityIcons"
import { useAuth } from "@/hooks/useAuth"
import Seo from "@/components/common/Seo"
import { absoluteUrl, buildPropertyPath, propertyImageUrl, propertyLocation, truncateMeta } from "@/utils/seo"
import {
  trackContactSeller,
  trackFavoriteProperty,
  trackInquirySubmit,
  trackPropertyView,
} from "@/utils/analytics"

const PropertyDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(null);
  const trackedPropertyIdRef = useRef(null)

  useEffect(() => {
    fetchProperty()
  }, [id])

  useEffect(() => {
    checkFavoriteStatus()
  }, [id, user])

  useEffect(() => {
    if (!property?.id || trackedPropertyIdRef.current === property.id) return

    trackedPropertyIdRef.current = property.id
    trackPropertyView(property)
  }, [property])

  const savePropertyView = async (propertyId, source = 'direct') => {
    try {
      await propertiesAPI.saveViewById(propertyId, { view_source: source })
    } catch (error) {
      console.error('Error tracking view:', error)
    }
  }
  const fetchProperty = async () => {
    setLoading(true)
    try {
      const response = await propertiesAPI.getById(id)
      response.data.location = `${response.data.address}, ${response.data.city}, ${response.data.state} (${response.data.zip_code})`;
      setProperty(response.data)
      savePropertyView(id)
    } catch (error) {
      console.error("Error fetching property:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const propertySchema = property ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: truncateMeta(property.description, 300),
    image: propertyImageUrl(property),
    url: absoluteUrl(buildPropertyPath(property)),
    category: property.property_type,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: property.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: absoluteUrl(buildPropertyPath(property)),
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Property type", value: property.property_type },
      { "@type": "PropertyValue", name: "Bedrooms", value: property.bedrooms },
      { "@type": "PropertyValue", name: "Bathrooms", value: property.bathrooms },
      { "@type": "PropertyValue", name: "Floor size", value: `${property.sq_ft || 0} sq ft` },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip_code,
      addressCountry: property.country || "IN",
    },
  } : null

  const breadcrumbSchema = property ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Properties", item: absoluteUrl("/properties") },
      { "@type": "ListItem", position: 3, name: property.title, item: absoluteUrl(buildPropertyPath(property)) },
    ],
  } : null

  const toggleFavorite = async () => {
    if (!user) {
      setIsFavorite(false);
      return;
    }

    try {
      const response = await userAPI.toggleFavorite({ property_id: id })
      setIsFavorite(response.data.is_favorite);
      if (response.data.is_favorite) {
        trackFavoriteProperty(property)
      }
    } catch (error) {
      console.error("Error updating favorite:", error)
      setIsFavorite(false);
    }
  }

  const checkFavoriteStatus = async () => {
    if (!user) {
      setIsFavorite(false);
      return;
    }

    try {
      const response = await userAPI.checkFavorite(id)
      setIsFavorite(response.data.is_favorite);
    } catch (error) {
      console.error("Error checking favorite:", error)
      setIsFavorite(false);
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
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
          <h1 className="mb-4 text-[24px] font-semibold">Property Not Found</h1>
          <p className="mb-8 text-[14px] text-muted-foreground md:text-[15px]">
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
    <div className="min-h-screen bg-background">
      <Seo
        title={`${property.title} in ${property.city}`}
        description={`${formatPrice(property.price)} ${property.property_type} in ${propertyLocation(property)}. ${property.bedrooms} beds, ${property.bathrooms} baths. ${property.description}`}
        canonicalPath={buildPropertyPath(property)}
        image={propertyImageUrl(property)}
        type="product"
        schema={[propertySchema, breadcrumbSchema]}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/properties" className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-[14px] font-medium text-muted-foreground shadow-sm transition hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Link>

        {/* Property Images */}
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-2xl shadow-primary/10">
          <ImageCarousel
            image={property.images}
            altBase={property.title}
            className="h-[56vh] max-h-[720px] min-h-[320px] rounded-[1.5rem] bg-muted"
            transformation="f_auto,q_auto,c_fill,w_1600,h_900"
            fit="cover"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 capitalize">
                      {property.property_type}
                    </Badge>
                    <div className="flex items-center rounded-full bg-muted px-3 py-1">
                      <Star className="h-4 w-4 text-gold fill-current mr-1" />
                      <span className="text-[12px] font-medium">4.8 (24 reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-[24px] font-semibold tracking-tight md:text-[28px]">{property.title}</h1>
                  <div className="mt-4 flex items-start text-muted-foreground">
                    <MapPin className="mr-2 mt-1 h-5 w-5 shrink-0" />
                    <span className="text-[14px] leading-6 md:text-[15px]">{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={toggleFavorite} disabled={isFavorite === null}>
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-[20px] font-bold text-foreground md:text-[24px]">{formatPrice(property.price)}</div>
            </div>

            {/* Property Stats */}
            <Card className="rounded-[2rem] border-border shadow-sm">
              <CardContent className="p-5 md:p-6">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="flex items-center gap-3 rounded-3xl bg-muted/60 p-4">
                    <Bed className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="text-[18px] font-semibold">{property.bedrooms}</div>
                      <div className="text-[12px] text-muted-foreground">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-3xl bg-muted/60 p-4">
                    <Bath className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="text-[18px] font-semibold">{property.bathrooms}</div>
                      <div className="text-[12px] text-muted-foreground">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-3xl bg-muted/60 p-4">
                    <Square className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="text-[18px] font-semibold">{property.sq_ft?.toLocaleString()}</div>
                      <div className="text-[12px] text-muted-foreground">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-3xl bg-muted/60 p-4">
                    <Calendar className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="text-[18px] font-semibold">{property.year_built}</div>
                      <div className="text-[12px] text-muted-foreground">Year Built</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-[20px] font-semibold tracking-tight md:text-[22px]">Description</h2>
              <p className="text-[14px] leading-7 text-muted-foreground md:text-[15px]">{property.description}</p>
            </div>

            {/* Features */}

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-5 text-[20px] font-semibold tracking-tight md:text-[22px]">Features</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {property?.features && property.features.trim() !== '' ? (
                  JSON.parse(property.features).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
                      <div className="h-2 w-2 rounded-full bg-foreground"></div>
                      <span className="text-[14px] font-medium md:text-[15px]">{feature.replace(/\[\]/g, "")}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[14px] text-muted-foreground">No features listed.</p>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-5 text-[20px] font-semibold tracking-tight md:text-[22px]">Amenities</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <AmenityIcons property={property} />
              </div>
            </div>
          </div>
          {(user?.role_id !== 6 || user?.role_id !== 3) && (
            <div className="space-y-6">
              <Card className="sticky top-24 rounded-[2rem] border-border shadow-xl shadow-primary/10">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-[18px] font-semibold md:text-[20px]">Contact Agent</h3>

                  {/* Agent Info */}
                  <div className="mb-6 flex items-center gap-3 rounded-3xl bg-muted/60 p-4">
                    <img
                      src={property.agent?.avatar || "/placeholder.svg?height=60&width=60&query=professional realtor"}
                      alt={property.agent?.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-[16px] font-semibold">{property.agent?.name}</div>
                      <div className="text-[12px] text-muted-foreground">Licensed Agent</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full rounded-full font-bold" onClick={() => trackContactSeller(property)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call {property.agent?.phone}
                    </Button>
                    <Button variant="outline" className="w-full rounded-full bg-transparent font-bold" onClick={() => trackContactSeller(property)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <InquiryForm
                      property={property}
                      propertyId={property.id}
                      propertyTitle={property.title}
                      onSubmitted={() => trackInquirySubmit(property)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        {/* <div className="mt-12">
          <InquiryForm propertyId={property.id} propertyTitle={property.title}/>
        </div>         */}
      </div>
    </div>
  )
}

export default PropertyDetail
