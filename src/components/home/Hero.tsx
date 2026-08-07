import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { hero } from '../../data/siteContent'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Container } from '../ui/Container'
import { getRevealAnimation } from '../motion/presets'
import { fadeIn } from '../motion/variants'

// The moving specular highlight is purely decorative and can roam freely —
// text contrast never depends on it. A separate static layer (below) is
// what actually guarantees legibility, so widening this travel range can
// never make the type unreadable, only more or less lit.
const HIGHLIGHT_DEFAULT = { x: 30, y: 76 }
const HIGHLIGHT_RANGE = 18
const HIGHLIGHT_DAMPING = 0.35

/**
 * Shot 1 — the bare corner of a worktable, shot from slightly above. No
 * hero card, no split layout, no CTA row: wood grain fills the frame edge
 * to edge and the identity block sits low and off-corner, tilted a degree
 * off true like something actually set down rather than laid out on a
 * grid. Two light layers do different jobs: a static warm pool keeps the
 * type legible no matter where the pointer is, and a smaller, brighter
 * highlight drifts toward the cursor on top of it — an ambient fill plus
 * a moving specular catch, the way two light sources actually layer on a
 * real surface, not one gradient doing both jobs at once.
 */
export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const surfaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const surface = surfaceRef.current
    if (!surface) return

    const handlePointerMove = (event: PointerEvent) => {
      // Ambient material response only — a touch drag isn't "looking at
      // the grain from an angle," it's scrolling, so it's ignored here.
      if (event.pointerType !== 'mouse') return
      const rect = surface.getBoundingClientRect()
      const pointerX = ((event.clientX - rect.left) / rect.width) * 100
      const pointerY = ((event.clientY - rect.top) / rect.height) * 100
      const x = clamp(
        HIGHLIGHT_DEFAULT.x + (pointerX - HIGHLIGHT_DEFAULT.x) * HIGHLIGHT_DAMPING,
        HIGHLIGHT_DEFAULT.x - HIGHLIGHT_RANGE,
        HIGHLIGHT_DEFAULT.x + HIGHLIGHT_RANGE,
      )
      const y = clamp(
        HIGHLIGHT_DEFAULT.y + (pointerY - HIGHLIGHT_DEFAULT.y) * HIGHLIGHT_DAMPING,
        HIGHLIGHT_DEFAULT.y - HIGHLIGHT_RANGE,
        HIGHLIGHT_DEFAULT.y + HIGHLIGHT_RANGE,
      )
      surface.style.setProperty('--hl-x', `${x}%`)
      surface.style.setProperty('--hl-y', `${y}%`)
    }

    const handlePointerLeave = () => {
      surface.style.setProperty('--hl-x', `${HIGHLIGHT_DEFAULT.x}%`)
      surface.style.setProperty('--hl-y', `${HIGHLIGHT_DEFAULT.y}%`)
    }

    surface.addEventListener('pointermove', handlePointerMove)
    surface.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      surface.removeEventListener('pointermove', handlePointerMove)
      surface.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [reducedMotion])

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-end overflow-hidden">
      <div
        ref={surfaceRef}
        aria-hidden="true"
        className="texture-wood absolute inset-0"
        style={{
          backgroundColor: 'var(--color-oak)',
          backgroundImage:
            // Static ambient pool — fixed, generously sized, the only thing
            // text contrast relies on (verified: umber 5.0:1 / ink 9.5:1
            // against it, both clear AA with real margin).
            'radial-gradient(55% 50% at 18% 76%, rgba(241,231,214,0.65) 0%, rgba(241,231,214,0) 100%), ' +
            // Moving specular highlight — smaller and brighter so its drift
            // is actually visible, free to roam since it's decorative only.
            'radial-gradient(28% 24% at var(--hl-x) var(--hl-y), rgba(241,231,214,0.6) 0%, rgba(241,231,214,0) 100%), ' +
            // Faint far-corner depth, static.
            'radial-gradient(65% 60% at 88% 8%, rgba(91,69,48,0.25) 0%, rgba(91,69,48,0) 100%)',
          transition: '--hl-x 0.9s var(--ease-editorial), --hl-y 0.9s var(--ease-editorial)',
        }}
      />

      <Container className="relative">
        <motion.div
          className="flex max-w-sm origin-bottom-left -rotate-1 flex-col gap-stack-xs py-stack-xl"
          {...getRevealAnimation(reducedMotion, fadeIn)}
        >
          <span className="text-stamp text-umber [text-shadow:0_1px_1px_rgba(241,231,214,0.4)]">
            {hero.eyebrow}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-umber/35" />
          <h1 className="font-display text-display-3 text-ink [text-shadow:0_1px_2px_rgba(31,31,31,0.12)] md:text-display-2">
            {hero.greeting}
          </h1>
          <p className="max-w-xs text-base text-umber">{hero.subhead}</p>
        </motion.div>
      </Container>
    </section>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
