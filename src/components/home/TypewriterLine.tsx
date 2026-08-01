import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'

interface TypewriterLineProps {
  phrases: string[]
}

/**
 * Second headline line: types/deletes through `phrases` on a loop. The
 * wrapper reserves the measured worst-case wrapped height so typing never
 * shifts the CTAs below it — "Computer Science Student." wraps to 3 lines
 * at mobile's display-2 size but only ever 2 at desktop's display-1 size
 * (measured across the full responsive range, not guessed). Reduced motion
 * collapses to the first phrase, fully typed, with no cursor.
 */
export function TypewriterLine({ phrases }: TypewriterLineProps) {
  const reducedMotion = usePrefersReducedMotion()
  const text = useTypewriter({ phrases, enabled: !reducedMotion })

  return (
    <span className="block min-h-[9.9rem] md:min-h-[9.45rem]">
      <span aria-hidden="true">
        {text}
        {!reducedMotion && (
          <span className="animate-blink-cursor ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] bg-ink" />
        )}
      </span>
      {/* Static, non-flickering description for assistive tech. */}
      <span className="sr-only">{phrases.join(' ')}</span>
    </span>
  )
}
