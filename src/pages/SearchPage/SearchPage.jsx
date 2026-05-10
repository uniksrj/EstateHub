import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Star, Bed, Bath, Square, Map, List } from "lucide-react"

export default function SearchPage() {
  const searchResults = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: 850000,
      location: "Downtown District",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Apartment",
      image: "./../../../public/modern-loft-interior.jpg",
      rating: 4.8,
      features: ["Parking", "Gym", "Pool"],
    },
    {
      id: 2,
      title: "Luxury Family Estate",
      price: 1250000,
      location: "Hillside Heights",
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: "House",
      image: "./../../../public/luxury-family-home-exterior.jpg",
      rating: 4.9,
      features: ["Garden", "Garage", "Fireplace"],
    },
    {
      id: 3,
      title: "Cozy Garden Apartment",
      price: 425000,
      location: "Garden District",
      beds: 1,
      baths: 1,
      sqft: 750,
      type: "Apartment",
      image: "./../../../public/cozy-apartment-garden-view.png",
      rating: 4.6,
      features: ["Balcony", "Garden View", "Pet Friendly"],
    },
    {
      id: 4,
      title: "Waterfront Penthouse",
      price: 2100000,
      location: "Marina Bay",
      beds: 3,
      baths: 3,
      sqft: 2200,
      type: "Penthouse",
      image: "./../../../public/waterfront-penthouse-view.jpg",
      rating: 4.9,
      features: ["Ocean View", "Terrace", "Concierge"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Advanced Property Search</h1>
          <p className="text-muted-foreground">Find your perfect property with our comprehensive search tools</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm">
                    Clear All
                  </Button>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter city, neighborhood..." className="pl-10" />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label>Price Range</Label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[400000, 1500000]}
                      max={3000000}
                      min={100000}
                      step={50000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>$400K</span>
                    <span>$1.5M</span>
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <Label>Property Type</Label>
                  <div className="space-y-2">
                    {["House", "Apartment", "Condo", "Penthouse", "Studio"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Select>
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

                {/* Bathrooms */}
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Square Footage */}
                <div className="space-y-3">
                  <Label>Square Footage</Label>
                  <div className="px-2">
                    <Slider defaultValue={[500, 3000]} max={5000} min={300} step={100} className="w-full" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>500 sqft</span>
                    <span>3,000 sqft</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {["Parking", "Pool", "Gym", "Garden", "Balcony", "Pet Friendly"].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox id={feature} />
                        <Label htmlFor={feature} className="text-sm">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">{searchResults.length} properties found</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="size">Largest First</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button variant="ghost" size="sm" className="rounded-r-none">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-l-none">
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Property Results */}
            <div className="space-y-4">
              {searchResults.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="w-80 aspect-video bg-muted">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-xl mb-1">{property.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{property.rating}</span>
                            <Badge variant="outline" className="ml-2">
                              {property.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent">${property.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            ${Math.round(property.price / property.sqft)}/sqft
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.beds} beds</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.baths} baths</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            <span>{property.sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {property.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Save
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Tour
                          </Button>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
