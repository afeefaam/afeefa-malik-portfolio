import type { CaseStudyMeta as CaseStudyMetaType, ProjectLink } from '../../data/projects.types'
import { LinkButtonRow } from './LinkButtonRow'

interface CaseStudyMetaProps {
  meta?: CaseStudyMetaType
  links: ProjectLink[]
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  )
}

export function CaseStudyMeta({ meta, links }: CaseStudyMetaProps) {
  return (
    <div className="flex flex-col gap-stack-sm rounded-lg border border-border/60 bg-surface/80 p-stack-sm shadow-soft-sm backdrop-blur-md">
      {meta?.role && <MetaField label="Role" value={meta.role} />}
      {meta?.timeline && <MetaField label="Timeline" value={meta.timeline} />}
      {meta?.team && <MetaField label="Team" value={meta.team} />}
      {meta?.tools && meta.tools.length > 0 && (
        <MetaField label="Tools" value={meta.tools.join(', ')} />
      )}
      <LinkButtonRow links={links} />
    </div>
  )
}
