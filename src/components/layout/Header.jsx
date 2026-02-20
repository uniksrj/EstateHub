"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { Building2, Menu, X, User, LogOut, Home, Phone, Users, Info, ChevronDown } from "lucide-react"
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
  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl">EstateHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${isActive("/") ? "text-accent" : "text-foreground"
                }`}
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
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${isActive("/properties") ? "text-accent" : "text-foreground"
                  }`}
              >
                <Building2 className="h-4 w-4 mr-1" /> Properties
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>

              {/* dropdown uses theme variable --popover for background so it matches theme */}
              <div
                id="properties-menu"
                role="menu"
                className={`absolute left-0 top-full w-48 rounded-lg shadow-md ring-1 ring-black/6 border border-border z-50 transform transition duration-150 origin-top-left
                  ${openDropdown === "properties" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                style={{ backgroundColor: "var(--popover)" }}
              >
                <Link to="/properties?type=for-sale" className="block px-4 py-2 text-sm text-foreground hover:text-accent" role="menuitem">
                  For Sale
                </Link>
                <Link to="/properties?type=for-rent" className="block px-4 py-2 text-sm text-foreground hover:text-accent" role="menuitem">
                  For Rent
                </Link>
                <Link to="/properties?type=new" className="block px-4 py-2 text-sm text-foreground hover:text-accent" role="menuitem">
                  New Listings
                </Link>
                <Link to="/properties?type=luxury" className="block px-4 py-2 text-sm text-foreground hover:text-accent" role="menuitem">
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
              <>
                {user.role_id === 1 || user.role === 2 ? (
                  <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname.startsWith("/dashboard") ? "text-accent" : "text-foreground"}`}>
                    Admin
                  </Link>
                ) : (
                  <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname.startsWith(`/${user.role_id}`) ? "text-accent" : "text-foreground"}`}>
                    Dashboard
                  </Link>
                )}
              </>
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
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${isActive("/agents") ? "text-accent" : "text-foreground"
                    }`}
                >
                  <Users className="h-4 w-4 mr-1" /> Agents
                  <ChevronDown className="h-3 w-3 ml-1" />
                </button>

                <div
                  id="agents-menu"
                  role="menu"
                  className={`absolute left-0 top-full w-48 rounded-lg shadow-md ring-1 ring-black/6 border border-border z-50 transform transition duration-150 origin-top-left
                  ${openDropdown === "agents" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                  style={{ backgroundColor: "var(--popover)" }}
                >
                  <Link to="/agents" className="block px-4 py-2 text-sm text-foreground hover:text-accent" role="menuitem">
                    Find an Agent
                  </Link>
                  <Link to="/agents/top" className="block px-4 py-2 text-sm text-foreground hover:text-accent" role="menuitem">
                    Top Rated Agents
                  </Link>
                </div>
              </div>
            )
            }
            <Link to="/about" className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${isActive("/about") ? "text-accent" : "text-foreground"}`}>
              <Info className="h-4 w-4 mr-1" /> About
            </Link>

            <Link
              to="/contact"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${isActive("/contact") ? "text-accent" : "text-foreground"
                }`}
            >
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/") ? "text-accent" : "text-foreground"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/properties") ? "text-accent" : "text-foreground"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname.startsWith("/dashboard") ? "text-accent" : "text-foreground"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border">
                <div className="mb-4">
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
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
                    <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full cursor-pointer">
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
