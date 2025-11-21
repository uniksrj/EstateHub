import { FilterHeader } from "@/components/buyer/FilterHeader"
import { Filtersidebar } from "@/components/buyer/Filtersidebar"
import { PropertyCard } from "@/components/buyer/PropertyCard"
import { Paginationlink } from "@/components/common/Pagination"
import { NoPropertyFound } from "@/components/common/property/NoPropertyFound"
import { demoPropertiesList } from "@/data/demoData"
import { Loading } from "@/pages/misc/Loading"
import { propertiesAPI } from "@/services/api"
import { formatPrice } from "@/utils/userHelpers"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export default function FindProperties() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState(demoPropertiesList)
    const [loading, setLoading] = useState(true)
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

    const [favorites, setFavorites] = useState([])

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

    const handleFavoriteChange = (propertyId, isNowFavorite) => {
        setFavorites(prev =>
            isNowFavorite
                ? prev
                : prev.filter(p => p.id !== propertyId)
        )
    }

    if (loading) {
        return <Loading loading={loading} />
    }

    if (!properties || properties.length === 0) {
        return <NoPropertyFound />
    }


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
                    <Filtersidebar filteredProperties={filteredProperties} resetFilters={resetFilters} filters={filters} handleFilterChange={handleFilterChange} properties={properties} />

                    {/* Properties Grid */}
                    <div className="lg:w-3/4">

                        {/* Results Header */}
                        <FilterHeader filters={filters} />

                        {/* Properties Grid */}
                        {!loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProperties.map(property => (
                                    <PropertyCard key={property.id} property={property} formatPrice={formatPrice} handleFavoriteChange={handleFavoriteChange} />
                                ))}
                            </div>
                        )}

                        {/* Pagination Link */}
                        <div className="col-span-full flex justify-center mt-4">
                            <Paginationlink currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
