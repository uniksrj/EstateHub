import { useEffect } from "react"
import { useLocation } from "react-router"

const revealSelector = [
  "main section",
  "main article",
  "main form",
  "main [data-motion='reveal']",
  "main table tbody tr",
  "footer .site-footer__lead",
  "footer .site-footer__grid > div",
].join(",")

/** One-shot, fail-visible reveals for route content and asynchronously added UI. */
const MotionObserver = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (media?.matches || !("IntersectionObserver" in window)) return undefined

    const routeContent = document.querySelector("main .route-content")
    if (!routeContent) return undefined

    const observed = new Set()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in-view")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.06, rootMargin: "0px 0px -5% 0px" })

    let rafId = null

    const register = (element, index) => {
      if (!(element instanceof HTMLElement) || observed.has(element)) return
      observed.add(element)
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 45}ms`)
      element.classList.add("motion-reveal")
      observer.observe(element)
    }

    const scan = (root) => {
      const candidates = []
      if (root instanceof HTMLElement && root.matches(revealSelector)) candidates.push(root)
      if (root.querySelectorAll) candidates.push(...root.querySelectorAll(revealSelector))
      candidates.forEach(register)
    }

    // Schedule initial scan in requestAnimationFrame so React mount finishes first
    rafId = requestAnimationFrame(() => {
      scan(routeContent)
      document.querySelectorAll("footer .site-footer__lead, footer .site-footer__grid > div").forEach(register)
    })

    const pendingNodes = []
    let mutationRafId = null

    const flushPending = () => {
      mutationRafId = null
      while (pendingNodes.length > 0) {
        const node = pendingNodes.shift()
        if (node instanceof HTMLElement && node.isConnected) {
          scan(node)
        }
      }
    }

    const additions = new MutationObserver((records) => {
      let hasNodes = false
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            pendingNodes.push(node)
            hasNodes = true
          }
        })
      })
      if (hasNodes && !mutationRafId) {
        mutationRafId = requestAnimationFrame(flushPending)
      }
    })
    additions.observe(routeContent, { childList: true, subtree: true })

    const showContentImmediately = () => {
      if (!media?.matches) return
      observed.forEach((element) => element.classList.add("is-in-view"))
    }
    media?.addEventListener?.("change", showContentImmediately)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (mutationRafId) cancelAnimationFrame(mutationRafId)
      additions.disconnect()
      observer.disconnect()
      media?.removeEventListener?.("change", showContentImmediately)
    }
  }, [pathname])

  return null
}

export default MotionObserver
