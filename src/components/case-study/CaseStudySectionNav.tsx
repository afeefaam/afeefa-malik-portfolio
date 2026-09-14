import { useRef, useState } from 'react'
import type { CaseStudySection } from '../../data/projects.types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToSection } from '../../lib/scrollToSection'

interface CaseStudySectionNavProps {
  sections: CaseStudySection[]
}

// How long a clicked link "wins" over the scrollspy before handing control
// back to it — long enough to cover the smooth-scroll animation, short
// enough that normal scrolling right after still updates the active state.
const CLICK_OVERRIDE_MS = 900

/**
 * "On this page" wayfinding — a second filled blush card matching the
 * reference, with a rail down the left edge and a dot marking the active
 * section. Sticky alongside the meta card at lg+; below that it collapses
 * into a native <details> disclosure so it's still reachable without
 * permanently taking up space above the content on a small screen.
 */
export function CaseStudySectionNav({ sections }: CaseStudySectionNavProps) {
  const ids = sections.map((section) => section.type)
  const observedActive = useActiveSection(ids)
  const reducedMotion = usePrefersReducedMotion()

  // The scrollspy only recognizes a section once it nears the vertical
  // center of the viewport, but a click scrolls the section to the top —
  // without this, clicking a link briefly (or, for a short section,
  // permanently) highlights its neighbor instead of the one just clicked.
  const [pendingActive, setPendingActive] = useState<string | null>(null)
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const activeId = pendingActive ?? observedActive

  if (sections.length === 0) return null

  function goToSection(type: string) {
    setPendingActive(type)
    scrollToSection(type, reducedMotion)
    window.clearTimeout(releaseTimer.current)
    releaseTimer.current = setTimeout(() => setPendingActive(null), CLICK_OVERRIDE_MS)
  }

  const items = sections.map((section) => {
    const isActive = activeId === section.type
    return (
      <li key={section.type} className="relative">
        {isActive && (
          <span aria-hidden="true" className="absolute -left-[17px] top-[9px] h-1.5 w-1.5 rounded-full bg-white" />
        )}
        <a
          href={`#${section.type}`}
          onClick={(e) => {
            e.preventDefault()
            goToSection(section.type)
          }}
          aria-current={isActive ? 'true' : undefined}
          className={`block py-1.5 text-sm transition-colors ${
            isActive ? 'font-semibold text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          {section.heading}
        </a>
      </li>
    )
  })

  return (
    <>
      <details className="group rounded-2xl bg-blush-500 shadow-soft-sm lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">
          On this page
          <span aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180">
            ↓
          </span>
        </summary>
        <ul className="ml-5 flex flex-col gap-0.5 border-l border-white/25 py-1 pb-4 pl-4 pr-5">{items}</ul>
      </details>

      <nav aria-label="Case study sections" className="hidden rounded-2xl bg-blush-500 p-6 shadow-soft-sm lg:block">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">On this page</span>
        <ul className="mt-4 flex flex-col gap-0.5 border-l border-white/25 pl-4">{items}</ul>
      </nav>
    </>
  )
}
