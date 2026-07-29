import type { ExperienceEntry } from '../../data/siteContent'
import { RevealGroupItem } from '../motion/RevealGroup'

interface ExperienceTimelineItemProps {
  entry: ExperienceEntry
  isLast: boolean
}

export function ExperienceTimelineItem({ entry, isLast }: ExperienceTimelineItemProps) {
  return (
    <RevealGroupItem as="li" className="relative flex gap-stack-sm pb-stack-md last:pb-0">
      <div className="flex w-3 shrink-0 flex-col items-center">
        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sage" />
        {!isLast && <span className="mt-2 w-px flex-1 bg-border" aria-hidden="true" />}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:gap-stack-sm">
        <span className="shrink-0 text-sm text-ink-soft sm:w-32">{entry.period}</span>
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg text-ink">
            {entry.role} <span className="text-ink-soft">· {entry.org}</span>
          </h3>
          <p className="max-w-xl text-ink-soft">{entry.description}</p>
        </div>
      </div>
    </RevealGroupItem>
  )
}
