import type { CaseStudySection } from '../../data/projects.types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToSection } from '../../lib/scrollToSection'

interface CaseStudySectionNavProps {
  sections: CaseStudySection[]
}

/**
 * "On this page" wayfinding. Sticky glass sidebar at md+; below that it's
 * never sticky (nothing here is, at any size below md — the case study
 * grid itself only goes two-column at md), and collapses into a native
 * <details> disclosure so it's still available without permanently taking
 * up space above the content on a small screen.
 */
export function CaseStudySectionNav({ sections }: CaseStudySectionNavProps) {
  const ids = sections.map((section) => section.type)
  const activeId = useActiveSection(ids)
  const reducedMotion = usePrefersReducedMotion()

  if (sections.length === 0) return null

  const items = sections.map((section) => {
    const isActive = activeId === section.type
    return (
      <li key={section.type}>
        <a
          href={`#${section.type}`}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(section.type, reducedMotion)
          }}
          aria-current={isActive ? 'true' : undefined}
          className={`block border-l-2 py-1.5 pl-3 text-sm transition-colors ${
            isActive ? 'border-lavender-deep font-medium text-ink' : 'border-border text-ink-soft hover:text-ink'
          }`}
        >
          {section.heading}
        </a>
      </li>
    )
  })

  return (
    <>
      <details className="group rounded-lg border border-lavender/20 bg-surface/60 shadow-soft-sm lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-stack-xs py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          On this page
          <span aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180">
            ↓
          </span>
        </summary>
        <ul className="flex flex-col gap-0.5 px-stack-xs pb-stack-xs">{items}</ul>
      </details>

      <nav
        aria-label="Case study sections"
        className="hidden rounded-lg border border-lavender/20 bg-surface/60 p-stack-xs shadow-soft-sm backdrop-blur-md lg:block"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">On this page</span>
        <ul className="mt-stack-xs flex flex-col gap-0.5">{items}</ul>
      </nav>
    </>
  )
}
