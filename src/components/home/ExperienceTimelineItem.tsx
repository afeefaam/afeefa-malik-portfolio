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
      className="group -mx-4 grid grid-cols-1 gap-stack-xs rounded-lg px-4 py-stack-sm transition-colors duration-300 first:pt-0 last:pb-0 hover:bg-surface sm:grid-cols-[2.5rem_1fr_10rem] sm:items-baseline sm:gap-x-stack-md sm:gap-y-0"
    >
      <span className="font-display text-sm text-lavender-deep">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl text-ink">{entry.role}</h3>
        <div>
          <Tag tone="lavender">{entry.org}</Tag>
        </div>
        <p className="max-w-3xl text-ink-soft">{entry.description}</p>
      </div>

      {/* Fixed-width column (not content-sized) so every date lines up at
          the same x-position regardless of how long the role title is. */}
      <span className="text-sm text-ink-soft sm:text-right">{entry.period}</span>
    </RevealGroupItem>
  )
}
