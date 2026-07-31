import type { CaseStudySection as CaseStudySectionType } from '../../data/projects.types'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { ContentBlockRenderer } from './ContentBlockRenderer'

interface CaseStudySectionProps {
  section: CaseStudySectionType
  index: number
}

// Insights and Reflection are the story's "pause and consider" beats —
// giving them a quiet highlighted card breaks the otherwise identical
// heading/paragraph rhythm every other section shares.
const HIGHLIGHTED_TYPES = new Set(['insights', 'reflection'])

export function CaseStudySection({ section, index }: CaseStudySectionProps) {
  const isHighlighted = HIGHLIGHTED_TYPES.has(section.type)

  return (
    <section id={section.type} className="scroll-mt-28 py-stack-md">
      <RevealOnScroll
        className={
          isHighlighted
            ? 'flex flex-col gap-stack-sm rounded-lg bg-sunken p-stack-sm'
            : 'flex flex-col gap-stack-sm'
        }
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-sm text-lavender-deep">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="font-display text-display-3 text-ink">{section.heading}</h2>
        </div>
        <div className="flex flex-col gap-stack-sm">
          {section.blocks.map((block, blockIndex) => (
            <ContentBlockRenderer key={blockIndex} block={block} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
