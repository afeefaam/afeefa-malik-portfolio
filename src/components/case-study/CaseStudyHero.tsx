import type { Project } from '../../data/projects.types'
import { Bounded } from '../home/Bounded'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

interface CaseStudyHeroProps {
  project: Project
}

/**
 * Case study hero — large title, a one-line description, and a large hero
 * image directly below, matching the reference. Kept in the same blush/
 * graphite language as the rest of the site instead of the old editorial
 * ink/sage palette.
 */
export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  // Deliberately not falling back to coverImage.src here — the homepage
  // card crop and the case study's wide (21:9) banner are rarely the same
  // shot, so a hero image only appears once heroImage is explicitly set.
  const banner = project.heroImage ?? { ...project.coverImage, src: null }

  return (
    <header className="pt-10 pb-8 sm:pt-14 sm:pb-10">
      <Bounded>
        <RevealOnScroll className="flex max-w-3xl flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-graphite-soft">
            {project.tags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < project.tags.length - 1 && <span className="ml-2.5 text-blush-300">·</span>}
              </span>
            ))}
            <span className="text-blush-300">·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] text-blush-500 sm:text-[3.5rem]">
            {project.title}
          </h1>
          <p className="text-lg text-graphite">{project.tagline}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-8 sm:mt-10">
          {banner.src ? (
            banner.fit === 'contain' ? (
              <div className="flex aspect-[3/2] w-full items-center justify-center rounded-2xl bg-blush-50 shadow-soft sm:aspect-[21/9]">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  fetchPriority="high"
                  className="h-full rounded-xl object-contain py-4"
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
                className="aspect-[3/2] w-full rounded-2xl object-cover shadow-soft sm:aspect-[21/9]"
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
      </Bounded>
    </header>
  )
}
