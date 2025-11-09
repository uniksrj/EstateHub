
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, DollarSign, CheckCircle } from "lucide-react"

const HowItWorksSection = () => {
  return (
    <section className="relative py-20 px-4 bg-card overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Simple steps to find your dream property</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: Search,
              step: "01",
              title: "Search & Explore",
              description: "Browse through thousands of properties with detailed filters"
            },
            {
              icon: Calendar,
              step: "02",
              title: "Schedule Viewing",
              description: "Book virtual or physical tours at your convenience"
            },
            {
              icon: DollarSign,
              step: "03",
              title: "Make an Offer",
              description: "Get expert negotiation support for the best deal"
            },
            {
              icon: CheckCircle,
              step: "04",
              title: "Close the Deal",
              description: "Complete paperwork with legal assistance"
            }
          ].map((step, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="h-8 w-8 text-primary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection