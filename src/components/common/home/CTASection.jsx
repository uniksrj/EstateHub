import { Link } from "react-router"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const CTASection = () => {
  return (
    <section className="bg-background px-4 py-20">
      <div className="container mx-auto overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/10 md:px-10">
        <h2 className="mx-auto mb-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">Ready to Find Your Dream Home?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl">
          Join thousands of satisfied customers who found their perfect property with EstateHub India
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth/register">
            <Button size="lg" variant="secondary" className="rounded-full px-7 font-bold">
              Start Your Journey Today
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-primary-foreground/10 px-7 font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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
