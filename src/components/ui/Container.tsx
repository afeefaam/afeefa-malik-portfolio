import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/**
 * Editorial content width wrapper. Used instead of Tailwind's built-in
 * `container` utility so gutter padding stays consistent as one component
 * rather than a repeated class string.
 */
export function Container({ children, as = 'div', className = '' }: ContainerProps) {
  const Tag = as
  return (
    <Tag className={`mx-auto w-full max-w-8xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  )
}
