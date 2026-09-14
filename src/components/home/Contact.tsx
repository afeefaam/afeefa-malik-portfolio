import type { ReactNode } from 'react'
import { contact, person, socialLinks } from '../../data/siteContent'
import { Bounded } from './Bounded'
import { BehanceMark, GitHubMark, LinkedInMark, ResumeMark } from './icons'

const SOCIAL_MARKS: Record<string, () => ReactNode> = {
  LinkedIn: LinkedInMark,
  Behance: BehanceMark,
  GitHub: GitHubMark,
  Resume: ResumeMark,
}

/**
 * Contact — the centered "Let's Connect." close from the reference: one
 * line of copy, the email as a large dusty-rose link, and a row of social
 * icons.
 */
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-[calc(var(--nav-height)+24px)] py-16 sm:py-20">
      <Bounded className="flex flex-col items-center text-center">
        <h2 className="font-display text-[1.75rem] font-semibold text-blush-500 sm:text-3xl">
          {contact.title}
        </h2>
        <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-graphite">
          {contact.subhead}
        </p>
        <a
          href={`mailto:${person.email}`}
          className="mt-8 font-display text-xl font-semibold text-blush-500 underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-blush-500 sm:text-2xl"
        >
          {person.email}
        </a>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
          {socialLinks.map((link) => {
            const Mark = SOCIAL_MARKS[link.label]
            if (!Mark) return null
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group inline-block transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Mark />
                </a>
              </li>
            )
          })}
        </ul>
      </Bounded>
    </section>
  )
}
