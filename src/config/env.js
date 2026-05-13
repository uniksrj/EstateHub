const trimTrailingSlash = (value = "") => String(value).replace(/\/+$/, "")

export const API_ORIGIN = trimTrailingSlash(import.meta.env.VITE_API_URL || "http://localhost:8000")
export const SITE_ORIGIN = trimTrailingSlash(import.meta.env.VITE_SITE_URL || window.location.origin)

export const toBackendAssetUrl = (path) => {
  if (!path) {
    return ""
  }

  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path
  }

  if (path.startsWith("/")) {
    return `${API_ORIGIN}${path}`
  }

  return `${API_ORIGIN}/storage/${path}`
}
