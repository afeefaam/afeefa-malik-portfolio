import type { ProjectImage } from '../../data/projects.types'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

interface BrowserMockupProps {
  image: ProjectImage
  className?: string
}

/** A restrained browser-window frame around a project screenshot slot. */
export function BrowserMockup({ image, className = '' }: BrowserMockupProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border/70 bg-surface ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border/60 bg-surface/70 px-4 py-3 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-clay" />
        <span className="h-2 w-2 rounded-full bg-clay" />
        <span className="h-2 w-2 rounded-full bg-clay" />
        <span className="ml-2 h-3.5 w-24 rounded-full bg-sunken" />
      </div>
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt}
          fetchPriority="high"
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <ImagePlaceholder alt={image.alt} tone={image.tone} radius="none" aspectRatio="16 / 10" />
      )}
    </div>
  )
}
