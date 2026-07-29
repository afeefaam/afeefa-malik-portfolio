import { contact, person, socialLinks } from '../../data/siteContent'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  return (
    <section id="contact" className="py-stack-xl">
      <Container className="flex flex-col items-center text-center">
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
            className="font-display text-display-3 text-ink transition-colors hover:text-sage"
          >
            {person.email}
          </a>
          <p className="mt-stack-xs text-sm text-ink-soft">{contact.replyTime}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mt-stack-lg flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm text-ink transition-colors hover:border-ink"
            >
              {link.label}
            </a>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  )
}
