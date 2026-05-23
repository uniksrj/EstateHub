import { useState, useEffect, useMemo } from "react"
import { Link, useNavigate } from "react-router"
import {
    Award,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Home,
    MapPin,
    Phone,
    Search,
    Shield,
    Star,
} from "lucide-react"
import { heroContent } from "@/data/demoData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const propertyTypeOptions = [
    { value: "all", label: "All property types" },
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "commercial", label: "Commercial" },
]

const HeroSection = () => {
    const [activeText, setActiveText] = useState(0)
    const [location, setLocation] = useState("")
    const [propertyType, setPropertyType] = useState("all")
    const [propertyTypeOpen, setPropertyTypeOpen] = useState(false)
    const navigate = useNavigate()
    const activeContent = heroContent[activeText]
    const selectedPropertyType = propertyTypeOptions.find((option) => option.value === propertyType) || propertyTypeOptions[0]
    const heroImage = useMemo(() => {
        const separator = activeContent.image.includes("?") ? "&" : "?"
        return `${activeContent.image}${separator}fm=webp&q=65&w=1280`
    }, [activeContent.image])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveText((prev) => (prev + 1) % heroContent.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const nextSlide = () => {
        setActiveText((prev) => (prev + 1) % heroContent.length)
    }

    const prevSlide = () => {
        setActiveText((prev) => (prev - 1 + heroContent.length) % heroContent.length)
    }

    const handleSearch = (event) => {
        event.preventDefault()

        const params = new URLSearchParams()
        const trimmedLocation = location.trim()

        if (trimmedLocation) params.set("location", trimmedLocation)
        if (propertyType && propertyType !== "all") params.set("property_type", propertyType)

        navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`)
    }

    return (
        <section className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden bg-background pt-24 text-primary-foreground">
            <div className="absolute inset-0">
                <img
                    key={activeContent.image}
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
                <div className="max-w-4xl">
                    <Badge className="mb-5 border-white/20 bg-black/25 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {activeContent.badge}
                    </Badge>
                    <h1 className="max-w-3xl text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[28px] lg:text-[28px]">
                        EstateHub India
                    </h1>

                    <div className="relative mt-5 min-h-[150px] max-w-3xl sm:min-h-[126px]">
                        <div className="absolute inset-0">
                            <p className="text-[20px] font-semibold leading-snug text-white sm:text-[22px]">
                                {activeContent.title} {activeContent.highlight}
                            </p>
                            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-slate-200 sm:text-[16px]">
                                {activeContent.description}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="mt-8 max-w-6xl bg-black/35 backdrop-blur-md">
                        <div className="grid gap-0 md:grid-cols-[1.2fr_0.9fr_auto]">
                            <label className="flex items-center gap-3 border-b border-white/20 px-0 py-4 md:border-b-0 md:border-r md:px-5">
                                <MapPin className="h-5 w-5 shrink-0 text-white" />
                                <span className="min-w-0 flex-1">
                                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">Location</span>
                                    <Input
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                        placeholder="City, area, or neighborhood"
                                        className="h-auto border-0 bg-transparent p-0 text-[15px] font-semibold text-white shadow-none placeholder:text-slate-300 focus-visible:ring-0"
                                    />
                                </span>
                            </label>

                            <label className="flex items-center gap-3 border-b border-white/20 px-0 py-4 md:border-b-0 md:border-r md:px-5">
                                <Home className="h-5 w-5 shrink-0 text-white" />
                                <span className="relative min-w-0 flex-1">
                                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">Property Type</span>
                                    <button
                                        type="button"
                                        onClick={() => setPropertyTypeOpen((open) => !open)}
                                        onBlur={() => window.setTimeout(() => setPropertyTypeOpen(false), 120)}
                                        className="flex w-full items-center justify-between gap-3 text-left text-[15px] font-semibold text-white outline-none"
                                    >
                                        {selectedPropertyType.label}
                                        <ChevronDown className={`h-4 w-4 shrink-0 transition ${propertyTypeOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {propertyTypeOpen && (
                                        <div className="absolute left-0 top-[calc(100%+1rem)] z-50 w-full min-w-48 border border-white/20 bg-black/70 py-1 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
                                            {propertyTypeOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onMouseDown={(event) => event.preventDefault()}
                                                    onClick={() => {
                                                        setPropertyType(option.value)
                                                        setPropertyTypeOpen(false)
                                                    }}
                                                    className={`block w-full px-3 py-2 text-left text-[14px] transition hover:bg-white/15 ${
                                                        option.value === propertyType ? "bg-white/10 font-semibold" : ""
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </span>
                            </label>

                            <Button type="submit" size="lg" className="h-full min-h-16 rounded-none px-7 text-[15px] font-semibold shadow-none">
                                <Search className="mr-2 h-5 w-5" />
                                Search
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/properties">
                            <Button size="lg" className="rounded-full px-7 text-[15px] font-semibold">
                                <Search className="mr-2 h-5 w-5" />
                                Explore Properties
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="lg" className="rounded-full border-white/30 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-md hover:bg-white hover:text-primary">
                                <Phone className="mr-2 h-5 w-5" />
                                Contact
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/15 pt-6">
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-success" />
                            <span className="text-[13px] font-medium text-success">Verified listings</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-white" />
                            <span className="text-[13px] font-medium text-slate-200">Expert guidance</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Star className="h-5 w-5 fill-gold text-gold" />
                            <span className="text-[13px] font-medium text-slate-200">4.9 client rating</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                    <div className="flex gap-1 rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-md">
                        {heroContent.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveText(index)}
                                className={`min-h-11 min-w-11 rounded-full transition-colors duration-200 ${index === activeText ? "bg-primary" : "bg-white/45 hover:bg-white/75"}`}
                                aria-label={`Show hero slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="hidden gap-2 lg:flex">
                        <button
                            onClick={prevSlide}
                            className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white hover:text-primary"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white hover:text-primary"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="mt-8 hidden md:flex">
                    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                        Explore more
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
