import type { CaseStudySection } from '../../data/projects.types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToSection } from '../../lib/scrollToSection'

interface CaseStudySectionNavProps {
  sections: CaseStudySection[]
}

/** Sticky glass "on this page" nav — wayfinding for the case study itself. */
export function CaseStudySectionNav({ sections }: CaseStudySectionNavProps) {
  const ids = sections.map((section) => section.type)
  const activeId = useActiveSection(ids)
  const reducedMotion = usePrefersReducedMotion()

  if (sections.length === 0) return null

  return (
    <nav
      aria-label="Case study sections"
      className="hidden rounded-lg border border-lavender/20 bg-surface/60 p-stack-xs shadow-soft-sm backdrop-blur-md md:block"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
        On this page
      </span>
      <ul className="mt-stack-xs flex flex-col gap-0.5">
        {sections.map((section) => {
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
                  isActive
                    ? 'border-lavender-deep font-medium text-ink'
                    : 'border-border text-ink-soft hover:text-ink'
                }`}
              >
                {section.heading}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
