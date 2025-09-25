import { Link } from "react-router"
import { Building2, Phone, Mail, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">EstateHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in finding the perfect property. Excellence in real estate since 2020.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-ESTATE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@estatehub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Real Estate Ave, Property City, PC 12345</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h4 className="font-semibold">Properties</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/properties?type=house" className="hover:text-accent transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="hover:text-accent transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=condo" className="hover:text-accent transition-colors">
                  Condos
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="hover:text-accent transition-colors">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/services/buying" className="hover:text-accent transition-colors">
                  Buying
                </Link>
              </li>
              <li>
                <Link to="/services/selling" className="hover:text-accent transition-colors">
                  Selling
                </Link>
              </li>
              <li>
                <Link to="/services/renting" className="hover:text-accent transition-colors">
                  Renting
                </Link>
              </li>
              <li>
                <Link to="/services/valuation" className="hover:text-accent transition-colors">
                  Valuation
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
