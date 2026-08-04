import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-ink text-bg hover:opacity-90 shadow-soft-sm',
  secondary:
    'bg-lavender-soft text-ink hover:bg-clay-soft',
  ghost:
    'bg-transparent text-ink border border-border hover:border-ink',
}

const BASE_STYLES =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 motion-reduce:transition-none active:scale-[0.97]'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  className?: string
  icon?: ReactNode
}

type ButtonAsLink = CommonProps & Omit<LinkProps, 'className' | 'children'> & { to: LinkProps['to']; href?: never; onClick?: never }
type ButtonAsAnchor = CommonProps & {
  href: string
  to?: never
  onClick?: MouseEventHandler<HTMLAnchorElement>
  target?: string
  rel?: string
}
type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { to?: never; href?: never }

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

/** Polymorphic button — renders a router Link, an external anchor, or a native button. */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className = '', icon, ...rest } = props
  const classes = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`

  if ('to' in props && props.to) {
    const { to, ...linkRest } = rest as Omit<ButtonAsLink, keyof CommonProps>
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
        {icon}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href, target, rel, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof CommonProps>
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        className={classes}
        {...anchorRest}
      >
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon}
    </button>
  )
}
