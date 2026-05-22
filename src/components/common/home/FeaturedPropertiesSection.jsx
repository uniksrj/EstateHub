import { Link } from "react-router"
import { Bath, Bed, MapPin, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedPropertiesSection = ({ loading, featuredProperties }) => {
  const properties = featuredProperties.slice(0, 3)
  const leadProperty = properties[0]
  const secondaryProperties = properties.slice(1)

  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-4 py-20 [content-visibility:auto] [contain-intrinsic-size:900px]">
      <div className="container mx-auto relative z-10">
        <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Featured Properties</p>
            <h2 className="text-[24px] font-semibold leading-tight tracking-tight md:text-[30px]">Homes worth a closer look this week.</h2>
            <p className="mt-4 text-[15px] leading-6 text-muted-foreground">
              A short list of active listings selected for visibility, location quality, and buyer interest.
            </p>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="rounded-none px-6 text-[14px] font-semibold">
              View all properties
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="animate-pulse">
              <div className="aspect-[16/10] bg-muted" />
              <div className="mt-5 h-6 w-2/3 bg-muted" />
              <div className="mt-3 h-4 w-1/2 bg-muted" />
            </div>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="grid animate-pulse grid-cols-[7rem_1fr] gap-4 border-b border-border pb-6">
                  <div className="aspect-square bg-muted" />
                  <div>
                    <div className="h-5 w-3/4 bg-muted" />
                    <div className="mt-3 h-4 w-1/2 bg-muted" />
                    <div className="mt-5 h-5 w-1/3 bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : leadProperty ? (
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <article className="group">
              <Link to={`/properties/${leadProperty.id}/view`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={leadProperty.image}
                    alt={leadProperty.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  {(leadProperty.featured || leadProperty.isBoostActive) && (
                    <Badge className="absolute left-4 top-4 rounded-none bg-background px-3 py-1 text-[12px] font-semibold text-foreground shadow-sm">
                      {leadProperty.boostType === "homepage" ? "Homepage Featured" : "Featured"}
                    </Badge>
                  )}
                </div>
              </Link>

              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <Link to={`/properties/${leadProperty.id}/view`}>
                    <h3 className="text-[24px] font-semibold leading-tight tracking-tight transition hover:text-accent md:text-[28px]">
                      {leadProperty.title}
                    </h3>
                  </Link>
                  <div className="mt-3 flex items-start gap-2 text-[14px] text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{leadProperty.location}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Bed className="h-4 w-4" />{leadProperty.beds} beds</span>
                    <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" />{leadProperty.baths} baths</span>
                    <span className="inline-flex items-center gap-1.5"><Ruler className="h-4 w-4" />{leadProperty.sqft} sqft</span>
                  </div>
                </div>
                <div className="md:text-right">
                  <div className="text-[24px] font-semibold tracking-tight text-foreground">{leadProperty.price}</div>
                  <Link to={`/properties/${leadProperty.id}/view`} className="mt-3 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
                    View Details
                  </Link>
                </div>
              </div>
            </article>

            <div className="space-y-6 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
              {secondaryProperties.map((property) => (
                <article key={property.id} className="group grid grid-cols-[7.5rem_1fr] gap-4 border-b border-border pb-6 last:border-b-0">
                  <Link to={`/properties/${property.id}/view`} className="block overflow-hidden bg-muted">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  <div className="min-w-0">
                    {(property.featured || property.isBoostActive) && (
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {property.boostType === "homepage" ? "Homepage Featured" : "Featured"}
                      </div>
                    )}
                    <Link to={`/properties/${property.id}/view`}>
                      <h3 className="line-clamp-2 text-[17px] font-semibold leading-snug transition hover:text-accent">
                        {property.title}
                      </h3>
                    </Link>
                    <div className="mt-2 flex items-start gap-1.5 text-[13px] text-muted-foreground">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                      <span>{property.beds} bd</span>
                      <span>{property.baths} ba</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    <div className="mt-3 text-[18px] font-semibold tracking-tight">{property.price}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-y border-border py-10 text-[15px] text-muted-foreground">
            No featured properties are available right now.
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedPropertiesSection
