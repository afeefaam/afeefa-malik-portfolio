import { publishedProjects } from '../../data/projects'
import { RevealGroup, RevealGroupItem } from '../motion/RevealGroup'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'

/**
 * Asymmetric editorial grid: alternates a wider and a narrower card so any
 * project count lays out without hand-authored per-card markup. A trailing
 * odd item (uneven project count) gets a full-width closer instead of an
 * orphaned half-empty row.
 */
function layoutFor(index: number, total: number) {
  const isTrailingOrphan = total % 2 === 1 && index === total - 1
  if (isTrailingOrphan) return { span: 'md:col-span-12', aspect: '16 / 7' }
  return index % 2 === 0
    ? { span: 'md:col-span-7', aspect: '4 / 3' }
    : { span: 'md:col-span-5', aspect: '4 / 5' }
}

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 py-stack-xl">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="A few projects worth a closer look."
          subtitle="Each one starts from a specific, real problem. The case studies walk through how I got from that problem to the interface."
        />

        <RevealGroup as="div" className="mt-stack-lg grid grid-cols-1 gap-x-stack-md gap-y-stack-lg md:grid-cols-12">
          {publishedProjects.map((project, index) => {
            const { span, aspect } = layoutFor(index, publishedProjects.length)
            const isLead = index === 0
            return (
              <RevealGroupItem key={project.id} className={`${span} ${isLead ? 'relative' : ''}`}>
                {isLead && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-lavender/20 blur-3xl"
                  />
                )}
                <ProjectCard project={project} aspectRatio={aspect} />
              </RevealGroupItem>
            )
          })}
        </RevealGroup>
      </Container>
    </section>
  )
}
