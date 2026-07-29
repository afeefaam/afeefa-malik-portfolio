import type { ProjectLink, ProjectLinkKind } from '../../data/projects.types'
import { Button } from '../ui/Button'

const LINK_LABELS: Record<ProjectLinkKind, string> = {
  figma: 'View Figma',
  prototype: 'View Prototype',
  pdf: 'View PDF',
  github: 'GitHub',
  live: 'Live Site',
}

interface LinkButtonRowProps {
  links: ProjectLink[]
}

/** Renders one button per link the project actually has — nothing more. */
export function LinkButtonRow({ links }: LinkButtonRowProps) {
  if (links.length === 0) return null

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, index) => (
        <Button
          key={link.kind}
          href={link.url}
          target="_blank"
          variant={index === 0 ? 'primary' : 'ghost'}
        >
          {link.label ?? LINK_LABELS[link.kind]}
        </Button>
      ))}
    </div>
  )
}
