import { experience } from '../../data/siteContent'
import { RevealGroup } from '../motion/RevealGroup'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { ExperienceTimelineItem } from './ExperienceTimelineItem'

export function Experience() {
  return (
    <section id="experience" className="py-stack-xl">
      <Container>
        <SectionHeading eyebrow="Experience" title="Where I've worked and learned." />

        <RevealGroup as="ul" className="mt-stack-lg flex max-w-3xl flex-col divide-y divide-border">
          {experience.map((entry, index) => (
            <ExperienceTimelineItem
              key={`${entry.role}-${entry.org}`}
              entry={entry}
              index={index}
            />
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
