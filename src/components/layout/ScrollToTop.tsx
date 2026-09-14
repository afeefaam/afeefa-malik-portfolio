import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenisInstance } from '../../lib/lenis'

/**
 * React Router preserves scroll position across navigations by default.
 * This restores normal site behavior: every route change starts at the
 * top of the page, except when the new URL carries a hash (e.g. clicking
 * a nav link back to "/#about") — useScrollToHash owns that case instead.
 *
 * A layout effect, not a plain effect, and rendered ahead of the routed
 * page in the tree: that resets the scroll position before the browser's
 * first paint of the new page, so anything downstream that reads
 * `window.scrollY` on mount (e.g. HomeNav's compact-pill trigger) sees the
 * corrected value instead of the previous page's leftover scroll for one
 * visible frame.
 *
 * Goes through the Lenis instance (when mounted) rather than a raw
 * `window.scrollTo` — Lenis drives scroll from its own animated internal
 * target, so a native scrollTo call gets overwritten by Lenis's next raf
 * tick and the page silently drifts back toward wherever Lenis last
 * thought it was, instead of actually landing at the top.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
