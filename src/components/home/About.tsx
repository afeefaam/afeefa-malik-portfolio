import { about, bobaImage, caseHacksImage, portrait } from '../../data/siteContent'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { RevealGroup, RevealGroupItem } from '../motion/RevealGroup'
import { Container } from '../ui/Container'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeading } from '../ui/SectionHeading'

function Photo({
  image,
  aspectRatio,
  className = '',
  objectPosition = 'center',
}: {
  image: typeof portrait
  aspectRatio: string
  className?: string
  objectPosition?: string
}) {
  return image.src ? (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-lg object-cover shadow-soft ${className}`}
      style={{ aspectRatio, objectPosition }}
    />
  ) : (
    <ImagePlaceholder
      alt={image.alt}
      tone={image.tone}
      radius="lg"
      aspectRatio={aspectRatio}
      className={`shadow-soft ${className}`}
    />
  )
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-sunken py-stack-lg">
      <Container className="flex flex-col gap-stack-lg">
        {/* Beat 1 — a small portrait beside the introduction, not a full column */}
        <RevealOnScroll className="flex flex-col items-start gap-stack-sm sm:flex-row sm:items-center sm:gap-stack-md">
          <div className="w-64 shrink-0 sm:w-80">
            <Photo image={portrait} aspectRatio="4 / 5" className="rotate-2" objectPosition="32% center" />
          </div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} subtitle={about.intro} size="md" />
        </RevealOnScroll>

        {/* Beat 2 — a short, offset story beat. No image here — kept brief
            and indented with a real spacing token (not a percentage margin)
            so it still reads as part of the same layout system. */}
        <RevealOnScroll className="max-w-2xl md:ml-24">
          <h3 className="font-display text-lg text-ink">{about.origin.heading}</h3>
          <p className="mt-1.5 text-ink-soft">{about.origin.paragraph}</p>
        </RevealOnScroll>

        {/* Beat 3 — breather: short and centered, not a huge display moment */}
        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <span aria-hidden="true" className="font-display text-3xl leading-none text-lavender">
            “
          </span>
          <p className="font-display text-2xl text-ink md:text-display-3">{about.pullQuote}</p>
        </RevealOnScroll>

        {/* Beat 4 — community story, photo on the right this time. A
            centered flex row rather than a float, so a short paragraph
            beside a tall photo never leaves an empty gap underneath. */}
        <RevealOnScroll className="flex flex-col items-center gap-stack-sm sm:flex-row-reverse sm:items-center sm:gap-stack-md">
          <figure className="w-56 shrink-0 sm:w-96">
            <Photo image={caseHacksImage} aspectRatio="4 / 5" className="-rotate-2" />
            <figcaption className="mt-1.5 text-center text-xs italic text-ink-soft sm:text-left">
              {about.caseHacksCaption}
            </figcaption>
          </figure>
          <div className="max-w-2xl text-center sm:text-left">
            <h3 className="font-display text-lg text-ink">{about.community.heading}</h3>
            <p className="mt-1.5 text-ink-soft">{about.community.paragraph}</p>
          </div>
        </RevealOnScroll>

        {/* Beat 5 — outside of design, mirrored: photo on the left this time */}
        <RevealOnScroll className="flex flex-col items-center gap-stack-sm sm:flex-row sm:items-center sm:gap-stack-md">
          <figure className="w-56 shrink-0 sm:w-72">
            <Photo image={bobaImage} aspectRatio="4 / 5" className="rotate-3" />
            <figcaption className="mt-1.5 text-center text-xs italic text-ink-soft sm:text-left">
              {about.bobaCaption}
            </figcaption>
          </figure>
          <div className="max-w-2xl text-center sm:text-left">
            <h3 className="font-display text-lg text-ink">{about.outside.heading}</h3>
            <p className="mt-1.5 text-ink-soft">{about.outside.paragraph}</p>
          </div>
        </RevealOnScroll>

        {/* Beat 6 — right now: quick, specific, compact cards */}
        <RevealGroup as="div" className="grid grid-cols-2 gap-stack-xs sm:grid-cols-3 lg:grid-cols-4">
          {about.rightNow.map((item) => (
            <RevealGroupItem
              key={item.label}
              className="flex min-h-28 flex-col justify-center gap-1 rounded-lg bg-surface p-stack-xs shadow-soft-sm"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sage">
                {item.label}
              </span>
              <span className="text-sm text-ink">{item.value}</span>
            </RevealGroupItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
