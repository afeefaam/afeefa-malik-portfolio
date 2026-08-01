import type { ContentBlock } from '../../data/projects.types'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

interface ContentBlockRendererProps {
  block: ContentBlock
}

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="max-w-2xl text-lg text-ink-soft">{block.text}</p>

    case 'heading': {
      // Section headings are already h2, so nested content headings default
      // to h3 to keep a sane heading hierarchy; level: 2 opts back in.
      const Heading = block.level === 2 ? 'h2' : 'h3'
      return <Heading className="font-display text-xl text-ink">{block.text}</Heading>
    }

    case 'image':
      return (
        <figure className={block.bleed ? '-mx-6 sm:-mx-10 lg:-mx-16' : ''}>
          {block.image.src ? (
            <img
              src={block.image.src}
              alt={block.image.alt}
              className="w-full rounded-xl object-cover"
            />
          ) : (
            <ImagePlaceholder
              alt={block.image.alt}
              tone={block.image.tone}
              radius="xl"
              aspectRatio="16 / 9"
            />
          )}
          {block.caption && (
            <figcaption className="mt-2 text-sm text-ink-soft">{block.caption}</figcaption>
          )}
        </figure>
      )

    case 'imageGrid':
      return (
        <div className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
          {block.images.map((image) =>
            image.src ? (
              <img
                key={image.alt}
                src={image.src}
                alt={image.alt}
                className="w-full rounded-lg object-cover"
                style={{ aspectRatio: '4 / 3' }}
              />
            ) : (
              <ImagePlaceholder
                key={image.alt}
                alt={image.alt}
                tone={image.tone}
                radius="lg"
                aspectRatio="4 / 3"
              />
            ),
          )}
        </div>
      )

    case 'statGrid':
      return (
        <div className="grid grid-cols-1 gap-stack-sm sm:grid-cols-3">
          {block.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-display-3 text-sage">{stat.value}</span>
              <span className="text-sm text-ink-soft">{stat.label}</span>
            </div>
          ))}
        </div>
      )

    case 'quote':
      // Deliberately breaks the standard paragraph column width — a pull
      // quote should read as a pause in the story, not another text block.
      return (
        <blockquote className="max-w-3xl py-stack-xs">
          <span aria-hidden="true" className="font-display text-5xl leading-none text-lavender">
            “
          </span>
          <p className="font-display text-display-3 text-ink">{block.text}</p>
          {block.attribution && (
            <cite className="mt-stack-xs block text-sm not-italic text-ink-soft">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      )

    case 'compare':
      return (
        <div className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
          {(
            [
              { image: block.before, label: block.beforeLabel ?? 'Before' },
              { image: block.after, label: block.afterLabel ?? 'After' },
            ] as const
          ).map(({ image, label }) => (
            <div key={label} className="relative">
              {image.src ? (
                <img src={image.src} alt={image.alt} className="w-full rounded-xl object-cover" style={{ aspectRatio: '4 / 3' }} />
              ) : (
                <ImagePlaceholder alt={image.alt} tone={image.tone} radius="xl" aspectRatio="4 / 3" />
              )}
              <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-surface/70 px-3 py-1 text-xs font-medium text-ink shadow-soft-sm backdrop-blur-md">
                {label}
              </span>
            </div>
          ))}
        </div>
      )

    case 'list':
      return (
        <ul className="flex max-w-2xl flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-lg text-ink-soft">
              <span aria-hidden="true" className="text-sage">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}
