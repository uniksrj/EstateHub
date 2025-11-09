import { Link } from "react-router"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of satisfied customers who found their perfect property with EstateHub
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Start Your Journey Today
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-foreground bg-foreground text-primary-foreground hover:bg-primary-foreground/50">
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection