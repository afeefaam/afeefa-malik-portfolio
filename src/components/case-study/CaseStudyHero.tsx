import type { Project } from '../../data/projects.types'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Tag } from '../ui/Tag'

interface CaseStudyHeroProps {
  project: Project
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  // Deliberately not falling back to coverImage.src here — the homepage
  // card crop and the case study's wide (21:9) banner are rarely the same
  // shot, so a hero image only appears once heroImage is explicitly set.
  const banner = project.heroImage ?? { ...project.coverImage, src: null }

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
          {banner.src ? (
            banner.fit === 'contain' ? (
              <div className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-sunken shadow-soft sm:aspect-[21/9]">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  fetchPriority="high"
                  className="h-full rounded-lg object-contain py-stack-xs"
                />
              </div>
            ) : (
              // 21:9 reads as too shallow a strip on phone widths, so mobile
              // gets a taller 3:2 crop of the same (already 21:9-cropped)
              // source image — a real trade-off (some side content is lost
              // to keep the center legible), not a redesign of the asset.
              <img
                src={banner.src}
                alt={banner.alt}
                fetchPriority="high"
                className="aspect-[3/2] w-full rounded-xl object-cover shadow-soft sm:aspect-[21/9]"
              />
            )
          ) : (
            <ImagePlaceholder
              alt={banner.alt}
              tone={banner.tone}
              radius="xl"
              aspectRatio="21 / 9"
              className="shadow-soft"
            />
          )}
        </RevealOnScroll>
      </Container>
    </header>
  )
}
