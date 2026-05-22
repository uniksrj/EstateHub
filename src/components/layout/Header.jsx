"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { Building2, Menu, X, User, LogOut, Home, Phone, Users, Info, ChevronDown, Search } from "lucide-react"
import { Button } from "../ui/button"
import ThemeToggle from "../ThemeToggle"
import { useAuth } from "../../hooks/useAuth"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const headerRef = useRef(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onDoCLick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', onDoCLick)
    document.addEventListener('touchstart', onDoCLick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoCLick)
      document.removeEventListener('touchstart', onDoCLick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleToggle = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  const handleLogout = async () => {
    try {
      setLoading(true);
      let result = await logout();
      if (result.success) {
        navigate("/login", { replace: true, state: {} });
      }

    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
      navigate("/");
    }

  }

  const isActive = (path) => location.pathname === path
  //  const navItems = [
  //     { href: "/", label: "Home", icon: Home },
  //     { href: "/properties", label: "Properties", icon: Building2 },
  //     { href: "/search", label: "Search", icon: Search },
  //     { href: "/contact", label: "Contact", icon: Phone },
  //   ]

  const supportHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
  const navLinkClass = (active) =>
    `inline-flex items-center rounded-full px-3 py-2 text-[14px] font-medium transition-colors hover:bg-muted hover:text-foreground ${
      active ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground"
    }`

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/10">
              <Building2 className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-[20px] font-semibold tracking-tight">Estate Hub</span>
              <span className="hidden text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:block">Premium Realty</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border border-border/80 bg-card/80 p-1.5 shadow-sm lg:flex">
            <Link
              to="/"
              className={navLinkClass(isActive("/"))}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => {
                if (supportHover) setOpenDropdown("properties");
              }}
              onMouseLeave={() => {
                if (supportHover) setOpenDropdown(null);
              }}
            >
              <button
                onClick={() => {
                  if (!supportHover) handleToggle("properties");
                }}
                aria-expanded={openDropdown === "properties"}
                aria-controls="properties-menu"
                className={navLinkClass(location.pathname.startsWith("/properties"))}
              >
                <Building2 className="h-4 w-4 mr-1" /> Properties
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>

              {/* dropdown uses theme variable --popover for background so it matches theme */}
              <div
                id="properties-menu"
                role="menu"
                className={`absolute left-0 top-[calc(100%+4px)] w-56 rounded-2xl border border-border bg-popover p-2 shadow-xl ring-1 ring-black/5 z-50 transform transition duration-150 origin-top-left
                  ${openDropdown === "properties" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                <Link to="/properties?type=for-sale" className="block rounded-xl px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted" role="menuitem">
                  For Sale
                </Link>
                <Link to="/properties?type=for-rent" className="block rounded-xl px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted" role="menuitem">
                  For Rent
                </Link>
                <Link to="/properties?type=new" className="block rounded-xl px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted" role="menuitem">
                  New Listings
                </Link>
                <Link to="/properties?type=luxury" className="block rounded-xl px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted" role="menuitem">
                  Luxury Homes
                </Link>
              </div>
            </div>

            {/* {user && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname.startsWith("/admin") ? "text-accent" : "text-foreground"
                  }`}
              >
                Admin
              </Link>
            )} */}

            {user && (
              (() => {
                const roleId = Number(user.role_id || user.userType_id)
                const dashboardPath =
                  roleId === 3 ? "/agent" :
                  roleId === 5 ? "/buyer" :
                  roleId === 6 ? "/seller" :
                  "/dashboard"
                const isDashboardActive =
                  location.pathname === dashboardPath || location.pathname.startsWith(`${dashboardPath}/`)

                return roleId === 1 || roleId === 2 ? (
                  <Link to={dashboardPath} className={navLinkClass(isDashboardActive)}>
                    Admin
                  </Link>
                ) : (
                  <Link to={dashboardPath} className={navLinkClass(isDashboardActive)}>
                    Dashboard
                  </Link>
                )
              })()
            )}
            {(user?.role_id === 5 || !user) && (


              <div
                className="relative"
                onMouseEnter={() => {
                  if (supportHover) setOpenDropdown("agents");
                }}
                onMouseLeave={() => {
                  if (supportHover) setOpenDropdown(null);
                }}
              >
                <button
                  onClick={() => handleToggle("agents")}
                  aria-expanded={openDropdown === "agents"}
                  aria-controls="agents-menu"
                  className={navLinkClass(isActive("/agents"))}
                >
                  <Users className="h-4 w-4 mr-1" /> Agents
                  <ChevronDown className="h-3 w-3 ml-1" />
                </button>

                <div
                  id="agents-menu"
                  role="menu"
                  className={`absolute left-0 top-[calc(100%+4px)] w-56 rounded-2xl border border-border bg-popover p-2 shadow-xl ring-1 ring-black/5 z-50 transform transition duration-150 origin-top-left
                  ${openDropdown === "agents" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                >
                  <Link to="/agents" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted" role="menuitem">
                    Find an Agent
                  </Link>
                  <Link to="/agents/top" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted" role="menuitem">
                    Top Rated Agents
                  </Link>
                </div>
              </div>
            )
            }
            <Link to="/about" className={navLinkClass(isActive("/about"))}>
              <Info className="h-4 w-4 mr-1" /> About
            </Link>

            <Link
              to="/contact"
              className={navLinkClass(isActive("/contact"))}
            >
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-border bg-card px-3 py-2 text-[14px] shadow-sm">
                  {/* <User className="h-4 w-4" />
                  <span>{user.name}</span> */}
                  <Link to="/profile" className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{user.name}</span>
                  </Link>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm" className="rounded-full px-5 shadow-lg shadow-primary/10">
                    <Search className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-full border border-border bg-card p-2 shadow-sm lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-5 pt-2">
            <nav id="mobile-navigation" className="flex max-h-[72vh] flex-col gap-2 overflow-y-auto rounded-3xl border border-border bg-card p-4 shadow-xl">
              <Link
                to="/"
                className={`rounded-2xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted ${isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className={`rounded-2xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted ${isActive("/properties") ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                onClick={closeMenu}
              >
                Properties
              </Link>
              <div className="space-y-1 rounded-2xl bg-muted/50 p-3">
                <Link to="/properties?type=for-sale" className="block text-sm text-muted-foreground hover:text-accent" onClick={closeMenu}>
                  For Sale
                </Link>
                <Link to="/properties?type=for-rent" className="block text-sm text-muted-foreground hover:text-accent" onClick={closeMenu}>
                  For Rent
                </Link>
                <Link to="/properties?type=new" className="block text-sm text-muted-foreground hover:text-accent" onClick={closeMenu}>
                  New Listings
                </Link>
                <Link to="/properties?type=luxury" className="block text-sm text-muted-foreground hover:text-accent" onClick={closeMenu}>
                  Luxury Homes
                </Link>
              </div>

              {(user?.role_id === 5 || !user) && (
                <>
                  <Link
                    to="/agents"
                    className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/agents") ? "text-accent" : "text-foreground"}`}
                    onClick={closeMenu}
                  >
                    Agents
                  </Link>
                  <div className="pl-3 border-l border-border space-y-2">
                    <Link to="/agents/top" className="block text-sm text-muted-foreground hover:text-accent" onClick={closeMenu}>
                      Top Rated Agents
                    </Link>
                  </div>
                </>
              )}

              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/about") ? "text-accent" : "text-foreground"}`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/contact") ? "text-accent" : "text-foreground"}`}
                onClick={closeMenu}
              >
                Contact
              </Link>

              {user && (
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname.startsWith("/dashboard") ? "text-accent" : "text-foreground"
                    }`}
                  onClick={closeMenu}
                >
                  {user.role_id === 1 || user.role_id === 2 ? "Admin" : "Dashboard"}
                </Link>
              )}

              {/* Mobile Auth */}
              <div className="mt-2 border-t border-border pt-4">
                <div className="mb-4">
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Link to="/profile" className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4" />
                        <span>{user.name}</span>
                      </Link>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
                      {loading ? (
                        <>
                          <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full"></span>
                          Logging out...
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/auth/login" onClick={closeMenu}>
                        <Button variant="ghost" size="sm" className="w-full justify-start rounded-2xl cursor-pointer">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth/register" onClick={closeMenu}>
                        <Button size="sm" className="w-full rounded-2xl cursor-pointer">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
