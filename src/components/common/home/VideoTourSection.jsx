import { CheckCircle } from "lucide-react"

const VideoTourSection = () => {
  return (
    <section className="relative py-20 px-4 bg-muted/30 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:760px]">
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
                <track
                  src="/captions/virtual-tour.vtt"
                  kind="captions"
                  srcLang="en"
                  label="English captions"
                  default
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
