import { about } from '../../data/siteContent'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="bg-sunken py-stack-xl">
      <Container>
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-12">
          <RevealOnScroll variant="scaleIn" className="md:col-span-5">
            <ImagePlaceholder
              alt="Portrait of Afeefa Malik"
              tone="clay"
              radius="xl"
              aspectRatio="4 / 5"
              className="shadow-soft"
            />
          </RevealOnScroll>

          <div className="flex flex-col gap-stack-md md:col-span-7">
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

            <RevealOnScroll delay={0.15} className="grid grid-cols-1 gap-stack-sm sm:grid-cols-3">
              {about.values.map((value) => (
                <div key={value.title} className="flex flex-col gap-1.5">
                  <h3 className="font-display text-base text-ink">{value.title}</h3>
                  <p className="text-sm text-ink-soft">{value.description}</p>
                </div>
              ))}
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.2}
              className="flex flex-col gap-stack-xs rounded-lg bg-surface p-stack-sm shadow-soft-sm"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                A few fun facts
              </h3>
              <ul className="flex flex-col gap-2">
                {about.funFacts.map((fact) => (
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
