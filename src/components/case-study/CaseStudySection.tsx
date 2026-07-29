import type { CaseStudySection as CaseStudySectionType } from '../../data/projects.types'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { ContentBlockRenderer } from './ContentBlockRenderer'

interface CaseStudySectionProps {
  section: CaseStudySectionType
}

export function CaseStudySection({ section }: CaseStudySectionProps) {
  return (
    <section className="py-stack-md">
      <Container>
        <RevealOnScroll className="flex flex-col gap-stack-sm">
          <h2 className="font-display text-display-3 text-ink">{section.heading}</h2>
          <div className="flex flex-col gap-stack-sm">
            {section.blocks.map((block, index) => (
              <ContentBlockRenderer key={index} block={block} />
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
