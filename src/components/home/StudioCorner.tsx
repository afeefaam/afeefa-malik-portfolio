import { motion } from 'motion/react'
import { about, bobaImage, caseHacksImage, portrait } from '../../data/siteContent'
import type { ProjectImage } from '../../data/projects.types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Container } from '../ui/Container'
import { cn } from '../../lib/cn'
import { getRevealAnimation } from '../motion/presets'
import { fadeUp } from '../motion/variants'

// Real content only — the pull quote is the existing intro line verbatim
// (nothing about it needed inventing), and the boba order is the exact
// order already locked in siteContent.rightNow.
const PULL_QUOTE =
  "I say yes before I feel ready, I'm probably holding a boba right now, and I've organized more events than I can count."
const SYNTHESIS_LINE = "CS taught me to build things well. Community taught me who I'm building them for."
const BOBA_NOTE = 'Current order: Gong Cha Mango Splash with pearls.'

/**
 * The studio corner — not an About section. Setlist was one immersive
 * artifact, the archive was work seated on a shelf, Experience was a kept
 * record held up close. This is the lived-in part of the same room: a
 * still life, one anchor photo with two smaller prints leaning into it,
 * a note taped right against one of them — warmer and lighter than the
 * two dark sections before it, on purpose. No heading, no portrait-
 * beside-paragraph, no stat grid.
 */
export function StudioCorner() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-stack-xl">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-sunken)',
          backgroundImage:
            'radial-gradient(60% 55% at 22% 20%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      <Container className="relative flex flex-col gap-stack-lg xl:flex-row xl:items-center xl:gap-stack-md">
        {/* Quote — deliberately quieter than before (text-2xl capped, no
            display-scale jump) so it reads as one voice in the still life
            rather than the dominant element the photos sit beside. */}
        <motion.div className="max-w-md xl:w-[36%]" {...getRevealAnimation(reducedMotion, fadeUp)}>
          <span
            aria-hidden="true"
            className="block font-display text-4xl leading-none"
            style={{ color: 'var(--color-plum)', opacity: 0.5 }}
          >
            &ldquo;
          </span>
          <p className="-mt-2 rotate-[-0.3deg] font-display text-xl leading-snug text-ink xl:text-2xl">
            {PULL_QUOTE}
          </p>
          <p className="mt-stack-sm max-w-sm text-sm text-umber">{SYNTHESIS_LINE}</p>
        </motion.div>

        {/* Photo still life. Base (mobile) = one larger anchor with two
            smaller prints staggered off to alternating sides, overlapping
            it — not a gallery stack. lg (tablet) = a tidy, non-overlapping
            row. xl (desktop) = the full still life: portrait as the one
            clear anchor, the other two smaller and leaning into its
            corners, the cluster pulled slightly toward the quote so the
            two halves read as one composition instead of two zones. */}
        <div className="relative mx-auto w-full max-w-[16rem] lg:max-w-2xl xl:mx-0 xl:-ml-4 xl:h-[28rem] xl:w-[64%] xl:max-w-none">
          <div className="flex flex-col items-center lg:max-w-none lg:flex-row lg:items-start lg:justify-center lg:gap-stack-md xl:contents">
            {/* Anchor */}
            <div className="w-60 lg:w-60 xl:absolute xl:left-12 xl:top-4 xl:z-0 xl:w-72">
              <Print image={portrait} rotate="rotate-1" />
            </div>

            {/* Support 1 — leans over the anchor's bottom-left corner and
                bleeds slightly toward the quote column on desktop. */}
            <figure className="-mt-10 w-36 self-start xl:absolute xl:-left-6 xl:top-64 xl:z-10 xl:mt-0 xl:w-40 xl:self-auto">
              <Print image={caseHacksImage} rotate="rotate-3" />
              <figcaption className="mt-1.5 text-center text-xs italic text-ink-soft xl:text-left">
                {about.caseHacksCaption}
              </figcaption>
            </figure>

            {/* Support 2 — leans over the anchor's top-right corner, with
                the note taped directly against its edge, not floating
                beneath it. */}
            <div className="relative mt-3 w-40 self-end xl:absolute xl:left-64 xl:top-0 xl:z-10 xl:mt-0 xl:w-44 xl:self-auto">
              <Print image={bobaImage} rotate="-rotate-2" />
              {/* Below at base/tablet (room to breathe, extra top margin
                  clears the photo's own rotated corner); tucked directly
                  against its right edge at xl, where there's width for it
                  to sit beside the photo without overflowing anything. */}
              <div className="text-hand mt-6 w-32 rotate-2 text-xs text-ink-soft xl:absolute xl:left-full xl:top-[55%] xl:mt-0 xl:ml-2 xl:w-28 xl:-translate-y-1/2">
                {BOBA_NOTE}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Print({
  image,
  rotate,
  className = '',
}: {
  image: ProjectImage
  rotate: string
  className?: string
}) {
  return (
    <div
      tabIndex={0}
      aria-label={image.alt}
      className={cn(
        'texture-paper rounded-paper group relative block w-full outline-none',
        rotate,
        'transition-[translate,box-shadow] duration-300',
        'shadow-[1px_2px_0_0_rgba(0,0,0,0.06),var(--shadow-soft-sm)]',
        'hover:-translate-y-1.5 hover:shadow-[1px_2px_0_0_rgba(0,0,0,0.06),var(--shadow-soft)]',
        'focus-visible:-translate-y-1.5 focus-visible:shadow-[1px_2px_0_0_rgba(0,0,0,0.06),var(--shadow-soft)]',
        'motion-reduce:translate-none motion-reduce:transition-[box-shadow]',
        className,
      )}
    >
      <img
        src={image.src ?? undefined}
        alt=""
        loading="lazy"
        decoding="async"
        className="rounded-paper block w-full object-cover"
        style={{ aspectRatio: '4 / 5' }}
      />
    </div>
  )
}
