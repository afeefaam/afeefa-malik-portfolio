import { contact, person, socialLinks } from '../../data/siteContent'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  return (
    <section id="contact" className="py-stack-xl">
      <Container className="relative flex flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender/15 blur-3xl"
        />

        <RevealOnScroll>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            subtitle={contact.subhead}
            align="center"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-stack-md">
          <a
            href={`mailto:${person.email}`}
            className="font-display text-display-3 text-ink transition-colors hover:text-lavender-deep"
          >
            {person.email}
          </a>
          <p className="mt-stack-xs flex items-center justify-center gap-2 text-sm text-ink-soft">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lavender" />
            {contact.replyTime}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mt-stack-lg flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-lavender/25 bg-surface/60 px-6 py-3 text-sm text-ink shadow-soft-sm backdrop-blur-sm transition-colors hover:border-lavender-deep/40"
            >
              {link.label}
            </a>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  )
}
