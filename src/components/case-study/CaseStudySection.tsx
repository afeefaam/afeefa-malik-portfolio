import { cn } from '../../lib/cn'
import type { CaseStudySection as CaseStudySectionType } from '../../data/projects.types'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { ContentBlockRenderer } from './ContentBlockRenderer'

interface CaseStudySectionProps {
  section: CaseStudySectionType
  index: number
}

// Reflection is the story's closing beat — a filled blush card with
// contrasting white text, distinct from every other section's plain
// heading-and-paragraph rhythm, matching the reference.
const HIGHLIGHTED_TYPES = new Set(['reflection'])

export function CaseStudySection({ section }: CaseStudySectionProps) {
  const isHighlighted = HIGHLIGHTED_TYPES.has(section.type)

  return (
    <section id={section.type} className="scroll-mt-[calc(var(--nav-height)+24px)] py-8 sm:py-10">
      <RevealOnScroll
        className={cn(
          'flex flex-col gap-4',
          isHighlighted &&
            'rounded-2xl bg-blush-500 p-6 text-white shadow-soft sm:p-10 [&_h3]:text-white [&_li]:text-white/90 [&_p]:text-white/90',
        )}
      >
        <h2
          className={cn(
            'font-display text-[1.75rem] font-semibold sm:text-[2.25rem]',
            isHighlighted ? 'text-white' : 'text-blush-500',
          )}
        >
          {section.heading}
        </h2>
        <div className="flex flex-col gap-4">
          {section.blocks.map((block, blockIndex) => (
            <ContentBlockRenderer key={blockIndex} block={block} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
