import type { ContentBlock } from '../../data/projects.types'

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

    case 'image': {
      // No placeholder fallback here — an unset optional image renders
      // nothing at all (no box, no reserved height) rather than a soft
      // gradient card that reads as an empty/broken element once real
      // photography exists elsewhere on the same page.
      if (!block.image.src) return null

      const sizeClass = block.size === 'sm' ? 'max-w-sm' : block.size === 'md' ? 'max-w-lg' : ''
      const wrapperClass = block.bleed ? '-mx-6 sm:-mx-10 lg:-mx-16' : sizeClass
      return (
        <figure className={wrapperClass}>
          <img
            src={block.image.src}
            alt={block.image.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl object-cover"
          />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-ink-soft">{block.caption}</figcaption>
          )}
        </figure>
      )
    }

    case 'imageGrid': {
      const gridRatio = block.aspectRatio ?? '4 / 3'
      const images = block.images.filter((image) => image.src)
      if (images.length === 0) return null

      return (
        <div className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
          {images.map((image) => (
            <img
              key={image.alt}
              src={image.src!}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg object-cover"
              style={{ aspectRatio: gridRatio }}
            />
          ))}
        </div>
      )
    }

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
            <cite className="mt-stack-xs flex items-center gap-2 text-sm not-italic text-ink-soft">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sage" />
              {block.attribution}
            </cite>
          )}
        </blockquote>
      )

    case 'compare': {
      // Both sides missing → nothing to compare, skip entirely. One side
      // present is left as-is (rare, but a single real image with a label
      // still communicates something, unlike an all-placeholder grid).
      if (!block.before.src && !block.after.src) return null

      const sides = (
        [
          { image: block.before, label: block.beforeLabel ?? 'Before' },
          { image: block.after, label: block.afterLabel ?? 'After' },
        ] as const
      ).filter((side) => side.image.src)

      return (
        <div className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
          {sides.map(({ image, label }) => (
            <div key={label} className="relative">
              <img
                src={image.src!}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl object-cover"
                style={{ aspectRatio: '4 / 3' }}
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-surface/70 px-3 py-1 text-xs font-medium text-ink shadow-soft-sm backdrop-blur-md">
                {label}
              </span>
            </div>
          ))}
        </div>
      )
    }

    case 'list':
      return (
        <ul className="flex max-w-2xl flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-lg text-ink-soft">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              {item}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}
