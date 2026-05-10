import { Link } from "react-router"
import { Bath, Bed, Eye, Heart, MapPin, Ruler, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedPropertiesSection = ({ loading, featuredProperties, scrollY }) => {
  // Calculate safe parallax values that don't cause layout issues
  const getSafeParallax = (base, multiplier = 0.5) => {
    return base * multiplier;
  };

  return (
    <section className="relative overflow-hidden bg-background px-4 py-20">
      {/* Background pattern with very subtle parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470')`,
          transform: `translateY(${getSafeParallax(scrollY, 0.1)}px)`,
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Featured Properties</p>
            <h2 className="text-[20px] font-semibold tracking-tight md:text-[22px]">Homepage featured homes getting the most buyer attention</h2>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="rounded-full px-6 text-[14px] font-semibold">
              View all properties
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden rounded-[1.75rem] border-border shadow-sm animate-pulse">
                <div className="aspect-[4/3] bg-muted"></div>
                <CardContent className="p-6">
                  <div className="mb-2 h-5 rounded bg-muted"></div>
                  <div className="mb-3 h-4 w-2/3 rounded bg-muted"></div>
                  <div className="mb-4 h-4 w-1/2 rounded bg-muted"></div>
                  <div className="flex justify-between gap-4">
                    <div className="h-7 w-1/3 rounded bg-muted"></div>
                    <div className="h-10 w-1/3 rounded bg-muted"></div>
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
                className={`group overflow-hidden rounded-[1.75rem] bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  property.isBoostActive
                    ? "border-gold/70 shadow-lg shadow-gold/10 hover:shadow-gold/20"
                    : "border-border shadow-sm hover:shadow-primary/10"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {(property.featured || property.isBoostActive) && (
                    <Badge className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[12px] font-semibold text-accent-foreground shadow-lg">
                      {property.boostType === "homepage" ? "Homepage Featured" : "Featured"}
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="h-9 w-9 rounded-full bg-card/95 p-0 text-foreground hover:bg-card">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="h-9 w-9 rounded-full bg-card/95 p-0 text-foreground hover:bg-card">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-[18px] font-semibold leading-snug md:text-[20px]">{property.title}</h3>
                    <div className="flex shrink-0 items-center rounded-full bg-muted px-2.5 py-1">
                      <Star className="h-4 w-4 text-gold fill-current" />
                      <span className="ml-1 text-[12px] text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center text-muted-foreground">
                    <MapPin className="mr-1.5 h-4 w-4" />
                    <span className="text-[14px]">{property.location}</span>
                  </div>
                  <div className="mb-5 grid grid-cols-3 gap-2 text-[12px] text-muted-foreground md:text-[13px]">
                    <span className="flex items-center gap-1.5 rounded-2xl bg-muted/70 px-3 py-2"><Bed className="h-4 w-4" />{property.beds}</span>
                    <span className="flex items-center gap-1.5 rounded-2xl bg-muted/70 px-3 py-2"><Bath className="h-4 w-4" />{property.baths}</span>
                    <span className="flex items-center gap-1.5 rounded-2xl bg-muted/70 px-3 py-2"><Ruler className="h-4 w-4" />{property.sqft}</span>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[20px] font-bold text-foreground md:text-[24px]">{property.price}</span>
                    <Link to={`/properties/${property.id}/view`}>
                      <Button size="sm" className="rounded-full px-5 text-[14px] font-semibold">
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
