import { about, hackathonImage, portrait } from '../../data/siteContent'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { RevealGroup, RevealGroupItem } from '../motion/RevealGroup'
import { Container } from '../ui/Container'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeading } from '../ui/SectionHeading'

function Paragraphs({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-stack-xs ${className}`}>
      {text.split('\n\n').map((paragraph) => (
        <p key={paragraph} className="text-lg text-ink-soft">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-ink-soft">
          <span aria-hidden="true" className="shrink-0 text-sage">
            —
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function About() {
  const [leadFact, ...restFacts] = about.funFacts

  return (
    <section id="about" className="bg-sunken py-stack-xl">
      <Container className="flex flex-col gap-stack-lg">
        {/* Beat 1 — the introduction: portrait + who I am + how I got here */}
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-12">
          <RevealOnScroll variant="scaleIn" className="relative md:col-span-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-lavender/20 blur-3xl"
            />
            {portrait.src ? (
              <img
                src={portrait.src}
                alt={portrait.alt}
                className="w-full rounded-xl object-cover shadow-soft"
                style={{ aspectRatio: '4 / 5' }}
              />
            ) : (
              <ImagePlaceholder
                alt={portrait.alt}
                tone={portrait.tone}
                radius="xl"
                aspectRatio="4 / 5"
                className="shadow-soft"
              />
            )}

            {/* Caption card overlapping the portrait's edge — the section's
                one deliberate "layered" moment, echoing the Hero/Projects glow. */}
            <div className="absolute -bottom-4 -left-4 max-w-[75%] rounded-lg border border-white/50 bg-surface/75 px-4 py-3 shadow-soft-sm backdrop-blur-md">
              <span className="text-xs font-medium leading-snug text-ink">{leadFact}</span>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-stack-md md:col-span-7 md:pt-stack-xs">
            <RevealOnScroll>
              <SectionHeading eyebrow={about.eyebrow} title={about.title} subtitle={about.intro} />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1} className="flex flex-col gap-stack-xs">
              <h3 className="font-display text-xl text-ink">{about.journey.heading}</h3>
              <Paragraphs text={about.journey.paragraph} />
            </RevealOnScroll>
          </div>
        </div>

        {/* Beat 2 — a breather: the line that actually reframed things for her */}
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <span aria-hidden="true" className="font-display text-5xl leading-none text-lavender">
            “
          </span>
          <p className="font-display text-display-3 text-ink">{about.pullQuote}</p>
        </RevealOnScroll>

        {/* Beat 3 — full-width now, breaking from the two-column rhythm above */}
        <RevealOnScroll className="flex flex-col gap-stack-xs">
          <h3 className="font-display text-xl text-ink">{about.excites.heading}</h3>
          <Paragraphs text={about.excites.paragraph} className="max-w-2xl" />
        </RevealOnScroll>

        {/* Beat 4a — a horizontal card: hackathons, told with a supporting photo */}
        <RevealOnScroll className="flex flex-col gap-stack-sm overflow-hidden rounded-lg bg-surface p-stack-sm shadow-soft-sm sm:flex-row sm:items-center">
          <div className="sm:w-[38%] sm:shrink-0">
            {hackathonImage.src ? (
              <img
                src={hackathonImage.src}
                alt={hackathonImage.alt}
                className="w-full rounded-md object-cover"
                style={{ aspectRatio: '4 / 3' }}
              />
            ) : (
              <ImagePlaceholder
                alt={hackathonImage.alt}
                tone={hackathonImage.tone}
                radius="md"
                aspectRatio="4 / 3"
              />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-lg text-ink">{about.hackathons.heading}</h3>
            <p className="text-ink-soft">{about.hackathons.paragraph}</p>
          </div>
        </RevealOnScroll>

        {/* Beat 4b — plain paragraph, matching the "What excites me" treatment */}
        <RevealOnScroll className="flex flex-col gap-stack-xs">
          <h3 className="font-display text-xl text-ink">{about.community.heading}</h3>
          <p className="max-w-2xl text-lg text-ink-soft">{about.community.paragraph}</p>
        </RevealOnScroll>

        {/* Beat 5 — closing two-up: currently learning + fun facts */}
        <RevealGroup as="div" className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
          <RevealGroupItem className="flex flex-col gap-stack-xs rounded-lg bg-surface p-stack-sm shadow-soft-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              Right now I'm learning
            </h3>
            <BulletList items={about.currentlyLearning} />
          </RevealGroupItem>

          <RevealGroupItem className="flex flex-col gap-stack-xs rounded-lg bg-surface p-stack-sm shadow-soft-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              A few more fun facts
            </h3>
            <BulletList items={restFacts} />
          </RevealGroupItem>
        </RevealGroup>
      </Container>
    </section>
  )
}
