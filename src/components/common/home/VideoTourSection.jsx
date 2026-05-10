
import { Button } from "@/components/ui/button";
import { Play, CheckCircle } from "lucide-react"

const VideoTourSection = ({ scrollY }) => {
  // Calculate safe parallax values that don't cause layout issues
  const getSafeParallax = (base, multiplier = 0.5) => {
    return base * multiplier;
  };

  return (
    <section className="relative py-20 px-4 bg-muted/30 overflow-hidden">
      {/* Subtle background parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560448076-213180fe7d44?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470')`,
          transform: `translateY(${getSafeParallax(scrollY, 0.15)}px)`,
        }}
      />
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Virtual Property Tours</h2>
            <p className="text-muted-foreground mb-6">
              Experience properties from the comfort of your home with our immersive 360° virtual tours.
              Walk through every room, explore the neighborhood, and get a real feel for your future home.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "HD quality 360° video tours",
                "Interactive floor plans",
                "Neighborhood exploration",
                "Live Q&A with agents"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-3" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {/* <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo Tour
            </Button> */}
          </div>
          <div className="relative">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                // poster="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470"
              >
                <source
                  src="https://res.cloudinary.com/deuwelzrs/video/upload/v1777824608/7578112-uhd_3840_2160_30fps_fspwow.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoTourSection
