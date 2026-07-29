import type { ElementType, ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  as?: ElementType
  align?: 'left' | 'center'
  size?: 'lg' | 'md'
  className?: string
}

/**
 * Eyebrow label + display heading + optional supporting copy. This is the
 * one place the old export's separate "label-sm" typography token lives now
 * — as a component style, not a magic class scattered through markup.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Heading = 'h2',
  align = 'left',
  size = 'lg',
  className = '',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const titleSize = size === 'lg' ? 'text-display-3 md:text-display-2' : 'text-display-3'

  return (
    <div className={`flex flex-col gap-stack-xs ${alignClasses} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
          {eyebrow}
        </span>
      )}
      <Heading className={`font-display text-ink ${titleSize}`}>{title}</Heading>
      {subtitle && <p className="max-w-2xl text-lg text-ink-soft">{subtitle}</p>}
    </div>
  )
}
