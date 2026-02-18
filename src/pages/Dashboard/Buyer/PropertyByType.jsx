import { FilterHeader } from "@/components/buyer/FilterHeader"
import { Filtersidebar } from "@/components/buyer/Filtersidebar"
import { PropertyCard } from "@/components/buyer/PropertyCard"
import { Paginationlink } from "@/components/common/Pagination"
import { NoPropertyFound } from "@/components/common/property/NoPropertyFound"
import { Loading } from "@/pages/misc/Loading"
import { propertiesAPI } from "@/services/api"
import { formatPrice } from "@/utils/userHelpers"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export default function PropertyByType() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [properties, setProperties] = useState([])
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
    const type = searchParams.get("type") || "all";

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true)
            try {
                const params = Object.fromEntries(searchParams)
                const response = await propertiesAPI.getPropertyByType(params)
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

    const getTitle = () => {
        switch (type) {
            case "for-sale":
                return "Properties For Sale"
            case "for-rent":
                return "Properties For Rent"
            case "new":
                return "New Listings"
            case "luxury":
                return "Luxury Homes"
            default:
                return "All Properties"
        }
    }

    // const handleFilterChange = (key, value) => {
    //     setFilters(prev => ({ ...prev, [key]: value }))
    // }

    // const resetFilters = () => {
    //     setFilters({
    //         search: "",
    //         propertyType: "all",
    //         minPrice: 0,
    //         maxPrice: 2000000,
    //         bedrooms: "any",
    //         bathrooms: "any",
    //         city: "all",
    //         status: "for_sale"
    //     })
    // }

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
                   <h1 className="text-4xl font-bold mb-4">{getTitle()}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filters Sidebar */}
                    {/* <Filtersidebar filteredProperties={properties} resetFilters={resetFilters} filters={filters} handleFilterChange={handleFilterChange} properties={properties} /> */}

                    {/* Properties Grid */}
                    <div className="lg:w-3/4">

                        {/* Results Header */}
                        {/* <FilterHeader filters={filters} /> */}

                        {/* Properties Grid */}
                        {!loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {properties.map(property => (
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
