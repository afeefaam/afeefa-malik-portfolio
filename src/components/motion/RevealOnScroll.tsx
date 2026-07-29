import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { motionVariants, type MotionVariantName } from './variants'

interface RevealOnScrollProps {
  children: ReactNode
  variant?: MotionVariantName
  delay?: number
  once?: boolean
  className?: string
}

/**
 * Single scroll-reveal wrapper used everywhere in the app. Fully skips
 * animation (not just shortens it) when prefers-reduced-motion is set.
 */
export function RevealOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0,
  once = true,
  className,
}: RevealOnScrollProps) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={motionVariants[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
