import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Search, Shield, Award, Star, Phone, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { heroContent } from "@/data/demoData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const HeroSection = () => {
    const [activeText, setActiveText] = useState(0);

    // Auto-advance text and background
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveText((prev) => (prev + 1) % heroContent.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroContent.length]);

    const nextSlide = () => {
        setActiveText((prev) => (prev + 1) % heroContent.length);
    };

    const prevSlide = () => {
        setActiveText((prev) => (prev - 1 + heroContent.length) % heroContent.length);
    };
    console.log("this is badge title ", heroContent[activeText].badge);


    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary/95 to-slate-800">
            {/* Enhanced Background with better contrast */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/60"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Text Content - Left Side */}
                    <div className="text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1 min-w-0">
                        {/* Professional Badge */}
                        <div className="flex justify-center lg:justify-start items-center gap-4 mb-4 lg:mb-6">
                            <Badge className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold">
                                {heroContent[activeText].badge}
                            </Badge>
                        </div>

                        {/* Enhanced Text Content with Better Typography */}
                        <div className="relative min-h-[240px] sm:min-h-[260px] lg:min-h-[280px] mb-4 lg:mb-6">
                            {heroContent.map((content, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === activeText
                                            ? 'opacity-100 translate-x-0'
                                            : index < activeText
                                                ? 'opacity-0 -translate-x-8 lg:-translate-x-10'
                                                : 'opacity-0 translate-x-8 lg:translate-x-10'
                                        }`}
                                >
                                    {/* Main Heading with Enhanced Font */}
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight tracking-tight break-words">
                                        {content.title}
                                        <span className="text-accent block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mt-2">
                                            {content.highlight}
                                        </span>
                                    </h1>

                                    {/* Description with Better Readability */}
                                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light mb-6 lg:mb-8 px-4 sm:px-0">
                                        {content.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Professional CTA Buttons - Properly Spaced */}
                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 mt-8 lg:mt-12 justify-center lg:justify-start">
                            <Link to="/properties" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 lg:px-10 lg:py-4 text-base lg:text-lg font-semibold shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105">
                                    <Search className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                                    Explore Properties
                                </Button>
                            </Link>
                            <Link to="/contact" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 lg:px-10 lg:py-4 text-base lg:text-lg font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                                    <Phone className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                                    Consult Expert
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators - Side by side on all screens */}
                        <div className="flex flex-wrap items-center justify-center py-5 lg:py-0 lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-8 mt-6 lg:mt-8 border-t border-white/20">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-accent" />
                                <span className="text-white/80 text-sm font-medium">Secure Transactions</span>
                            </div>
                            <div className="flex items-center gap-2 lg:gap-3">
                                <Award className="h-5 w-5 lg:h-6 lg:w-6 text-accent" />
                                <span className="text-white/80 text-sm font-medium">Award Winning</span>
                            </div>
                        </div>
                    </div>

                    {/* Professional Image Section - Right Side */}
                    <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
                        {/* Main Image Container with Professional Styling */}
                        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-md mx-auto lg:max-w-none">
                            <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] relative bg-gradient-to-br from-slate-800 to-slate-900">
                                {heroContent.map((content, index) => (
                                    <img
                                        key={index}
                                        src={content.image}
                                        alt={content.highlight}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${index === activeText
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-105'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Professional Floating Elements */}
                            <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                                <Badge className="bg-white/95 text-slate-900 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold shadow-lg">
                                    Hot Listing
                                </Badge>
                            </div>

                            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 bg-white/95 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg">
                                <div className="text-slate-900 text-center">
                                    <div className="text-xl lg:text-2xl font-bold">4.9/5</div>
                                    <div className="text-xs lg:text-sm font-medium">Client Rating</div>
                                    <div className="flex justify-center mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="h-2 w-2 lg:h-3 lg:w-3 text-yellow-500 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Professional Navigation Dots */}
                            <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 lg:px-4 lg:py-2">
                                <div className="flex space-x-1 lg:space-x-2">
                                    {heroContent.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveText(index)}
                                            className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300 ${index === activeText ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Professional Decorative Elements */}
                        <div className="absolute -z-10 top-4 -right-4 lg:top-10 lg:-right-10 w-40 h-40 lg:w-80 lg:h-80 bg-accent/10 rounded-full blur-2xl lg:blur-3xl"></div>
                        <div className="absolute -z-10 bottom-4 -left-4 lg:bottom-10 lg:-left-10 w-48 h-48 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-2xl lg:blur-3xl"></div>
                    </div>
                </div>
            </div>

            {/* Professional Navigation Arrows - Hidden on mobile, shown on desktop */}
            <button
                onClick={prevSlide}
                className="hidden lg:block absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/0 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 group border border-white/0 hover:border-white/20"
            >
                <ChevronLeft className="h-6 w-6 text-white/80 hover:text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
                onClick={nextSlide}
                className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/0 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 group border border-white/0 hover:border-white/20"
            >
                <ChevronRight className="h-6 w-6 text-white/80 hover:text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Professional Scroll Indicator */}
            <div className="absolute hidden md:block lg:block bottom-4 lg:bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center space-y-1 lg:space-y-2">
                    <span className="text-white/70 text-xs lg:text-sm font-medium tracking-wide">EXPLORE MORE</span>
                    <div className="animate-bounce">
                        <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5 text-white/70" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
