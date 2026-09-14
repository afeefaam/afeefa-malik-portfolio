import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { getLenisInstance } from '../../lib/lenis'
import { cn } from '../../lib/cn'

// Appears once the reader has scrolled a meaningful amount, not the instant
// they nudge the page; hides again on the way back up before actually
// reaching the top, so it doesn't sit there doing nothing right next to the
// content it would scroll back to.
const SHOW_AFTER = 500
const HIDE_BELOW = 200

/**
 * Small fixed circular button, case-study pages only — floats bottom-right,
 * scrolls back to the top of the page. Deliberately icon-only (no "Back to
 * top" label): a full arrow-in-a-circle in the corner already reads
 * unambiguously, and this page has no other floating controls it could be
 * confused with.
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setVisible((prev) => (y > SHOW_AFTER ? true : y < HIDE_BELOW ? false : prev))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    // Same Lenis-aware pattern as ScrollToTop/scrollToSection: a plain
    // window.scrollTo gets fought by Lenis's own animated scroll target on
    // this site, so it has to be the one driving the scroll when it's
    // mounted.
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(0, { immediate: reducedMotion })
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blush-400 text-white shadow-[0_10px_24px_-10px_rgba(150,70,70,0.55)] transition-[opacity,transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-blush-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-500 motion-reduce:transition-none sm:bottom-6 sm:right-6',
        visible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
