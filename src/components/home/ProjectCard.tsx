import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects.types'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Tag } from '../ui/Tag'

interface ProjectCardProps {
  project: Project
  aspectRatio?: string
  className?: string
}

export function ProjectCard({ project, aspectRatio = '4 / 5', className = '' }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`group flex flex-col gap-stack-xs ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        {project.coverImage.src ? (
          <img
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ aspectRatio }}
          />
        ) : (
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <ImagePlaceholder
              alt={project.coverImage.alt}
              tone={project.coverImage.tone}
              radius="xl"
              aspectRatio={aspectRatio}
            />
          </div>
        )}

        {project.isConfidential && (
          <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 text-xs font-medium text-ink-soft backdrop-blur-sm">
            Confidential
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-xl text-ink transition-colors group-hover:text-sage">
            {project.title}
          </h3>
          <span className="shrink-0 text-sm text-ink-soft">{project.year}</span>
        </div>
        <p className="text-ink-soft">{project.tagline}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}
