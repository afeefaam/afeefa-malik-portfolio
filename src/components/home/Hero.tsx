import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { hero } from '../../data/siteContent'
import { getProjectBySlug } from '../../data/projects'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Container } from '../ui/Container'
import { getRevealAnimation, springs } from '../motion/presets'
import { fadeIn } from '../motion/variants'

const MotionLink = motion.create(Link)

const featured = getProjectBySlug('setlist')!
const TILT_DEGREES = 4
const FOCUS_TILT = 0.32 // fixed pointer-equivalent position for keyboard focus

/**
 * Shot 1 — not a hero, the first artifact discovered. A large printed
 * proof of the featured project rests on the worktable, off-true and
 * shadowed like something actually set down; identity sits beside it as a
 * compact nameplate, not a separate hero column. The wood is context, not
 * the subject — its lighting is one static north-light pool, no pointer
 * tracking. The one interaction belongs to the proof: it tilts a few
 * degrees toward the pointer (or settles into a fixed tilt on keyboard
 * focus) and its shadow deepens, like picking a print up to catch the
 * light, before Enter/Space/click opens the case study.
 */
export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-start overflow-hidden py-stack-sm xl:items-center xl:py-stack-lg">
      <div
        aria-hidden="true"
        className="texture-wood absolute inset-0"
        style={{
          backgroundColor: 'var(--color-oak)',
          backgroundImage:
            // Static ambient pool — the only thing identity-text contrast
            // relies on (verified: umber 5.0:1 / ink 9.5:1 against it).
            // Fixed, no pointer tracking: the light here is context, not
            // the interaction — that belongs to the proof now.
            'radial-gradient(52% 60% at 20% 48%, rgba(241,231,214,0.65) 0%, rgba(241,231,214,0) 100%), ' +
            'radial-gradient(60% 55% at 90% 10%, rgba(91,69,48,0.22) 0%, rgba(91,69,48,0) 100%)',
        }}
      />

      <Container className="relative flex flex-col items-start gap-stack-xs xl:flex-row xl:items-center xl:gap-4">
        <motion.div
          className="relative z-10 flex max-w-sm shrink-0 flex-col gap-1 xl:w-[28%] xl:gap-stack-xs"
          {...getRevealAnimation(reducedMotion, fadeIn)}
        >
          <h1 className="font-display text-display-3 leading-[1.05] text-ink [text-shadow:0_1px_2px_rgba(31,31,31,0.12)]">
            {hero.greeting}
          </h1>
          <p className="text-stamp text-umber [text-shadow:0_1px_1px_rgba(241,231,214,0.4)]">
            {hero.eyebrow}
          </p>
          <p className="hidden max-w-xs text-base text-umber xl:block">{hero.subhead}</p>
        </motion.div>

        <ProofArtifact reducedMotion={reducedMotion} />
      </Container>
    </section>
  )
}

function ProofArtifact({ reducedMotion }: { reducedMotion: boolean }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [TILT_DEGREES, -TILT_DEGREES]), springs.gentle)
  const rotateY = useSpring(useTransform(px, [0, 1], [-TILT_DEGREES, TILT_DEGREES]), springs.gentle)

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  function focusTilt() {
    if (reducedMotion) return
    px.set(FOCUS_TILT)
    py.set(FOCUS_TILT)
  }

  return (
    <MotionLink
      to={`/work/${featured.slug}`}
      aria-label={`Open the ${featured.title} case study`}
      className="group -rotate-1 block w-full xl:absolute xl:right-0 xl:top-1/2 xl:w-[66vw] xl:max-w-[960px] xl:-translate-y-1/2"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onFocus={focusTilt}
      onBlur={reset}
      {...getRevealAnimation(reducedMotion, fadeIn)}
    >
      <motion.div
        className={
          'texture-paper rounded-paper bg-surface transition-shadow duration-300 ' +
          'shadow-[0_1px_0_0_rgba(0,0,0,0.05),3px_4px_0_0_rgba(0,0,0,0.1),var(--shadow-soft)] ' +
          'group-hover:shadow-[0_1px_0_0_rgba(0,0,0,0.05),3px_4px_0_0_rgba(0,0,0,0.1),var(--shadow-soft-lg)] ' +
          'group-focus-visible:shadow-[0_1px_0_0_rgba(0,0,0,0.05),3px_4px_0_0_rgba(0,0,0,0.1),var(--shadow-soft-lg)]'
        }
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 1200,
                // Pivoting from center let the edge flush with the viewport
                // swing past it on tilt, clipping the caption. Anchoring the
                // pivot to that same edge keeps it fixed in place — all the
                // visible movement happens on the left, where there's room.
                transformOrigin: 'right center',
              }
        }
      >
        <img
          src={featured.coverImage.src ?? undefined}
          alt={featured.coverImage.alt}
          className="rounded-t-paper max-h-[40svh] w-full object-cover xl:max-h-none"
        />
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-4">
          <span className="font-display text-lg text-ink">{featured.title}</span>
          {featured.award && <span className="text-stamp text-umber">{featured.award}</span>}
          <p className="w-full text-sm text-ink-soft">{featured.tagline}</p>
        </div>
      </motion.div>
    </MotionLink>
  )
}
