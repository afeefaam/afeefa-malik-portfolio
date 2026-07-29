import { RevealOnScroll } from '../motion/RevealOnScroll'
import { Container } from '../ui/Container'

interface ConfidentialNoticeProps {
  note?: string
}

export function ConfidentialNotice({ note }: ConfidentialNoticeProps) {
  return (
    <section className="py-stack-md">
      <Container>
        <RevealOnScroll className="max-w-2xl rounded-lg bg-sunken p-stack-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
            Confidential project
          </span>
          <p className="mt-stack-xs text-lg text-ink-soft">
            {note ?? 'The details of this project are confidential and shown at a high level only.'}
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
