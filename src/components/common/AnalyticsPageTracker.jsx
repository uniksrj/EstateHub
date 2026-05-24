import { useEffect } from "react"
import { useLocation } from "react-router"
import { trackPageView } from "@/utils/analytics"

const PRIVATE_ROUTE_PREFIXES = [
  "/admin",
  "/super-admin",
  "/seller",
  "/buyer",
  "/agent",
  "/investor",
  "/dashboard",
]

const PUBLIC_LISTING_ROUTES = [
  /^\/properties\/?$/,
  /^\/properties\/[^/]+\/?$/,
  /^\/properties\/[^/]+\/view\/?$/,
  /^\/property\/[^/]+\/?$/,
  /^\/buy\/?$/,
  /^\/rent\/?$/,
  /^\/commercial\/?$/,
]

const isPrivateRoute = (pathname) =>
  PRIVATE_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

const isPublicListingRoute = (pathname) =>
  !isPrivateRoute(pathname) && PUBLIC_LISTING_ROUTES.some((route) => route.test(pathname))

const AnalyticsPageTracker = () => {
  const location = useLocation()

  useEffect(() => {
    if (!isPublicListingRoute(location.pathname)) return

    trackPageView(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return null
}

export default AnalyticsPageTracker
