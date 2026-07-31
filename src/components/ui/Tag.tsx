interface TagProps {
  children: string
  tone?: 'sage' | 'clay' | 'lavender'
}

const TONE_CLASSES: Record<NonNullable<TagProps['tone']>, string> = {
  // Tinted backgrounds carry the color accent; text stays ink for reliable
  // WCAG AA contrast (text-sage/text-ink-soft/text-lavender on these soft
  // fills falls short of the 4.5:1 threshold for small text).
  sage: 'bg-sage-soft text-ink',
  clay: 'bg-clay-soft text-ink',
  lavender: 'bg-lavender-soft text-ink',
}

export function Tag({ children, tone = 'sage' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  )
}
