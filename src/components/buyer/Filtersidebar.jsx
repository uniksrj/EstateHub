import { formatPrice } from "@/utils/userHelpers"
import { Card, CardContent } from "../ui/card"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const Filtersidebar = ({ filteredProperties, resetFilters, filters, handleFilterChange, properties }) => {
    const cities = [...new Set(properties.map(p => p.city))]
    const propertyTypes = [...new Set(properties.map(p => p.property_type))]
    return (
        <div className="lg:w-1/4">
            <h2 className="text-2xl font-bold mb-7">
                {filteredProperties.length} Properties Found
            </h2>
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
                                    {propertyTypes.map(type => (
                                        <SelectItem key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </SelectItem>
                                    ))}
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
                        <div className="grid grid-cols-2 gap-4">
                            {/* Bedrooms */}
                            <div className="flex items-center justify-between gap-2">
                                <label className="text-sm font-medium whitespace-nowrap">Bedrooms</label>
                                <Select
                                    value={filters.bedrooms}
                                    onValueChange={(value) => handleFilterChange('bedrooms', value)}
                                >
                                    <SelectTrigger className="w-28">
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
                            <div className="flex items-center justify-between gap-2">
                                <label className="text-sm font-medium whitespace-nowrap">Bathrooms</label>
                                <Select
                                    value={filters.bathrooms}
                                    onValueChange={(value) => handleFilterChange('bathrooms', value)}
                                >
                                    <SelectTrigger className="w-28">
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
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* City */}
                            <div className="flex items-center justify-between gap-2">
                                <label className="text-sm font-medium whitespace-nowrap">City</label>
                                <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Cities" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Cities</SelectItem>
                                        {cities.map(city => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status */}
                            <div className="flex items-center justify-between gap-2">
                                <label className="text-sm font-medium whitespace-nowrap">Status</label>
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
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}