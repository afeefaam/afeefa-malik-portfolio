import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../lib/scrollToSection'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Completes an in-page scroll after navigating to "/#section" from another
 * route — a plain anchor hash doesn't reliably re-trigger scroll once the
 * target sections exist post-route-transition, so this watches the hash and
 * scrolls once the DOM is ready.
 */
export function useScrollToHash() {
  const { hash } = useLocation()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    // Wait a frame so the homepage's sections have mounted.
    const raf = requestAnimationFrame(() => scrollToSection(id, reducedMotion))
    return () => cancelAnimationFrame(raf)
  }, [hash, reducedMotion])
}
