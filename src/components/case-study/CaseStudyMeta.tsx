import type { CaseStudyMeta as CaseStudyMetaType, ProjectLink } from '../../data/projects.types'
import { LinkButtonRow } from './LinkButtonRow'

interface CaseStudyMetaProps {
  meta?: CaseStudyMetaType
  links: ProjectLink[]
  award?: string
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{label}</span>
      <span className="text-[15px] font-medium text-white">{value}</span>
    </div>
  )
}

/**
 * The compact project-info card — a filled blush block (matching the
 * reference's coral sidebar card) holding Role / Timeline / Team / Tools
 * and any project link (e.g. a "View Figma" button).
 */
export function CaseStudyMeta({ meta, links, award }: CaseStudyMetaProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-blush-500 p-6 shadow-soft-sm">
      {award && <MetaField label="Award" value={award} />}
      {meta?.role && <MetaField label="Role" value={meta.role} />}
      {meta?.timeline && <MetaField label="Timeline" value={meta.timeline} />}
      {meta?.team && <MetaField label="Team" value={meta.team} />}
      {meta?.tools && meta.tools.length > 0 && (
        <MetaField label="Tools" value={meta.tools.join(', ')} />
      )}
      {links.length > 0 && (
        <div className="mt-1 border-t border-white/20 pt-4">
          <LinkButtonRow links={links} tone="onDark" />
        </div>
      )}
    </div>
  )
}
