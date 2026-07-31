import type { ProjectImage } from '../../data/projects.types'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

interface PhoneMockupProps {
  image: ProjectImage
  className?: string
}

/** A minimal, bezel-less phone frame around a project screenshot slot. */
export function PhoneMockup({ image, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative overflow-hidden rounded-[32px] border border-ink/10 bg-surface ${className}`}>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-ink/15"
      />
      {image.src ? (
        <img src={image.src} alt={image.alt} className="aspect-[9/18] w-full object-cover" />
      ) : (
        <ImagePlaceholder alt={image.alt} tone={image.tone} radius="none" aspectRatio="9 / 18" />
      )}
    </div>
  )
}
