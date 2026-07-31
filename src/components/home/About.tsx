import { about, person } from '../../data/siteContent'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const [leadFact, ...restFacts] = about.funFacts

  return (
    <section id="about" className="bg-sunken py-stack-xl">
      <Container>
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-12">
          <RevealOnScroll variant="scaleIn" className="relative md:col-span-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-lavender/20 blur-3xl"
            />
            <ImagePlaceholder
              alt={`Portrait of ${person.name}`}
              tone="lavender"
              radius="xl"
              aspectRatio="4 / 5"
              className="shadow-soft"
            />

            {/* Caption card overlapping the portrait's edge — the section's
                one deliberate "layered" moment, echoing the Hero/Projects glow. */}
            <div className="absolute -bottom-4 -left-4 max-w-[75%] rounded-lg border border-white/50 bg-surface/75 px-4 py-3 shadow-soft-sm backdrop-blur-md">
              <span className="text-xs font-medium leading-snug text-ink">{leadFact}</span>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-stack-md md:col-span-7 md:pt-stack-xs">
            <RevealOnScroll>
              <SectionHeading eyebrow={about.eyebrow} title={about.title} />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1} className="flex flex-col gap-stack-xs">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-2xl text-lg text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </RevealOnScroll>

            <RevealOnScroll delay={0.15} className="mt-stack-xs flex flex-col divide-y divide-border">
              {about.values.map((value, index) => (
                <div key={value.title} className="flex gap-stack-sm py-stack-xs first:pt-0 last:pb-0">
                  <span className="font-display text-sm text-lavender-deep">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-base text-ink">{value.title}</h3>
                    <p className="text-sm text-ink-soft">{value.description}</p>
                  </div>
                </div>
              ))}
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.2}
              className="flex flex-col gap-stack-xs rounded-lg bg-surface p-stack-sm shadow-soft-sm"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                A few more fun facts
              </h3>
              <ul className="flex flex-col gap-2">
                {restFacts.map((fact) => (
                  <li key={fact} className="flex gap-2.5 text-ink-soft">
                    <span aria-hidden="true" className="text-sage">
                      —
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  )
}
