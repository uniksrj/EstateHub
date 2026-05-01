"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react"
import { propertiesAPI } from "../../services/api"
import ImageCarousel from "@/components/common/ImageCarousel"
import { Paginationlink } from "@/components/common/Pagination"
import Seo from "@/components/common/Seo"
import { buildPropertyPath, organizationSchema } from "@/utils/seo"

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

  useEffect(() => {
    fetchProperties()
  }, [searchParams, type])

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
      const response = type
        ? await propertiesAPI.getByType(type, params)
        : await propertiesAPI.getAll(params)
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
      if (v) newParams.set(k, v)
    })
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      property_type: "",
      min_price: "",
      max_price: "",
      bedrooms: "",
      location: "",
    })
    setSearchParams({})
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }
  console.log("state save data", properties);

  return (
    <div className="min-h-screen py-8">
      <Seo
        title={type ? `${type.replace(/-/g, " ")} Properties` : "Properties"}
        description="Browse homes, apartments, condos, townhouses, and commercial properties on Estate Hub."
        canonicalPath={`/properties${type ? `/${type}` : ""}${currentPage > 1 ? `?page=${currentPage}` : ""}`}
        schema={organizationSchema}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Properties</h1>
          <p className="text-muted-foreground">Discover your perfect home from our extensive collection</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Property Type</label>
                <Select value={filters.property_type} onValueChange={(value) => handleFilterChange("property_type", value)}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Min Price</label>
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters.min_price}
                  onChange={(e) => handleFilterChange("min_price", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Price</label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.max_price}
                  onChange={(e) => handleFilterChange("max_price", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">{properties.total} properties found</span>
              </div>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-6">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.data.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  {
                    property.images ? (
                      <ImageCarousel image={property.images} altBase={property.title} transformation="f_auto,q_auto,c_fill,w_640,h_360" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                      </div>
                    )
                  }
                  <Badge className="absolute top-3 left-3 capitalize">{property.type}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{property.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground ml-1">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address + ', ' + property.city + ', ' + property.state + ' (' + property.zip_code + ')'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.sq_ft?.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">{formatPrice(property.price)}</span>
                    <Link to={buildPropertyPath(property)}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="col-span-full flex justify-center mt-4">
              <Paginationlink currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or clear filters to see more results.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyList
