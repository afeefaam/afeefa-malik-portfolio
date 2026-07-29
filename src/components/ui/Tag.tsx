interface TagProps {
  children: string
  tone?: 'sage' | 'clay'
}

export function Tag({ children, tone = 'sage' }: TagProps) {
  // Tinted backgrounds carry the color accent; text stays ink for reliable
  // WCAG AA contrast (text-sage/text-ink-soft on these soft fills falls
  // just short of the 4.5:1 threshold for small text).
  const toneClasses = tone === 'sage' ? 'bg-sage-soft text-ink' : 'bg-clay-soft text-ink'
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide ${toneClasses}`}
    >
      {children}
    </span>
  )
}
