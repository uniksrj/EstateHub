"use client"

import { lazy, Suspense, useState, useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
import { Bath, Bed, CalendarPlus, Handshake, MapPin, MessageCircle, Ruler, Search, SlidersHorizontal } from "lucide-react"
import { propertiesAPI } from "../../services/api"
import ImageCarousel from "@/components/common/ImageCarousel"
import { Paginationlink } from "@/components/common/Pagination"
import { useOffers } from "@/hooks/useOffers"
import { toast } from "sonner"
import { buildPropertyPath, organizationSchema } from "@/utils/seo"
import Seo from "@/components/common/Seo"
import { trackContactSeller, trackInquirySubmit } from "@/utils/analytics"

const ContactSellerDialog = lazy(() => import("@/components/buyer/ContactSellerDialog"))
const ScheduleManager = lazy(() => import("@/components/common/schedule/ScheduleManager"))
const OfferCreationWizard = lazy(() => import("../Dashboard/Buyer/OfferCreationWizard"))

const PropertyList = () => {
  const { type } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    property_type: searchParams.get("property_type") || "all",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    bedrooms: searchParams.get("bedrooms") || "any",
    location: searchParams.get("location") || "",
    page: parseInt(searchParams.get("page")) || 1,
  })
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [lastPage, setLastPage] = useState(1);

  const [showOfferWizard, setShowOfferWizard] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [openSelect, setOpenSelect] = useState(null);
  const { addNewOffer } = useOffers();
  const totalProperties = properties.total || 0;

  useEffect(() => {
    fetchProperties()
  }, [searchParams, type])

  useEffect(() => {
    if (!openSelect) return

    const htmlOverflowY = document.documentElement.style.overflowY
    const bodyOverflowY = document.body.style.overflowY
    const bodyPaddingRight = document.body.style.paddingRight

    const keepPageScrollbarVisible = () => {
      document.documentElement.style.overflowY = "scroll"
      document.body.style.overflowY = "scroll"
      document.body.style.paddingRight = "0px"
    }
    const frame = window.requestAnimationFrame(keepPageScrollbarVisible)

    keepPageScrollbarVisible()

    return () => {
      window.cancelAnimationFrame(frame)
      document.documentElement.style.overflowY = htmlOverflowY
      document.body.style.overflowY = bodyOverflowY
      document.body.style.paddingRight = bodyPaddingRight
    }
  }, [openSelect])

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setCurrentPage(page);
    setSearchParams(params);
  }
  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = Object.fromEntries(searchParams)
      const response = await propertiesAPI.getPropertyByType(params)
      console.log(response.data);
      setLastPage(response.data.last_page);
      setProperties(response.data)
    } catch (error) {
      console.error("Error fetching properties:", error)
      setProperties({ data: [], total: 0 })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Update URL params
    const newParams = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== "all" && v !== "any") newParams.set(k, v)
    })
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      property_type: "all",
      min_price: "",
      max_price: "",
      bedrooms: "any",
      location: "",
    })
    setSearchParams({})
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleContactSeller = (property) => {
    setSelectedProperty(property)
    setShowContactDialog(true)
    trackContactSeller(property)
  }

  const contactSellerTrigger = (property) => (
    <Button variant="outline" size="sm" title="Contact Seller" onClick={() => handleContactSeller(property)}>
      <MessageCircle className="h-4 w-4" />
    </Button>
  );

  const handleScheduleTour = (property) => {
    setSelectedProperty(property)
    setShowScheduleModal(true)
  }

  const handleNewOfferSubmit = (property, offerData) => {
    addNewOffer(property, offerData);
    setShowOfferWizard(false);
  };


  const handleMakeOffer = (property) => {
    setSelectedProperty(property);
    setShowOfferWizard(true);
  };

  const handleNewSchedule = (schedule) => {
    toast.success(`Tour scheduled on ${schedule.date} at ${schedule.time}!`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={type ? `${type.replace(/-/g, " ")} Properties` : "Properties"}
        description="Browse homes, apartments, condos, townhouses, and commercial properties on EstateHub India."
        canonicalPath={`/properties${type ? `/${type}` : ""}${currentPage > 1 ? `?page=${currentPage}` : ""}`}
        schema={organizationSchema}
      />
      <div className="border-b border-border bg-[#2563eb]">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl text-white">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em]">EstateHub India</p>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {type ? `${type.replace(/-/g, " ")} properties` : "Properties"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 md:text-base">
                Compare listings by price, location, bedrooms, and property type.
              </p>
            </div>
            {/* <div className="rounded-lg border bg-background px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Available listings</p>
              <p className="mt-1 text-2xl font-semibold">{totalProperties}</p>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        {/* Filters */}
        <Card className="mb-6 rounded-lg border-border shadow-sm">
          <CardContent className="p-4 md:p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Filter listings</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="h-10 rounded-md pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Property Type</label>
                <Select
                  value={filters.property_type}
                  onValueChange={(value) => handleFilterChange("property_type", value)}
                  onOpenChange={(open) => setOpenSelect(open ? "property_type" : null)}
                >
                  <SelectTrigger className="h-10 w-full rounded-md">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Bedrooms</label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) => handleFilterChange("bedrooms", value)}
                  onOpenChange={(open) => setOpenSelect(open ? "bedrooms" : null)}
                >
                  <SelectTrigger className="h-10 w-full rounded-md">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Location</label>
                <Input
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="h-10 rounded-md"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Min Price</label>
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters.min_price}
                  onChange={(e) => handleFilterChange("min_price", e.target.value)}
                  className="h-10 rounded-md"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Max Price</label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.max_price}
                  onChange={(e) => handleFilterChange("max_price", e.target.value)}
                  className="h-10 rounded-md"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{totalProperties}</span> properties found
              </div>
              <Button variant="outline" className="h-9 rounded-md px-4 text-sm font-medium" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>

        </Card>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden rounded-lg border-border animate-pulse">
                <div className="aspect-[4/3] bg-muted"></div>
                <CardContent className="p-5">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-3 w-2/3"></div>
                  <div className="h-3 bg-muted rounded mb-4 w-1/2"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-muted rounded w-1/3"></div>
                    <div className="h-8 bg-muted rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.total > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.data.map((property) => (
              <Card
                key={property.id}
                className={`group overflow-hidden rounded-lg bg-card transition-shadow duration-200 ${
                  property.is_boost_active
                    ? "border-gold/70 shadow-md shadow-gold/10 hover:shadow-lg"
                    : "border-border shadow-sm hover:shadow-md"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {
                    property.images ? (
                      <ImageCarousel image={property.images} altBase={property.title} className="h-full rounded-none" transformation="f_auto,q_auto,c_fill,w_760,h_570" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                      </div>
                    )
                  }
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium capitalize text-foreground shadow-sm">{property.type || property.property_type || "Property"}</Badge>
                    {property.is_boost_active && (
                      <Badge className="rounded-md bg-gold px-2.5 py-1 text-xs font-medium text-accent-foreground shadow-sm">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                        {property.property_code || property.status || "Listing"}
                      </p>
                      {property.status && (
                        <Badge variant="outline" className="rounded-md text-xs capitalize">
                          {property.status.replace(/_/g, " ")}
                        </Badge>
                      )}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-semibold leading-snug">{property.title}</h3>
                  </div>
                  <div className="mb-4 flex items-start text-muted-foreground">
                    <MapPin className="mr-1.5 mt-0.5 h-4 w-4 shrink-0" />
                    <span className="line-clamp-2 text-sm">{property.address + ', ' + property.city + ', ' + property.state + ' (' + property.zip_code + ')'}</span>
                  </div>
                  <div className="mb-5 grid grid-cols-3 divide-x rounded-md border text-xs text-muted-foreground">
                    <span className="flex items-center justify-center gap-1.5 px-3 py-2.5 font-medium"><Bed className="h-4 w-4" />{property.bedrooms}</span>
                    <span className="flex items-center justify-center gap-1.5 px-3 py-2.5 font-medium"><Bath className="h-4 w-4" />{property.bathrooms}</span>
                    <span className="flex items-center justify-center gap-1.5 px-3 py-2.5 font-medium"><Ruler className="h-4 w-4" />{property.sq_ft?.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xl font-semibold text-foreground">{formatPrice(property.price)}</span>
                    <Link to={buildPropertyPath(property)}>
                      <Button size="sm" className="h-9 rounded-md px-4 text-sm font-medium">View Details</Button>
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex w-full items-center gap-2">
                      {contactSellerTrigger(property)}

                      <Button variant="outline" size="sm" onClick={() => handleScheduleTour(property)} title="Schedule a Tour">
                        <CalendarPlus className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleMakeOffer(property)} title="Make Offer">
                        <Handshake className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="col-span-full flex justify-center mt-4">
              <Paginationlink currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card py-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No properties found</h3>
            <p className="mb-4 text-sm text-muted-foreground md:text-base">
              Try adjusting your search criteria or clear filters to see more results.
            </p>
            <Button className="rounded-md px-5 text-sm font-medium" onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
        <Suspense fallback={null}>
          {showContactDialog && selectedProperty && (
            <ContactSellerDialog
              property={selectedProperty}
              isOpen={showContactDialog}
              onInquirySubmitted={() => trackInquirySubmit(selectedProperty)}
              onClose={() => {
                setShowContactDialog(false)
                setSelectedProperty(null)
              }}
            />
          )}
          {showScheduleModal && selectedProperty && (
            <ScheduleManager
              mode="modal"
              isOpen={showScheduleModal}
              onClose={() => {
                setShowScheduleModal(false)
                setSelectedProperty(null)
              }}
              property={selectedProperty}
              onScheduleCreated={handleNewSchedule}
            />
          )}
          {showOfferWizard && selectedProperty && (
            <OfferCreationWizard
              property={selectedProperty}
              onClose={() => {
                setShowOfferWizard(false)
                setSelectedProperty(null)
              }}
              onOfferSubmit={handleNewOfferSubmit}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default PropertyList
