import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Project } from '../../data/projects.types'
import { getProjectBySlug } from '../../data/projects'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Container } from '../ui/Container'
import { cn } from '../../lib/cn'
import { getRevealAnimation } from '../motion/presets'
import { fadeUp } from '../motion/variants'

const archiveProjects = ['markaz', 'close-the-curtain', 'failure-museum'].map(
  (slug) => getProjectBySlug(slug)!,
)

// Spine color ties each booklet to the project's existing `tone`, mapped
// onto the same plum/oak/walnut material palette as the rest of the
// redesign rather than the old sage/clay/lavender accent set.
const SPINE_COLOR: Record<string, string> = {
  lavender: 'var(--color-plum)',
  ink: 'var(--color-walnut)',
  clay: 'var(--color-oak)',
}

// Deliberate per-booklet variation — height, resting tilt, vertical seat on
// the shelf, and where the title/mark sit — so three objects built from the
// same component read as handled individually, not stamped from one card.
// Title and the tag/award mark both live on the cover itself now, never in
// a caption row beneath it — that row was the part that still read as UI.
const VARIANTS = [
  {
    heightClass: 'h-[360px] xl:h-[420px]',
    restRotate: 'rotate-[-2deg]',
    hoverRotate: 'group-hover:rotate-[-0.5deg] group-focus-visible:rotate-[-0.5deg]',
    seatClass: '',
    titleTreatment: 'bandBottom' as const,
    markPosition: 'bandBottom' as const,
  },
  {
    heightClass: 'h-[315px] xl:h-[365px]',
    restRotate: 'rotate-[1.5deg]',
    hoverRotate: 'group-hover:rotate-[0.5deg] group-focus-visible:rotate-[0.5deg]',
    seatClass: 'xl:translate-y-6',
    titleTreatment: 'bandTop' as const,
    markPosition: 'cornerBottomRight' as const,
  },
  {
    heightClass: 'h-[390px] xl:h-[452px]',
    restRotate: 'rotate-[-1deg]',
    hoverRotate: 'group-hover:rotate-[-2deg] group-focus-visible:rotate-[-2deg]',
    seatClass: 'xl:-translate-y-3',
    titleTreatment: 'cornerTopLeft' as const,
    markPosition: 'cornerBottomRight' as const,
  },
]

/**
 * The project archive — three bound proofs seated on a shallow shelf, not a
 * "Selected Work" grid. No heading announces it; the shift from Setlist's
 * oak worktable into this section's deeper walnut is the only transition
 * cue, the way moving to another part of the same room would feel. Each
 * booklet shares paper stock, binding logic, and typography with the
 * Setlist proof, but is portrait, modest, and individually seated — a
 * different kind of object, not a repeat of the opening artifact.
 */
export function ProjectArchive() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="work" className="relative scroll-mt-20 overflow-hidden py-stack-lg xl:py-stack-xl">
      <div
        aria-hidden="true"
        className="texture-wood absolute inset-0"
        style={{
          backgroundColor: 'var(--color-walnut)',
          backgroundImage:
            'linear-gradient(180deg, var(--color-oak) 0%, var(--color-walnut) 38%, var(--color-walnut) 100%), ' +
            'radial-gradient(48% 42% at 50% 88%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      <Container className="relative">
        {/* items-end: booklets share a bottom, the way real ones standing
            on a shelf would, rather than the default stretch/top-align
            that left dead air under the two shorter ones. */}
        <div
          className={
            'flex snap-x snap-mandatory items-end gap-5 overflow-x-auto pb-1 -mx-6 px-6 ' +
            'lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 lg:justify-between lg:gap-6 ' +
            'xl:gap-10'
          }
        >
          {archiveProjects.map((project, i) => (
            <Booklet
              key={project.id}
              project={project}
              variant={VARIANTS[i]}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* The shelf's own front edge. A contact-shadow band where the
            booklets actually meet the surface, then the lip itself: an
            inset highlight along its top (catching light the way a real
            wood edge would), darkening toward its underside, plus its own
            cast shadow beneath — dimensional, not a flat divider bar. */}
        <div aria-hidden="true" className="relative mt-1.5 xl:mt-2">
          <div
            className="h-3 w-full"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0) 100%)' }}
          />
          <div
            className="h-3.5 w-full rounded-b-wood xl:h-4"
            style={{
              background:
                'linear-gradient(180deg, var(--color-walnut) 0%, var(--color-walnut) 45%, rgba(0,0,0,0.4) 100%)',
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.12), 0 6px 10px -4px rgba(0,0,0,0.35)',
            }}
          />
        </div>
      </Container>
    </section>
  )
}

