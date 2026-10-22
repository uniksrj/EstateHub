import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { ArrowRight, Building2, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const HeroSection = () => {
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [imageAvailable, setImageAvailable] = useState(true)
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    const trimmedLocation = location.trim()
    if (trimmedLocation) params.set("location", trimmedLocation)
    if (propertyType !== "all") params.set("property_type", propertyType)
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`)
  }

  return (
    <section className="home-hero">
      <div className="grid min-h-[600px] lg:min-h-[650px] lg:grid-cols-[1.02fr_.98fr]">
        <div className="home-hero__copy flex flex-col justify-center py-14 lg:py-20">
          <p className="home-hero__eyebrow mb-5">A more considered way home</p>
          <h1>
            <span className="hero-line"><span>Find a place that</span></span>
            <span className="hero-line"><span>feels like <em className="not-italic text-primary">yours.</em></span></span>
          </h1>
          <p className="home-hero__description mt-6">
            Explore homes across India with the details, local context, and tools to make a confident move.
          </p>

          <form onSubmit={handleSearch} className="home-search" role="search">
            <div className="home-search__field">
              <MapPin aria-hidden="true" size={19} />
              <div className="min-w-0">
                <label htmlFor="home-location">Location</label>
                <input
                  id="home-location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="City or neighbourhood"
                  autoComplete="address-level2"
                />
              </div>
            </div>
            <div className="home-search__field">
              <div className="min-w-0 col-span-2">
                <label htmlFor="home-property-type">Property type</label>
                <select id="home-property-type" value={propertyType} onChange={(event) => setPropertyType(event.target.value)}>
                  <option value="all">All properties</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
            <Button type="submit" aria-label="Search properties">
              <Search size={17} aria-hidden="true" />
              <span>Search homes</span>
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="home-hero__note">Browse homes for sale and rent</span>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[var(--red-deep)]" to="/properties">
              Explore all properties <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="home-hero__media relative">
          {imageAvailable ? (
            <img
              src="/luxury-family-home-exterior.jpg"
              alt="Contemporary home framed by mature trees"
              fetchPriority="high"
              decoding="async"
              onError={() => setImageAvailable(false)}
            />
          ) : (
            <div className="home-hero__fallback" role="img" aria-label="Property photography is not available">
              <Building2 size={54} strokeWidth={1.1} aria-hidden="true" />
              <span>EstateHub India</span>
            </div>
          )}
          <div className="absolute bottom-5 left-5 bg-white px-4 py-3 sm:bottom-8 sm:left-8">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-primary">Find your next address</p>
            <p className="mt-1 text-sm text-foreground">Thoughtful search. Better decisions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
