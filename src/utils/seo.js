export const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "")

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

export const buildPropertyPath = (property) => (
  `/properties/${property?.slug || property?.id}/view`
)

export const truncateMeta = (value = "", maxLength = 160) => {
  const text = String(value).replace(/\s+/g, " ").trim()
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}...` : text
}

export const getImageUrl = (image, transformation = "f_auto,q_auto") => {
  const source = typeof image === "string"
    ? image
    : image?.optimized_url || image?.cloudinary_secure_url || image?.image_path || image?.url

  if (!source) return "/placeholder.svg"
  if (!source.includes("res.cloudinary.com") || source.includes(`/upload/${transformation}/`)) {
    return source
  }

  return source.replace("/upload/", `/upload/${transformation}/`)
}

export const propertyImageUrl = (property, transformation = "f_auto,q_auto,c_fill,w_1200,h_630") => (
  getImageUrl(property?.images?.[0], transformation)
)

export const propertyLocation = (property) => (
  [property?.address, property?.city, property?.state, property?.zip_code].filter(Boolean).join(", ")
)

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Estate Hub",
  url: siteUrl,
}
