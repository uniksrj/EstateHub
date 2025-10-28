// components/seller/SellerProperties.jsx
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { propertiesAPI } from "@/services/api"
import { demoProperties } from "@/data/demoData"
import PropertiesList from "./PropertiesList"
import PropertiesFilters from "./PropertiesFilters"
import { useAuth } from "@/hooks/useAuth"

const SellerProperties = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        search: "",
        status: "all"
    })

    useEffect(() => {
        fetchSellerProperties()
    }, [])

    const fetchSellerProperties = async () => {
        setLoading(true)
        try {
            const response = await propertiesAPI.getPropertyListByUser();
            setProperties(response?.data || demoProperties)
        } catch (error) {
            console.error("Error:", error)
            setProperties(demoProperties)
        } finally {
            setLoading(false)
        }
    }
    console.log("This is user property",properties );
    
    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters)
    }

    return (
        <div className="min-h-screen bg-background p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Listings</h1>
                    <p className="text-muted-foreground mt-2">Manage your property listings</p>
                </div>
                <Link to={user.role_id === 6 ? "/seller/add-property" : "/agent/add-property"}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Property
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <PropertiesFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
            />

            {/* Properties List */}
            <PropertiesList
                properties={properties}
                loading={loading}
                filters={filters}
                onRefresh={fetchSellerProperties}
            />
        </div>
    )
}

export default SellerProperties