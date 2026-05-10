
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Users } from "lucide-react"

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose EstateHub</h2>
          <p className="text-muted-foreground">Experience the difference with our premium platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: "Market Insights",
              description:
                "Get real-time market data and trends to make informed decisions about your property investments.",
            },
            {
              icon: Shield,
              title: "Secure Transactions",
              description:
                "Your transactions are protected with bank-level security and comprehensive insurance coverage.",
            },
            {
              icon: Users,
              title: "Expert Support",
              description:
                "Work with certified real estate professionals who understand your local market inside and out.",
            },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
