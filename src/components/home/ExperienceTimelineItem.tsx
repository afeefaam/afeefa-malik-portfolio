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
      className="experience-grid group -mx-4 gap-x-stack-md gap-y-2 rounded-lg px-4 py-stack-sm transition-colors duration-300 first:pt-0 last:pb-0 hover:bg-surface sm:gap-y-0"
    >
      <span className="[grid-area:number] font-display text-sm text-lavender-deep">
        {String(index + 1).padStart(2, '0')}
      </span>

      <h3 className="[grid-area:role] font-display text-xl text-ink">{entry.role}</h3>

      <div className="[grid-area:org]">
        <Tag tone="lavender">{entry.org}</Tag>
      </div>

      {/* Fixed-width column on sm+ (not content-sized) so every date lines
          up at the same x-position regardless of how long the role title
          is; on mobile it's just the 4th line in reading order. */}
      <span className="[grid-area:date] text-sm text-ink-soft sm:text-right">{entry.period}</span>

      <p className="[grid-area:description] max-w-3xl text-ink-soft">{entry.description}</p>
    </RevealGroupItem>
  )
}
