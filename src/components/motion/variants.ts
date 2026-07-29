import type { Variants } from 'framer-motion'

const EASE_EDITORIAL = [0.2, 0, 0, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EDITORIAL } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_EDITORIAL } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_EDITORIAL } },
}

export const motionVariants = { fadeUp, fadeIn, scaleIn }
export type MotionVariantName = keyof typeof motionVariants
