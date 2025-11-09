import { Link } from "react-router"
import { MapPin, Star, Heart, Eye, Badge } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedPropertiesSection = ({ loading, featuredProperties, scrollY }) => {
  // Calculate safe parallax values that don't cause layout issues
  const getSafeParallax = (base, multiplier = 0.5) => {
    return base * multiplier;
  };

  return (
    <section className="relative py-20 px-4 bg-muted/30 overflow-hidden">
      {/* Background pattern with very subtle parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470')`,
          transform: `translateY(${getSafeParallax(scrollY, 0.1)}px)`,
        }}
      />

      <div className="container mx-auto relative z-10">
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
            {featuredProperties.slice(0, 3).map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-border group"
              >
                <div className="aspect-video bg-muted overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {property.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-white/90 hover:bg-white text-foreground h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-white/90 hover:bg-white text-foreground h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
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
                    <span className="text-2xl font-bold text-primary">{property.price}</span>
                    <Link to={`/properties/${property.id}/view`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedPropertiesSection