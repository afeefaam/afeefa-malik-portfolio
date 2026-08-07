import type { Variants } from 'motion/react'
import { durations, EASE_EDITORIAL } from './presets'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease: EASE_EDITORIAL } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.slow, ease: EASE_EDITORIAL } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.base, ease: EASE_EDITORIAL } },
}

export const motionVariants = { fadeUp, fadeIn, scaleIn }
export type MotionVariantName = keyof typeof motionVariants
