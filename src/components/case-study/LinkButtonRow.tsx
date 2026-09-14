import type { ProjectLink, ProjectLinkKind } from '../../data/projects.types'
import { Button } from '../ui/Button'

const LINK_LABELS: Record<ProjectLinkKind, string> = {
  figma: 'View Figma',
  prototype: 'View Prototype',
  pdf: 'View PDF',
  github: 'GitHub',
  live: 'Live Site',
  behance: 'View Behance',
}

interface LinkButtonRowProps {
  links: ProjectLink[]
  /** 'onDark' renders every link as a solid white pill — for sitting inside
   *  the filled blush meta card, matching the reference's "View Figma"
   *  button. */
  tone?: 'onLight' | 'onDark'
}

/** Renders one button per link the project actually has — nothing more.
 * A bare "#" is a held-back project's not-ready-yet placeholder (see
 * Wayfind in data/projects.ts), not a real destination — skipped so a
 * button never sits there looking clickable while going nowhere. */
export function LinkButtonRow({ links, tone = 'onLight' }: LinkButtonRowProps) {
  const realLinks = links.filter((link) => link.url !== '#')
  if (realLinks.length === 0) return null

  return (
    <div className={tone === 'onDark' ? 'flex flex-col gap-2.5' : 'flex flex-wrap gap-3'}>
      {realLinks.map((link, index) => (
        <Button
          key={link.kind}
          href={link.url}
          target="_blank"
          variant={tone === 'onDark' || index === 0 ? 'primary' : 'ghost'}
          className={
            tone === 'onDark'
              ? 'w-full border-transparent bg-white text-blush-500 hover:bg-white/90'
              : index === 0
                ? 'bg-blush-500 text-white hover:bg-blush-600'
                : 'border-blush-300 text-blush-500 hover:border-blush-500'
          }
        >
          {link.label ?? LINK_LABELS[link.kind]}
        </Button>
      ))}
    </div>
  )
}
