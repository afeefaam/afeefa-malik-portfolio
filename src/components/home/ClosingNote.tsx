import { motion } from 'motion/react'
import { contact, person } from '../../data/siteContent'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Container } from '../ui/Container'
import { getRevealAnimation } from '../motion/presets'
import { fadeUp } from '../motion/variants'

const STATEMENT = "If something here sparked an idea, I'd love to hear from you."

/**
 * The colophon spread — the final page of the same publication, not a
 * "Contact" section. No object this time: an asymmetric two-column close
 * (roughly 58/38, a single hairline rule between them) is what carries the
 * physical-editorial language here, the way a book's closing page uses
 * typography, rules, and paper rather than another prop. Statement on the
 * left, quieter than Hero's own display type; email and reply-time on the
 * right, plum appearing exactly once, as the email's hover/focus accent.
 */
export function ClosingNote() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="contact" className="texture-paper relative scroll-mt-20 overflow-hidden bg-bg py-stack-2xl">
      <Container className="relative">
        <motion.div
          className="flex flex-col gap-stack-md xl:flex-row xl:items-center xl:gap-0"
          {...getRevealAnimation(reducedMotion, fadeUp)}
        >
          <div className="xl:w-[58%] xl:pr-stack-lg">
            <p className="max-w-xl font-display text-3xl leading-snug text-ink md:text-display-3 xl:text-display-2">
              {STATEMENT}
            </p>
          </div>

          {/* One hairline rule — horizontal at base/tablet, vertical at
              desktop, running the height of the row. */}
          <div aria-hidden="true" className="h-px w-full bg-border xl:h-auto xl:w-px xl:self-stretch" />

          <div className="xl:w-[38%] xl:pl-stack-lg">
            <a
              href={`mailto:${person.email}`}
              className="inline-block break-all font-display text-xl text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-[var(--color-plum)] focus-visible:decoration-[var(--color-plum)] motion-reduce:transition-none xl:text-2xl"
            >
              {person.email}
            </a>
            <p className="mt-stack-xs text-sm text-umber">{contact.replyTime}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
