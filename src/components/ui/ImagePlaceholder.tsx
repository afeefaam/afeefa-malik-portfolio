type Tone = 'sage' | 'clay' | 'ink' | 'neutral'
type Radius = 'md' | 'lg' | 'xl'

interface ImagePlaceholderProps {
  alt: string
  tone?: Tone
  aspectRatio?: string
  radius?: Radius
  className?: string
}

const TONE_GRADIENTS: Record<Tone, string> = {
  sage: 'radial-gradient(120% 120% at 15% 15%, #E4E7DD 0%, #F3EDE2 45%, #FAF8F5 100%)',
  clay: 'radial-gradient(120% 120% at 85% 20%, #F3EDE2 0%, #E4E7DD 50%, #FAF8F5 100%)',
  ink: 'radial-gradient(120% 120% at 20% 80%, #E6E0D6 0%, #F1ECE3 50%, #FAF8F5 100%)',
  neutral: 'radial-gradient(120% 120% at 50% 30%, #F1ECE3 0%, #FAF8F5 60%, #FFFFFF 100%)',
}

const RADIUS_CLASSES: Record<Radius, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
}

/**
 * Stand-in for real photography. The only place gradients are used in this
 * app — an explicit, scoped exception for placeholder imagery until real
 * project photos and a portrait are supplied.
 */
export function ImagePlaceholder({
  alt,
  tone = 'neutral',
  aspectRatio = '4 / 5',
  radius = 'lg',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${RADIUS_CLASSES[radius]} ${className}`}
      style={{ aspectRatio, background: TONE_GRADIENTS[tone] }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 70% 70%, rgba(107,114,89,0.12) 0%, transparent 55%)',
        }}
      />
    </div>
  )
}
