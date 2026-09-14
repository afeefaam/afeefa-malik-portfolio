import type { ContentBlock } from '../../data/projects.types'

interface ContentBlockRendererProps {
  block: ContentBlock
}

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-graphite">{block.text}</p>

    case 'heading': {
      // Section headings are already h2, so nested content headings default
      // to h3 to keep a sane heading hierarchy; level: 2 opts back in. These
      // are the "small bold subheadings" for individual design decisions —
      // dark, not pink, so the pink stays reserved for section titles.
      const Heading = block.level === 2 ? 'h2' : 'h3'
      return <Heading className="font-display text-lg font-semibold text-graphite">{block.text}</Heading>
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
            className="w-full rounded-2xl object-cover"
          />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-graphite-soft">{block.caption}</figcaption>
          )}
        </figure>
      )
    }

    case 'imageGrid': {
      const gridRatio = block.aspectRatio ?? '4 / 3'
      const images = block.images.filter((image) => image.src)
      if (images.length === 0) return null

      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((image) => (
            <img
              key={image.alt}
              src={image.src!}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl object-cover"
              style={{ aspectRatio: gridRatio }}
            />
          ))}
        </div>
      )
    }

    case 'statGrid':
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {block.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-[2rem] font-semibold text-blush-500">{stat.value}</span>
              <span className="text-sm text-graphite-soft">{stat.label}</span>
            </div>
          ))}
        </div>
      )

    case 'quote':
      // Deliberately breaks the standard paragraph column width — a pull
      // quote should read as a pause in the story, not another text block.
      return (
        <blockquote className="max-w-3xl py-2">
          <span aria-hidden="true" className="font-display text-5xl leading-none text-blush-300">
            “
          </span>
          <p className="font-display text-2xl font-semibold text-blush-500">{block.text}</p>
          {block.attribution && (
            <cite className="mt-3 flex items-center gap-2 text-sm not-italic text-graphite-soft">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blush-400" />
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sides.map(({ image, label }) => (
            <div key={label} className="relative">
              <img
                src={image.src!}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: '4 / 3' }}
              />
              <span className="absolute left-3 top-3 rounded-full border border-blush-200 bg-card/90 px-3 py-1 text-xs font-medium text-graphite shadow-soft-sm backdrop-blur-md">
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
            <li key={item} className="flex gap-2.5 text-[1.0625rem] leading-relaxed text-graphite">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" />
              {item}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}
