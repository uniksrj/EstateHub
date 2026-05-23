import { Link } from "react-router"
import { Building2, Phone, Mail, MapPin, ArrowRight } from "lucide-react"

const Footer = () => {
  const disabledLinkClass = "cursor-not-allowed text-muted-foreground/60"

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-14">
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-border bg-primary p-8 text-primary-foreground shadow-2xl shadow-primary/10 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.16em] text-primary-foreground/70">EstateHub India Advisory</p>
              <h2 className="text-[20px] font-semibold tracking-tight md:text-[22px]">Find a property with numbers, locality context, and real guidance.</h2>
            </div>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3 text-[14px] font-medium text-primary transition hover:bg-primary-foreground/90">
              Talk to an expert
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Building2 className="h-6 w-6" />
              </span>
              <span className="text-[20px] font-semibold">EstateHub India</span>
            </div>
            <p className="max-w-sm text-[14px] leading-6 text-muted-foreground md:text-[15px]">
              Your trusted partner for buying, renting, and selling property across India.
            </p>
            <div className="space-y-3 text-[13px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-foreground" />
                <span>+91 80 4567 8900</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-foreground" />
                <span>info@EstateHub India.business</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-foreground" />
                <span>MG Road, Bengaluru, Karnataka 560001</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h4 className="text-[18px] font-semibold">Properties</h4>
            <ul className="space-y-2 text-[14px] text-muted-foreground">
              <li>
                <Link to="/properties?type=house" className="hover:text-foreground transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="hover:text-foreground transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=condo" className="hover:text-foreground transition-colors">
                  Condos
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="hover:text-foreground transition-colors">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-[18px] font-semibold">Services</h4>
            <ul className="space-y-2 text-[14px] text-muted-foreground">
              <li>
                <span className={disabledLinkClass} title="Still working on it">
                  Buying
                </span>
              </li>
              <li>
                <span className={disabledLinkClass} title="Still working on it">
                  Selling
                </span>
              </li>
              <li>
                <span className={disabledLinkClass} title="Still working on it">
                  Renting
                </span>
              </li>
              <li>
                <span className={disabledLinkClass} title="Still working on it">
                  Valuation
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[18px] font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-[14px] text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 text-[12px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 EstateHub India. All rights reserved.</p>
          <p>Premium Indian real estate search for buyers, sellers, and agents.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
