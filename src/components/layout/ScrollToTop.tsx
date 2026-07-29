import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router preserves scroll position across navigations by default.
 * This restores normal site behavior: every route change starts at the
 * top of the page, except when the new URL carries a hash (e.g. clicking
 * a nav link back to "/#about") — useScrollToHash owns that case instead.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
