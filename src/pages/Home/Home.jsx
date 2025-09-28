"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Search, MapPin, Star, TrendingUp, Shield, Users } from "lucide-react"
import { propertiesAPI } from "../../services/api"

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      // try {
      //   const response = await propertiesAPI.getFeatured()
      //   setFeaturedProperties(response.data)
      // } catch (error) {
      //   console.error("Error fetching featured properties:", error)
        // Fallback to mock data if API fails
        setFeaturedProperties([
          {
            id: 1,
            title: "Modern Downtown Loft",
            price: "$850,000",
            location: "Downtown District",
            beds: 2,
            baths: 2,
            sqft: "1,200",
            image: "/modern-loft-interior.jpg",
          },
          {
            id: 2,
            title: "Luxury Family Estate",
            price: "$1,250,000",
            location: "Hillside Heights",
            beds: 4,
            baths: 3,
            sqft: "2,800",
            image: "/luxury-family-home-exterior.jpg",
          },
          {
            id: 3,
            title: "Cozy Garden Apartment",
            price: "$425,000",
            location: "Garden District",
            beds: 1,
            baths: 1,
            sqft: "750",
            image: "/cozy-apartment-garden-view.jpg",
          },
        ])
      // } finally {
        setLoading(false)
      // }
    }

    fetchFeaturedProperties()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Premium Real Estate Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Find Your Perfect
            <span className="text-accent block">Dream Home</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Discover exceptional properties with our comprehensive real estate platform. From luxury estates to cozy
            apartments, we help you find the perfect place to call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Browse Properties
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Contact Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground">Handpicked premium properties just for you</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
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
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">{property.price}</span>
                      <Link to={`/properties/${property.id}/view`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EstateHub</h2>
            <p className="text-muted-foreground">Experience the difference with our premium platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Market Insights",
                description:
                  "Get real-time market data and trends to make informed decisions about your property investments.",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description:
                  "Your transactions are protected with bank-level security and comprehensive insurance coverage.",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "Work with certified real estate professionals who understand your local market inside and out.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect property with EstateHub
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
