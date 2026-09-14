import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Inner content width for the homepage sections — narrower than the app's
 * editorial `Container`, sized to sit inside the framed white card with the
 * same generous side margins the reference uses.
 */
export function Bounded({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-20', className)}>
      {children}
    </Tag>
  )
}
