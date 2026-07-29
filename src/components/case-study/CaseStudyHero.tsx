import type { Project } from '../../data/projects.types'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Tag } from '../ui/Tag'

interface CaseStudyHeroProps {
  project: Project
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <header className="pt-stack-lg pb-stack-lg">
      <Container>
        <RevealOnScroll className="flex max-w-3xl flex-col gap-stack-xs">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            <span className="text-sm text-ink-soft">{project.year}</span>
          </div>
          <h1 className="font-display text-display-2 text-ink md:text-display-1">
            {project.title}
          </h1>
          <p className="text-lg text-ink-soft">{project.tagline}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-stack-md">
          <ImagePlaceholder
            alt={project.coverImage.alt}
            tone={project.coverImage.tone}
            radius="xl"
            aspectRatio="21 / 9"
            className="shadow-soft"
          />
        </RevealOnScroll>
      </Container>
    </header>
  )
}
