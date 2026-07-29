import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { fadeUp } from './variants'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

interface RevealGroupProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/** Staggered-children scroll reveal — wraps a list of RevealGroupItem elements. */
export function RevealGroup({ children, as = 'div', className }: RevealGroupProps) {
  const reducedMotion = usePrefersReducedMotion()
  const Container = as

  if (reducedMotion) {
    return <Container className={className}>{children}</Container>
  }

  const MotionContainer = motion.create(Container)
  return (
    <MotionContainer
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      {children}
    </MotionContainer>
  )
}

interface RevealGroupItemProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/** A single item inside a RevealGroup — inherits stagger timing from its parent. */
export function RevealGroupItem({ children, as = 'div', className }: RevealGroupItemProps) {
  const reducedMotion = usePrefersReducedMotion()
  const Item = as

  if (reducedMotion) {
    return <Item className={className}>{children}</Item>
  }

  const MotionItem = motion.create(Item)
  return (
    <MotionItem className={className} variants={fadeUp}>
      {children}
    </MotionItem>
  )
}
