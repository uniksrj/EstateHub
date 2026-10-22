import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { Building2, Menu, X, UserRound, LogOut, ChevronDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"
import { useAuth } from "@/hooks/useAuth"

const propertyLinks = [
  ["For sale", "/properties?type=for-sale"],
  ["For rent", "/properties?type=for-rent"],
  ["New listings", "/properties?type=new"],
  ["Luxury homes", "/properties?type=luxury"],
]

const getDashboardPath = (roleId) => {
  const routes = { 3: "/agent", 5: "/buyer", 6: "/seller" }
  return routes[Number(roleId)] || "/dashboard"
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [propertiesOpen, setPropertiesOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const active = (path) => location.pathname === path
  const dashboardPath = user ? getDashboardPath(user.role_id || user.userType_id) : null

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        setPropertiesOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setPropertiesOpen(false)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      closeMenu()
      navigate("/", { replace: true })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoggingOut(false)
    }
  }

  const navClass = (isCurrent) => `site-nav__link${isCurrent ? " is-current" : ""}`

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto flex h-[76px] items-center justify-between gap-5">
        <Link to="/" className="site-brand" aria-label="EstateHub India home" onClick={closeMenu}>
          <span className="site-brand__mark"><Building2 size={22} strokeWidth={1.7} aria-hidden="true" /></span>
          <span><strong>EstateHub</strong><small>INDIA · REAL ESTATE</small></span>
        </Link>

        <nav className="site-nav hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <Link to="/" aria-current={active("/") ? "page" : undefined} className={navClass(active("/"))}>Home</Link>
          <div className="site-nav__group">
            <button type="button" className={navClass(location.pathname.startsWith("/properties"))} aria-expanded={propertiesOpen} onClick={() => setPropertiesOpen((open) => !open)}>
              Discover <ChevronDown size={14} aria-hidden="true" />
            </button>
            {propertiesOpen && (
              <div className="site-nav__menu" role="menu">
                <Link to="/properties" role="menuitem" onClick={() => setPropertiesOpen(false)}>All properties</Link>
                {propertyLinks.map(([label, to]) => <Link key={to} to={to} role="menuitem" onClick={() => setPropertiesOpen(false)}>{label}</Link>)}
              </div>
            )}
          </div>
          <Link to="/about" aria-current={active("/about") ? "page" : undefined} className={navClass(active("/about"))}>About</Link>
          <Link to="/contact" aria-current={active("/contact") ? "page" : undefined} className={navClass(active("/contact"))}>Contact</Link>
          {user && <Link to={dashboardPath} aria-current={location.pathname.startsWith(dashboardPath) ? "page" : undefined} className={navClass(location.pathname.startsWith(dashboardPath))}>Workspace</Link>}
        </nav>

        <div className="site-header__actions hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/profile" className="site-profile"><UserRound size={16} aria-hidden="true" />{user.name}</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} disabled={loggingOut} aria-label="Log out">
                <LogOut size={16} aria-hidden="true" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="site-login">Log in</Link>
              <Button asChild size="sm" className="site-join"><Link to="/auth/register">Get started <ArrowUpRight size={15} aria-hidden="true" /></Link></Button>
            </>
          )}
        </div>

        <button type="button" className="site-menu-toggle lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div className="site-mobile-nav lg:hidden" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/properties" onClick={closeMenu}>All properties</Link>
            <div className="site-mobile-nav__subnav">
              {propertyLinks.map(([label, to]) => <Link key={to} to={to} onClick={closeMenu}>{label}</Link>)}
            </div>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
            {user && <Link to={dashboardPath} onClick={closeMenu}>Workspace</Link>}
          </nav>
          <div className="site-mobile-nav__actions">
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/profile" onClick={closeMenu}>Profile · {user.name}</Link>
                <Button variant="outline" onClick={handleLogout} disabled={loggingOut}><LogOut size={16} /> Log out</Button>
              </>
            ) : (
              <div className="flex gap-3"><Button asChild variant="outline"><Link to="/auth/login" onClick={closeMenu}>Log in</Link></Button><Button asChild><Link to="/auth/register" onClick={closeMenu}>Get started</Link></Button></div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
