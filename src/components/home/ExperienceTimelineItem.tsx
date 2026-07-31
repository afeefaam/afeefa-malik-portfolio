import type { ExperienceEntry } from '../../data/siteContent'
import { RevealGroupItem } from '../motion/RevealGroup'
import { Tag } from '../ui/Tag'

interface ExperienceTimelineItemProps {
  entry: ExperienceEntry
  index: number
}

export function ExperienceTimelineItem({ entry, index }: ExperienceTimelineItemProps) {
  return (
    <RevealGroupItem
      as="li"
      className="group -mx-4 flex flex-col gap-stack-xs rounded-lg px-4 py-stack-sm transition-colors duration-300 first:pt-0 last:pb-0 hover:bg-surface sm:flex-row sm:items-baseline sm:gap-stack-md"
    >
      <span className="font-display text-sm text-lavender-deep sm:w-10 sm:shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-xl text-ink">{entry.role}</h3>
          <span className="shrink-0 text-sm text-ink-soft">{entry.period}</span>
        </div>
        <div>
          <Tag tone="lavender">{entry.org}</Tag>
        </div>
        <p className="max-w-xl text-ink-soft">{entry.description}</p>
      </div>
    </RevealGroupItem>
  )
}
