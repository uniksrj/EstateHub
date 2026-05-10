import { useEffect } from "react"
import { absoluteUrl, truncateMeta } from "@/utils/seo"

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", rel)
    document.head.appendChild(element)
  }
  element.setAttribute("href", href)
}

const Seo = ({ title, description, canonicalPath, image, type = "website", schema }) => {
  useEffect(() => {
    const metaTitle = title ? `${title} | Estate Hub` : "Estate Hub"
    const metaDescription = truncateMeta(description || "Find homes, apartments, condos, and investment properties with Estate Hub.")
    const canonical = absoluteUrl(canonicalPath || window.location.pathname)
    const imageUrl = image ? absoluteUrl(image) : absoluteUrl("/building.svg")

    document.title = metaTitle
    setMeta('meta[name="description"]', { name: "description", content: metaDescription })
    setLink("canonical", canonical)

    setMeta('meta[property="og:title"]', { property: "og:title", content: metaTitle })
    setMeta('meta[property="og:description"]', { property: "og:description", content: metaDescription })
    setMeta('meta[property="og:type"]', { property: "og:type", content: type })
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical })
    setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl })

    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" })
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: metaTitle })
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: metaDescription })
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl })

    let schemaElement = document.head.querySelector("#estate-hub-schema")
    if (schema) {
      if (!schemaElement) {
        schemaElement = document.createElement("script")
        schemaElement.id = "estate-hub-schema"
        schemaElement.type = "application/ld+json"
        document.head.appendChild(schemaElement)
      }
      schemaElement.textContent = JSON.stringify(schema)
    } else {
      schemaElement?.remove()
    }
  }, [title, description, canonicalPath, image, type, schema])

  return null
}

export default Seo
