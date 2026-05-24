import ReactGA from "react-ga4"

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
const allowLocalAnalytics = import.meta.env.VITE_GA_ENABLE_LOCAL === "true"
const isLocalDevelopment = import.meta.env.DEV && !allowLocalAnalytics

let isInitialized = false

const shouldTrack = () => Boolean(measurementId) && !isLocalDevelopment

const normalizePropertyAnalytics = (property = {}) => ({
  property_id: property.id || property.property_id || "",
  property_title: property.title || property.property_title || "",
  city: property.city || "",
  property_type: property.property_type || property.type || "",
  listing_type: property.listing_type || property.status || "",
  price: Number(property.price) || 0,
})

const trackEvent = (name, property) => {
  if (!initGA()) return

  ReactGA.event(name, normalizePropertyAnalytics(property))
}

export const initGA = () => {
  if (isInitialized) return true
  if (!shouldTrack()) return false

  ReactGA.initialize(measurementId)
  isInitialized = true

  return true
}

export const trackPageView = (path) => {
  if (!initGA()) return

  ReactGA.send({
    hitType: "pageview",
    page: path,
  })
}

export const trackPropertyView = (property) => {
  trackEvent("property_view", property)
}

export const trackContactSeller = (property) => {
  trackEvent("contact_seller", property)
}

export const trackInquirySubmit = (property) => {
  trackEvent("inquiry_submit", property)
}

export const trackFavoriteProperty = (property) => {
  trackEvent("favorite_property", property)
}
