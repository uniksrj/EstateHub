import { PropertyCard } from "@/components/buyer/PropertyCard";
import { Paginationlink } from "@/components/common/Pagination";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/pages/misc/Loading";
import { propertiesAPI } from "@/services/api";
import { formatPrice } from "@/utils/userHelpers";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router";


export default function FavoritePage() {
    const { user } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(false)
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1); 
    const params = new URLSearchParams(searchParams);  
    params.set('isUserFavorite', true);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true)
            try {
                const params = Object.fromEntries(searchParams)
                params.isUserFavorite = true
                const response = await propertiesAPI.getAll(params)
                setLastPage(response.data.last_page)
                let settleData = response.data.data;
                console.log("return data for filter : ", settleData);

                const filtered_data = settleData.filter((val) => val.favorites?.[0]?.user_id === user.id)
                console.log("Filtered data : ", filtered_data);

                setProperties(filtered_data)
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

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setCurrentPage(page);
        setSearchParams(params);
    }

    const handleFavoriteChange = (propertyId, isNowFavorite) => {
        if (!isNowFavorite) {
            setProperties(prev => prev.filter(p => p.id !== propertyId))
        }
    }
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Your Favorite Properties
                    </h1>
                    <p className="text-lg md:text-xl opacity-90">
                        You’ve saved <span className="font-semibold">{properties.length}</span>
                        {properties.length === 1 ? " property" : " properties"} you love.
                        Explore them anytime and make your dream home a reality.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Properties Grid */}
                    <div className="lg:w-full w-full">

                        {/* Loading State */}
                        <Loading loading={loading} />

                        {/* Properties Grid */}
                        {!loading && (
                            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
