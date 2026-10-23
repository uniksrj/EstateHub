import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router"
import { ArrowLeft, ArrowRight, Building2, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const editorialSlides = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85",
    alt: "Modern home with clean lines and a landscaped garden",
    label: "A considered collection",
    title: "Spaces made for living well",
    position: "center 52%",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    alt: "Sunlit contemporary living room with natural materials",
    label: "Interiors with intention",
    title: "Room to find your own rhythm",
    position: "center 55%",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    alt: "Thoughtfully designed residence framed by greenery",
    label: "Architecture that feels like home",
    title: "A little closer to belonging",
    position: "center 48%",
  },
  {
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
    alt: "Warm modern interior with a quiet courtyard view",
    label: "Find your point of view",
    title: "The right place changes everything",
    position: "center 58%",
  },
]

const HeroSection = ({ featuredProperties = [] }) => {
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [activeSlide, setActiveSlide] = useState(0)
  const [failedImages, setFailedImages] = useState(() => new Set())
  const [reducedMotion, setReducedMotion] = useState(false)
  const [paused, setPaused] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== "hidden")
  const [loadedImages, setLoadedImages] = useState(() => new Set())
  const navigate = useNavigate()
  const slideRegion = useRef(null)
  const pointerStart = useRef(null)
  const pauseReasons = useRef({ hover: false, focus: false, touch: false })

  const updatePauseReason = (reason, value) => {
    pauseReasons.current[reason] = value
    setPaused(Object.values(pauseReasons.current).some(Boolean))
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReducedMotion(media.matches)
    updatePreference()
    media.addEventListener?.("change", updatePreference)
    return () => media.removeEventListener?.("change", updatePreference)
  }, [])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden")
    document.addEventListener("visibilitychange", updateVisibility)
    return () => document.removeEventListener("visibilitychange", updateVisibility)
  }, [])

  const propertySlides = featuredProperties
    .filter((property) => property?.id && property?.image && !property.image.endsWith("/placeholder.svg"))
    .slice(0, 4)
    .map((property) => ({
      image: property.image,
      alt: property.title ? `Property photo: ${property.title}` : "Featured property",
      label: property.location,
      title: property.title,
      price: property.price,
      href: `/properties/${property.id}/view`,
      position: "center",
    }))
  const slides = propertySlides.length ? propertySlides : editorialSlides
  const slideCount = slides.length
  const currentSlideIndex = activeSlide % slideCount
  const currentSlide = slides[currentSlideIndex]

  useEffect(() => {
    if (reducedMotion || paused || !pageVisible) return undefined
    const timer = window.setTimeout(() => setActiveSlide((current) => (current + 1) % slides.length), 6500)
    return () => window.clearTimeout(timer)
  }, [activeSlide, pageVisible, paused, reducedMotion, slides.length])

  const goTo = useCallback((index) => {
    setActiveSlide((index + slideCount) % slideCount)
  }, [slideCount])
  const previous = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo])
  const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo])

  useEffect(() => {
    const region = slideRegion.current
    if (!region) return undefined
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); previous() }
      if (event.key === "ArrowRight") { event.preventDefault(); next() }
    }
    region.addEventListener("keydown", onKeyDown)
    return () => region.removeEventListener("keydown", onKeyDown)
  }, [next, previous])

  const handleSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    const trimmedLocation = location.trim()
    if (trimmedLocation) params.set("location", trimmedLocation)
    if (propertyType !== "all") params.set("property_type", propertyType)
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse") return
    pointerStart.current = event.clientX
    updatePauseReason("touch", true)
  }
  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    if (Math.abs(distance) > 50) (distance < 0 ? next : previous)()
    pointerStart.current = null
    updatePauseReason("touch", false)
  }

  return (
    <section className="home-hero" aria-label="Discover your next home">
      <div className="grid min-h-[600px] lg:min-h-[650px] lg:grid-cols-[1.02fr_.98fr]">
        <div className="home-hero__copy flex flex-col justify-center py-14 lg:py-20">
          <p className="home-hero__eyebrow mb-5">A more considered way home</p>
          <h1>
            <span className="hero-line"><span>Find a place that</span></span>
            <span className="hero-line"><span>feels like <em>yours.</em></span></span>
          </h1>
          <p className="home-hero__description mt-6">
            Explore homes across India with the details, local context, and tools to make a confident move.
          </p>

          <form onSubmit={handleSearch} className="home-search" role="search">
            <div className="home-search__field">
              <MapPin aria-hidden="true" size={19} />
              <div className="min-w-0">
                <label htmlFor="home-location">Location</label>
                <input id="home-location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or neighbourhood" autoComplete="address-level2" />
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
            <Button type="submit" aria-label="Search properties"><Search size={17} aria-hidden="true" /><span>Search homes</span></Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="home-hero__note">Browse homes for sale and rent</span>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[var(--green-deep)]" to="/properties">Explore all properties <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="home-hero__media">
          <div
            className="home-slider"
            ref={slideRegion}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured architecture"
            onMouseEnter={() => updatePauseReason("hover", true)}
            onMouseLeave={() => updatePauseReason("hover", false)}
            onFocus={() => updatePauseReason("focus", true)}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) updatePauseReason("focus", false) }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; updatePauseReason("touch", false) }}
          >
            {slides.map((slide, index) => (
              <img
                key={slide.image}
                className={`home-slider__image${index === currentSlideIndex && loadedImages.has(slide.image) ? " is-active" : ""}${failedImages.has(slide.image) ? " is-failed" : ""}`}
                src={slide.image}
                alt={index === currentSlideIndex ? slide.alt : ""}
                aria-hidden={index !== currentSlideIndex || undefined}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                width="1800"
                height="1200"
                style={{ objectPosition: slide.position }}
                onError={() => setFailedImages((current) => new Set(current).add(slide.image))}
                onLoad={() => setLoadedImages((current) => new Set(current).add(slide.image))}
              />
            ))}
            {!loadedImages.has(currentSlide.image) && !failedImages.has(currentSlide.image) && (
              <div className="home-slider__loading" role="status">Loading featured home</div>
            )}
            {failedImages.has(currentSlide.image) && (
              <div className="home-hero__fallback" role="img" aria-label="Property photography is temporarily unavailable">
                <Building2 size={48} strokeWidth={1.1} aria-hidden="true" /><span>EstateHub India</span>
              </div>
            )}
            <div className="home-slider__veil" aria-hidden="true" />
            <div key={currentSlide.image} className="home-slider__caption" aria-live="polite" aria-atomic="true">
              <small>{currentSlide.label}</small>
              <strong>{currentSlide.title}</strong>
              {currentSlide.price && <span className="home-slider__price">{currentSlide.price}</span>}
              {currentSlide.href && <Link className="home-slider__link" to={currentSlide.href}>View property <ArrowRight size={15} aria-hidden="true" /></Link>}
            </div>
            <div className="home-slider__controls" aria-label="Carousel controls">
              <button type="button" className="home-slider__arrow" aria-label="Previous slide" onClick={previous}><ArrowLeft size={17} aria-hidden="true" /></button>
              <div className="home-slider__dots" aria-label="Choose a slide">
                {slides.map((slide, index) => <button key={slide.image} type="button" className="home-slider__dot" aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-current={index === currentSlideIndex} onClick={() => goTo(index)} />)}
              </div>
              <span className="home-slider__count" aria-hidden="true">{String(currentSlideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              <button type="button" className="home-slider__arrow" aria-label="Next slide" onClick={next}><ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
