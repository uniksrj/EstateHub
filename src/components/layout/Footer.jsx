import { Link } from "react-router"
import { ArrowUpRight, Building2 } from "lucide-react"

const Footer = () => (
  <footer className="site-footer">
    <div className="container mx-auto">
      <div className="site-footer__lead">
        <div>
          <p className="eyebrow">EstateHub India</p>
          <h2>Make your next move with a little more clarity.</h2>
        </div>
        <Link to="/contact" className="site-footer__contact">Talk with our team <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>

      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-brand site-brand--footer">
            <span className="site-brand__mark"><Building2 size={21} aria-hidden="true" /></span>
            <span><strong>EstateHub</strong><small>INDIA · REAL ESTATE</small></span>
          </Link>
          <p>Property discovery and connected tools for buyers, renters, sellers, and agents.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/properties">All properties</Link>
          <Link to="/properties?type=for-sale">For sale</Link>
          <Link to="/properties?type=for-rent">For rent</Link>
        </div>
        <div>
          <h3>EstateHub</h3>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/beta-feedback">Share feedback</Link>
        </div>
        <div>
          <h3>Information</h3>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms of service</Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} EstateHub India</span>
        <span>Property decisions, made more considered.</span>
      </div>
    </div>
  </footer>
)

export default Footer
