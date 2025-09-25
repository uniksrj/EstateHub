"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { Building2, Menu, X, User, LogOut, Home, Phone } from "lucide-react"
import { Button } from "../ui/button"
import ThemeToggle from "../ThemeToggle"
import { useAuth } from "../../hooks/useAuth"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => location.pathname === path
//  const navItems = [
//     { href: "/", label: "Home", icon: Home },
//     { href: "/properties", label: "Properties", icon: Building2 },
//     { href: "/search", label: "Search", icon: Search },
//     { href: "/contact", label: "Contact", icon: Phone },
//   ]
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/") ? "text-accent" : "text-foreground"
              }`}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link
              to="/properties"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/properties") ? "text-accent" : "text-foreground"
              }`}
            >
              <Building2 className="h-4 w-4 mr-1" />
              Properties
            </Link>    
                      
            {user && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname.startsWith("/admin") ? "text-accent" : "text-foreground"
                }`}
              >
                Admin
              </Link>
            )}
                <Link
              to="/contact"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/contact") ? "text-accent" : "text-foreground"
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
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive("/") ? "text-accent" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive("/properties") ? "text-accent" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              {user && (
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    location.pathname.startsWith("/admin") ? "text-accent" : "text-foreground"
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
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
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
