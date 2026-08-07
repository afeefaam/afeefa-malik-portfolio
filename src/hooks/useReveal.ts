import { useInView } from 'react-intersection-observer'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface UseRevealOptions {
  /** Fire once and stop observing, or keep tracking in/out of view. */
  once?: boolean
  /** Same shape as IntersectionObserver's rootMargin, e.g. '-80px'. */
  margin?: string
}

/**
 * Lightweight viewport-visibility hook for cases that need a plain inView
 * boolean without pulling in motion — lazy-mounting non-animated content,
 * or driving a CSS-only transition/class toggle.
 *
 * For animated scroll reveals, prefer RevealOnScroll/RevealGroup instead —
 * they already handle this via motion's own whileInView tracking, and
 * mixing two different viewport-detection systems for the same kind of
 * job is exactly the duplication this hook should not add.
 *
 * Under prefers-reduced-motion, `inView` reports true immediately rather
 * than waiting on scroll position, so gated content isn't left permanently
 * hidden for someone who can't trigger a scroll-based reveal as expected.
 */
export function useReveal({ once = true, margin = '-80px' }: UseRevealOptions = {}) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: once, rootMargin: margin })

  return { ref, inView: reducedMotion ? true : inView }
}
