import { person } from '../../data/siteContent'
import { Bounded } from './Bounded'

/**
 * Homepage footer — a quiet colophon inside the framed card: hairline rule,
 * wordmark left, copyright right, both in the dusty-rose accent.
 */
export function HomeFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="rounded-b-card">
      <Bounded>
        <div className="h-px w-full bg-blush-200" />
        <div className="flex flex-col items-center justify-between gap-2 py-8 sm:flex-row">
          <span className="font-display text-lg font-semibold text-blush-500">{person.name}</span>
          <span className="text-[15px] text-blush-500/80">@{year} {person.name}</span>
        </div>
      </Bounded>
    </footer>
  )
}