interface BookletProps {
  project: Project
  variant: (typeof VARIANTS)[number]
  reducedMotion: boolean
}

const MotionLink = motion.create(Link)

function Booklet({ project, variant, reducedMotion }: BookletProps) {
  const spine = SPINE_COLOR[project.coverImage.tone ?? 'ink'] ?? 'var(--color-walnut)'

  return (
    <MotionLink
      to={`/work/${project.slug}`}
      aria-label={`Open the ${project.title} case study`}
      className={cn(
        'group relative block w-[72vw] max-w-[280px] shrink-0 snap-start',
        'lg:w-[27%] lg:max-w-[240px]',
        variant.restRotate,
        variant.hoverRotate,
        variant.seatClass,
        'transition-[translate,rotate,box-shadow] duration-300 ease-[var(--ease-editorial)]',
        'motion-reduce:transition-[box-shadow] motion-reduce:!rotate-none',
      )}
      {...getRevealAnimation(reducedMotion, fadeUp)}
    >
      <div
        className={cn(
          variant.heightClass,
          'texture-paper rounded-paper relative w-full overflow-hidden bg-surface',
          'shadow-[1px_2px_0_0_rgba(0,0,0,0.08),var(--shadow-soft-sm)]',
          'transition-[translate,box-shadow] duration-300',
          'group-hover:-translate-y-2.5 group-hover:translate-x-1 group-hover:shadow-[1px_2px_0_0_rgba(0,0,0,0.08),var(--shadow-soft)]',
          'group-focus-visible:-translate-y-2.5 group-focus-visible:translate-x-1 group-focus-visible:shadow-[1px_2px_0_0_rgba(0,0,0,0.08),var(--shadow-soft)]',
          'motion-reduce:translate-none motion-reduce:transition-[box-shadow]',
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-10 w-[5px]"
          style={{ backgroundColor: spine }}
        />
        <img
          src={project.coverImage.src ?? undefined}
          alt={project.coverImage.alt}
          className="h-full w-full object-cover"
        />

        {/* Title and mark both live on the cover — stamped/printed onto
            the artifact, never a caption row sitting beneath it. */}
        {variant.titleTreatment === 'bandBottom' && (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-3 pt-8">
            <span className="font-display text-base text-bg">{project.title}</span>
            <span className="text-stamp text-bg/80">
              {project.award ? project.award : project.tags[0]}
            </span>
          </div>
        )}
        {variant.titleTreatment === 'bandTop' && (
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-ink/75 to-transparent px-4 pb-8 pt-3">
            <span className="font-display text-base text-bg">{project.title}</span>
          </div>
        )}
        {variant.titleTreatment === 'cornerTopLeft' && (
          <span className="absolute left-3 top-3 font-display text-sm text-bg [text-shadow:0_1px_3px_rgba(0,0,0,0.7),0_1px_10px_rgba(0,0,0,0.45)]">
            {project.title}
          </span>
        )}

        {variant.markPosition === 'cornerBottomRight' && (
          <span className="absolute bottom-3 right-3 max-w-[65%] text-right text-stamp text-bg [text-shadow:0_1px_3px_rgba(0,0,0,0.7),0_1px_10px_rgba(0,0,0,0.45)]">
            {project.award ? project.award : project.tags[0]}
          </span>
        )}
      </div>
    </MotionLink>
  )
}
