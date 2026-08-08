import { motion } from 'motion/react'
import { experience, type ExperienceEntry } from '../../data/siteContent'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Container } from '../ui/Container'
import { cn } from '../../lib/cn'
import { getRevealAnimation } from '../motion/presets'
import { fadeUp } from '../motion/variants'

// Derived from the real entries, not authored — the earliest and latest
// year actually present in `period`, so the header can never drift out of
// sync with the content it's summarizing.
function getRecordSpan(entries: ExperienceEntry[]): string {
  const years = entries.flatMap((entry) => entry.period.match(/\d{4}/g) ?? []).map(Number)
  if (years.length === 0) return ''
  const min = Math.min(...years)
  const max = Math.max(...years)
  return min === max ? String(min) : `${min}–${max}`
}

const recordSpan = getRecordSpan(experience)

/**
 * The experience ledger — a single kept record, not a resume timeline. No
 * heading, no three identical cards: one heavy sheet of cream stock,
 * picked up close enough to fill most of the frame, background thrown
 * soft the way an out-of-focus desk would fall away behind something held
 * up to read. Three ruled entries, real content only. Setlist was a loose
 * proof being inspected; the archive was bound work pulled off a shelf;
 * this is information that's been recorded and kept — closer, quieter,
 * typography doing the work instead of another object.
 */
export function ExperienceLedger() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden py-stack-xl">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-walnut)',
          backgroundImage:
            'radial-gradient(55% 60% at 50% 42%, rgba(241,231,214,0.35) 0%, rgba(241,231,214,0) 100%)',
        }}
      />

      <Container className="relative flex justify-center">
        <motion.div
          className={cn(
            'texture-paper rounded-paper relative w-full max-w-3xl bg-surface p-stack-sm xl:p-stack-md',
            // Resting shadow plus a faint inset warp — the sheet isn't
            // perfectly flat, the way handled paper never quite is.
            'shadow-[inset_10px_-12px_18px_-16px_rgba(91,69,48,0.4),var(--shadow-soft-lg)]',
          )}
          style={{ rotate: '-0.4deg' }}
          {...getRevealAnimation(reducedMotion, fadeUp)}
        >
          {/* A little more handled at one corner than the rest — a worn-
              edge cue, not a prop, just uneven age in the stock. */}
          <div
            aria-hidden="true"
            className="rounded-paper pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(30% 26% at 96% 4%, rgba(91,69,48,0.10) 0%, rgba(91,69,48,0) 100%)',
            }}
          />

          {/* Header — what makes this read as a kept record rather than a
              resume laid on cream paper. Both values come from real data
              (the person's own site content, the entries' own dates). */}
          <div className="relative mb-stack-xs flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
            <span className="text-stamp" style={{ color: 'var(--color-plum)' }}>
              Studio Record
            </span>
            <span className="text-stamp text-umber">{recordSpan}</span>
          </div>

          <ol className="relative flex flex-col">
            {experience.map((entry, index) => (
              <LedgerRow key={entry.org} entry={entry} index={index} />
            ))}
          </ol>
        </motion.div>
      </Container>
    </section>
  )
}

function LedgerRow({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <li
      tabIndex={0}
      aria-label={`${entry.org}, ${entry.role}`}
      className="group relative border-t border-border/70 py-stack-xs outline-none first:border-t-0 first:pt-0 last:pb-0"
    >
      {/* Revealed on hover/focus — a plum mark against the ruled edge,
          as if this entry were the one currently being read. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -left-3 top-1 bottom-1 w-[2px] opacity-0 transition-opacity duration-300',
          'group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none',
        )}
        style={{ backgroundColor: 'var(--color-plum)' }}
      />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-stamp" style={{ color: 'var(--color-plum)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={cn(
              'font-display text-xl font-semibold text-ink/85 transition-colors duration-300',
              'group-hover:text-ink group-focus-visible:text-ink motion-reduce:text-ink motion-reduce:transition-none',
            )}
          >
            {entry.org}
          </span>
        </div>
        <span className="text-stamp shrink-0 text-umber sm:text-right">{entry.period}</span>
      </div>

      <p className="mt-0.5 text-sm font-medium text-ink sm:ml-8">{entry.role}</p>
      <p className="mt-2 max-w-md text-sm text-umber sm:ml-8">{entry.description}</p>
    </li>
  )
}
