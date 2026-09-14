import { Bounded } from '../home/Bounded'
import { RevealOnScroll } from '../motion/RevealOnScroll'

interface ConfidentialNoticeProps {
  note?: string
}

export function ConfidentialNotice({ note }: ConfidentialNoticeProps) {
  return (
    <section className="py-8">
      <Bounded>
        <RevealOnScroll className="max-w-2xl rounded-2xl bg-blush-50 p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blush-500">
            Confidential project
          </span>
          <p className="mt-3 text-lg text-graphite">
            {note ?? 'The details of this project are confidential and shown at a high level only.'}
          </p>
        </RevealOnScroll>
      </Bounded>
    </section>
  )
}
