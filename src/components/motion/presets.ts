import type { Transition, Variants } from 'motion/react'

/** The one easing curve used everywhere in this app — calm, no overshoot. */
export const EASE_EDITORIAL = [0.2, 0, 0, 1] as const

/** Shared durations, so a "fast" or "slow" transition means the same
 * number everywhere instead of each component picking its own. */
export const durations = {
  fast: 0.5,
  base: 0.7,
  slow: 0.8,
} as const

/** Spring presets — not used by the current tween-based reveal system, but
 * defined up front so a future interaction (a dragged/lifted object, for
 * instance) reaches for one of these instead of hand-tuning stiffness and
 * damping inline. */
export const springs = {
  snappy: { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 },
  gentle: { type: 'spring', stiffness: 180, damping: 24, mass: 1 },
} satisfies Record<string, Transition>

/**
 * Spreadable props for a mount-triggered reveal (`initial`/`animate`), the
 * pattern used by anything that should animate in once on mount rather than
 * on scroll-into-view (that's RevealOnScroll/RevealGroup instead, which use
 * motion's own `whileInView` and don't need this). Returns an empty object
 * under reduced motion, so the element just renders in its final state —
 * full skip, not a shortened animation.
 */
export function getRevealAnimation(reducedMotion: boolean, variants: Variants) {
  if (reducedMotion) return {}
  return { initial: 'hidden', animate: 'visible', variants } as const
}
