import { PropertyCard } from "@/components/buyer/PropertyCard"
import { Paginationlink } from "@/components/common/Pagination"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { demoPropertiesList } from "@/data/demoData"
import { propertiesAPI } from "@/services/api"
import { formatPrice } from "@/utils/userHelpers"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export default function FindProperties() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState(demoPropertiesList)
    const [loading, setLoading] = useState(false)
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
    const [filters, setFilters] = useState({
        search: "",
        propertyType: "all",
        minPrice: 0,
        maxPrice: 2000000,
        bedrooms: "any",
        bathrooms: "any",
        city: "all",
        status: "for_sale"
    })

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true)
            try {
                const params = Object.fromEntries(searchParams)
                const response = await propertiesAPI.getAll(params)
                setLastPage(response.data.last_page)
                setProperties(response.data.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching properties:", error)
                setProperties([])
            } finally {
                setLoading(false)
            }
        }
        fetchProperties()
    }, [searchParams])

    // Filter properties when filters change
    useEffect(() => {
        const filtered = properties.filter(property => {
            // Search filter
            const matchesSearch = !filters.search ||
                property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                property.city.toLowerCase().includes(filters.search.toLowerCase()) ||
                property.description.toLowerCase().includes(filters.search.toLowerCase())

            // Property type filter
            const matchesType = filters.propertyType === "all" || property.property_type === filters.propertyType

            // Price filter
            const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice

            // Bedrooms filter
            const matchesBedrooms = filters.bedrooms === "any" || property.bedrooms >= parseInt(filters.bedrooms)

            // Bathrooms filter
            const matchesBathrooms = filters.bathrooms === "any" || property.bathrooms >= parseInt(filters.bathrooms)

            // City filter
            const matchesCity = filters.city === "all" || property.city === filters.city

            // Status filter
            const matchesStatus = filters.status === "all" || property.status === filters.status

            return matchesSearch && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms && matchesCity && matchesStatus
        })
        setFilteredProperties(filtered)
    }, [filters, properties])

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const resetFilters = () => {
        setFilters({
            search: "",
            propertyType: "all",
            minPrice: 0,
            maxPrice: 2000000,
            bedrooms: "any",
            bathrooms: "any",
            city: "all",
            status: "for_sale"
        })
    }

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setCurrentPage(page);
        setSearchParams(params);
    }

    //   const cities = [...new Set(properties.map(p => p.city))]
    //   const propertyTypes = [...new Set(properties.map(p => p.property_type))]

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
                    <p className="text-xl opacity-90">Discover {properties.length} properties matching your criteria</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">Filters</h2>
                                    <Button variant="outline" size="sm" onClick={resetFilters}>
                                        Reset
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {/* Search */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Search</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search properties..."
                                                value={filters.search}
                                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Property Type */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Property Type</label>
                                        <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Types" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                {/* {propertyTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))} */}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Price Range: {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
                                        </label>
                                        <Slider
                                            value={[filters.minPrice, filters.maxPrice]}
                                            min={0}
                                            max={2000000}
                                            step={50000}
                                            onValueChange={(value) => {
                                                handleFilterChange('minPrice', value[0])
                                                handleFilterChange('maxPrice', value[1])
                                            }}
                                            className="my-4"
                                        />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{formatPrice(0)}</span>
                                            <span>{formatPrice(2000000)}</span>
                                        </div>
                                    </div>

                                    {/* Bedrooms */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                                        <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Any" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">Any</SelectItem>
                                                <SelectItem value="1">1+</SelectItem>
                                                <SelectItem value="2">2+</SelectItem>
                                                <SelectItem value="3">3+</SelectItem>
                                                <SelectItem value="4">4+</SelectItem>
                                                <SelectItem value="5">5+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Bathrooms */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Bathrooms</label>
                                        <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange('bathrooms', value)}>
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

                                    {/* City */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">City</label>
                                        <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Cities" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Cities</SelectItem>
                                                {/* {cities.map(city => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))} */}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Status</label>
                                        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="For Sale" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="for_sale">For Sale</SelectItem>
                                                <SelectItem value="under_contract">Under Contract</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Properties Grid */}
                    <div className="lg:w-3/4">
                        {/* Results Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {filteredProperties.length} Properties Found
                                </h2>
                                <p className="text-muted-foreground">
                                    {filters.search && `Search: "${filters.search}"`}
                                    {filters.propertyType !== 'all' && ` • ${filters.propertyType}`}
                                    {filters.city !== 'all' && ` • ${filters.city}`}
                                </p>
                            </div>
                            <Select defaultValue="newest">
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <Card key={i} className="animate-pulse">
                                        <CardContent className="p-0">
                                            <div className="h-48 bg-muted"></div>
                                            <div className="p-4 space-y-3">
                                                <div className="h-4 bg-muted rounded w-3/4"></div>
                                                <div className="h-4 bg-muted rounded w-1/2"></div>
                                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Properties Grid */}
                        {!loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProperties.map(property => (
                                    <PropertyCard key={property.id} property={property} formatPrice={formatPrice} />
                                ))}
                            </div>
                        )}
                        <div className="col-span-full flex justify-center mt-4">
                            <Paginationlink currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
                        </div>
                        {/* Empty State */}
                        {/* {!loading && filteredProperties.length === 0 && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Try adjusting your filters or search criteria
                                    </p>
                                    <Button onClick={resetFilters}>
                                        Reset Filters
                                    </Button>
                                </CardContent>
                            </Card>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
