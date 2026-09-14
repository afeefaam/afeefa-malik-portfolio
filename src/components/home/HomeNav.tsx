import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { socialLinks } from '../../data/siteContent'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToSection } from '../../lib/scrollToSection'
import { cn } from '../../lib/cn'

const resumeHref = socialLinks.find((l) => l.label === 'Resume')?.href ?? '#'

const LINKS = [
  { label: 'Projects', target: 'projects' as const },
  { label: 'Work', target: 'experience' as const },
  { label: 'About', target: 'about' as const },
  { label: 'Resume', target: 'resume' as const },
]

// Only the real homepage sections participate in the scrollspy — "resume"
// is an external link, not a section to detect.
const SECTION_IDS = LINKS.map((l) => l.target).filter((t) => t !== 'resume')

/**
 * Top navigation — one nav element, exactly two visual states, no stage in
 * between (`compact` is a plain boolean, not an interpolated scroll value).
 *
 *  - Default: only at `scrollY <= 0` — pixel-for-pixel the original
 *    pre-sticky bar, full width, flush against the card with zero padding
 *    around it, `rounded-t-card` so its corners match the card's, no
 *    shadow. It must never look like a floating card of its own.
 *  - Compact: as soon as the user scrolls at all (`scrollY > 0`), it
 *    condenses into a smaller, fully-rounded floating pill with margin on
 *    every side. The trigger is a plain scroll-position threshold — not
 *    hero visibility, not route type — so it reacts the instant scrolling
 *    starts and behaves identically on the homepage and every case study
 *    page.
 *
 * `<header>` is the sticky positioning wrapper (its own padding is what
 * creates — or removes — the pill's floating margin); the visual
 * shape/background live on the `<nav>` inside it. On the homepage, links
 * smooth-scroll to their section and the current one reads subtly bolder;
 * anywhere else they navigate back to "/#section" (`useScrollToHash` on
 * HomePage finishes the scroll once the sections have mounted there).
 * Sticky at `top: 0` on every page so it stays reachable while scrolling.
 */
export function HomeNav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const reducedMotion = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(isHome ? SECTION_IDS : [])

  // Same scroll-based trigger on every page — homepage and case studies
  // alike start in the default state and switch to the pill the instant
  // scrolling begins. No route-based override.
  const [compact, setCompact] = useState(window.scrollY > 0)

  // A layout effect, not a plain effect: on a client-side route change
  // `window.scrollY` still holds the previous page's scroll position for
  // this component's very first render (ScrollToTop resets it, but only
  // once its own effect runs). Reading it back here, before the browser
  // paints, corrects `compact` in the same tick as that reset instead of
  // painting one wrong frame first.
  useLayoutEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function go(target: string) {
    return (e: React.MouseEvent) => {
      setOpen(false)
      if (target === 'resume') return
      e.preventDefault()
      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
        return
      }
      scrollToSection(target, reducedMotion)
    }
  }

  const linkClass = 'text-[15px] text-white/90 transition-colors hover:text-white lg:text-base'
  const activeLinkClass = 'font-semibold text-white underline decoration-white/60 underline-offset-4'
  const mobileLinkClass = 'flex min-h-11 items-center text-[15px] text-white'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[padding] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
        // Default state: zero padding on every side — the nav sits flush
        // against the card's edges, exactly like the original (pre-sticky)
        // bar. Compact state: the gutter that lets the pill float with
        // margin around it. Nothing in between the two.
        compact && 'px-4 pb-3 pt-3 sm:px-6 sm:pb-4 sm:pt-4 lg:px-10',
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex w-full items-center justify-between bg-blush-400 transition-[max-width,height,padding,border-radius,box-shadow,transform] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
          // The translate is a small extra "lift" on top of the padding
          // gutter above — it's what makes the shrink read as floating
          // upward into place rather than just resizing in the same spot.
          compact
            ? 'h-14 max-w-[1040px] -translate-y-1 rounded-[9999px] px-5 shadow-[0_14px_30px_-16px_rgba(150,70,70,0.45)] sm:h-16 sm:px-6 lg:px-8'
            : 'h-16 max-w-[1200px] translate-y-0 rounded-t-card px-6 shadow-none sm:h-[76px] sm:px-10 lg:px-16',
        )}
      >
        {isHome ? (
          <a
            href="#top"
            onClick={go('top')}
            className="font-display text-lg font-semibold tracking-wide text-white"
          >
            AM
          </a>
        ) : (
          <Link to="/" className="font-display text-lg font-semibold tracking-wide text-white">
            AM
          </Link>
        )}

        <ul className="hidden items-center gap-8 md:flex lg:gap-11">
          {LINKS.map((link) => {
            const isActive = isHome && link.target !== 'resume' && activeId === link.target
            return (
            <li key={link.label} className="relative">
              {link.target === 'resume' ? (
                <a href={resumeHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                </a>
              ) : isHome ? (
                <a
                  href={`#${link.target}`}
                  onClick={go(link.target)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(linkClass, isActive && activeLinkClass)}
                >
                  {link.label}
                </a>
              ) : (
                <Link to={{ pathname: '/', hash: `#${link.target}` }} className={linkClass}>
                  {link.label}
                </Link>
              )}
              {link.label === 'About' && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute -right-3.5 -top-1.5 h-3.5 w-3.5"
                >
                  <path
                    d="M11 1a7 7 0 1 0 0 14A5.6 5.6 0 0 1 11 1Z"
                    fill="#E9A886"
                  />
                </svg>
              )}
            </li>
            )
          })}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="home-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-white md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={cn('absolute left-0 top-0 block h-[2px] w-full bg-current transition-transform duration-300', open && 'translate-y-[7px] rotate-45')} />
            <span className={cn('absolute bottom-0 left-0 block h-[2px] w-full bg-current transition-transform duration-300', open && '-translate-y-[7px] -rotate-45')} />
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="home-mobile-nav"
          className="mx-auto mt-2 max-w-[1160px] rounded-[28px] bg-blush-400 shadow-[0_14px_30px_-16px_rgba(150,70,70,0.45)] md:hidden"
        >
          <ul className="flex flex-col px-6 py-2">
            {LINKS.map((link) => {
              const isActive = isHome && link.target !== 'resume' && activeId === link.target
              return (
              <li key={link.label}>
                {link.target === 'resume' ? (
                  <a href={resumeHref} target="_blank" rel="noopener noreferrer" className={mobileLinkClass}>
                    {link.label}
                  </a>
                ) : isHome ? (
                  <a
                    href={`#${link.target}`}
                    onClick={go(link.target)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(mobileLinkClass, isActive && 'font-semibold underline decoration-white/60 underline-offset-4')}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={{ pathname: '/', hash: `#${link.target}` }}
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
