import { useState, useEffect } from "react"
import { Link } from "react-router"
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

const HeroSection = () => {
    const [activeText, setActiveText] = useState(0)

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

    return (
        <section className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden bg-background pt-24 text-primary-foreground">
            <div className="absolute inset-0">
                {heroContent.map((content, index) => (
                    <img
                        key={index}
                        src={content.image}
                        alt={content.highlight}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${index === activeText ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                    />
                ))}
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
                <div className="max-w-4xl">
                    <Badge className="mb-5 border-white/20 bg-black/25 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {heroContent[activeText].badge}
                    </Badge>
                    <h1 className="max-w-3xl text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[28px] lg:text-[28px]">
                        Estate Hub
                    </h1>

                    <div className="relative mt-5 min-h-[150px] max-w-3xl sm:min-h-[126px]">
                        {heroContent.map((content, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-out ${index === activeText ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                            >
                                <p className="text-[20px] font-semibold leading-snug text-white sm:text-[22px]">
                                    {content.title} {content.highlight}
                                </p>
                                <p className="mt-4 max-w-2xl text-[15px] leading-6 text-slate-200 sm:text-[16px]">
                                    {content.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 max-w-4xl rounded-[2rem] border border-white/15 bg-white/12 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
                        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                            <Link to="/properties" className="flex items-center gap-3 rounded-3xl bg-background p-4 text-foreground transition hover:bg-muted">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Location</span>
                                    <span className="block text-[14px] font-semibold text-foreground">Browse top neighborhoods</span>
                                </span>
                            </Link>
                            <Link to="/properties" className="flex items-center gap-3 rounded-3xl bg-background p-4 text-foreground transition hover:bg-muted">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card">
                                    <Home className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Property</span>
                                    <span className="block text-[14px] font-semibold text-foreground">Homes, rentals, and luxury listings</span>
                                </span>
                            </Link>
                            <Link to="/properties" className="md:min-w-44">
                                <Button size="lg" className="h-full w-full rounded-3xl px-6 text-[15px] font-semibold shadow-xl">
                                    <Search className="mr-2 h-5 w-5" />
                                    Search
                                </Button>
                            </Link>
                        </div>
                    </div>

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
                                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeText ? "w-9 bg-primary" : "w-2.5 bg-white/45 hover:bg-white/75"}`}
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
                        <ChevronDown className="h-4 w-4 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
