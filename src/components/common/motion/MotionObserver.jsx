import { useEffect } from "react"
import { useLocation } from "react-router"

/** Adds a restrained, one-time reveal to semantic content sections.
 * Content remains visible by default; unsupported browsers and reduced-motion
 * users simply skip the transform rather than depending on JavaScript to reveal it.
 */
const MotionObserver = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion || !("IntersectionObserver" in window)) return undefined

    const revealTargets = Array.from(document.querySelectorAll("main section, body > #root footer"))
    if (!revealTargets.length) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in-view")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" })

    revealTargets.forEach((target) => {
      target.classList.add("motion-reveal")
      observer.observe(target)
    })

    return () => {
      observer.disconnect()
      revealTargets.forEach((target) => target.classList.remove("motion-reveal", "is-in-view"))
    }
  }, [pathname])

  return null
}

export default MotionObserver
