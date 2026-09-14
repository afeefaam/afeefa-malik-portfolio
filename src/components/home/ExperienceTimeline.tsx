import { useEffect, useRef, useState } from 'react'
import { experience, type ExperienceEntry } from '../../data/siteContent'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import { Bounded } from './Bounded'
import { TOOL_MARKS } from './toolMarks'

// Stable id per entry (by position), used both for the "active" scrollspy
// and as the IntersectionObserver's anchor for the fill/reveal effects.
const ENTRY_IDS = experience.map((_, i) => `exp-${i}`)

/**
 * Experience — a vertical timeline: a dusty-rose rail with a filled node
 * per role, each entry carrying its title, org/period, description, and the
 * tools used, matching the reference. The rail fills as you scroll, each
 * entry fades/lifts in once, and the dot nearest your scroll position reads
 * as the current one — subtle scroll-driven storytelling, not decoration.
 */
export function ExperienceTimeline() {
  const olRef = useRef<HTMLOListElement>(null)
  const [fillProgress, setFillProgress] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const activeId = useActiveSection(ENTRY_IDS)

  // Rail fill progress: 0 when the timeline's top reaches the middle of the
  // viewport, 1 once its bottom has scrolled up to that same line — so the
  // pink fill tracks how far through the list the reader has scrolled.
  useEffect(() => {
    if (reducedMotion) {
      setFillProgress(1)
      return
    }

    let raf = 0
    function measure() {
      raf = 0
      const el = olRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const midline = window.innerHeight * 0.5
      const raw = rect.height > 0 ? (midline - rect.top) / rect.height : 0
      setFillProgress(Math.min(1, Math.max(0, raw)))
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <section id="experience" className="scroll-mt-[calc(var(--nav-height)+24px)] py-12 sm:py-16">
      <Bounded>
        <h2 className="font-display text-[2rem] font-semibold text-blush-500 sm:text-[2.5rem]">
          Experience
        </h2>

        <ol ref={olRef} className="relative mt-10 sm:mt-14">
          {/* Track — the existing muted rail, unchanged in color. */}
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-blush-300" />
          {/* Fill — same accent pink as the dots, scaled in from the top. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[2px] origin-top bg-blush-500 transition-transform duration-150 ease-out motion-reduce:transition-none"
            style={{ transform: `scaleY(${fillProgress})` }}
          />

          {experience.map((entry, index) => (
            <Entry key={entry.org} entry={entry} index={index} isActive={activeId === ENTRY_IDS[index]} />
          ))}
        </ol>
      </Bounded>
    </section>
  )
}

function Entry({ entry, index, isActive }: { entry: ExperienceEntry; index: number; isActive: boolean }) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLLIElement>()
  const visible = reducedMotion || inView

  // The per-icon stagger delay is only wanted for the one-time reveal —
  // left in place permanently it would also lag the hover-lift below, so
  // it's cleared once the reveal has had time to finish.
  const [staggerSettled, setStaggerSettled] = useState(reducedMotion)
  useEffect(() => {
    if (!visible || staggerSettled) return
    const totalMs = entry.skillsUsed.length * 80 + 350
    const timer = window.setTimeout(() => setStaggerSettled(true), totalMs)
    return () => window.clearTimeout(timer)
  }, [visible, staggerSettled, entry.skillsUsed.length])

  return (
    <li
      id={ENTRY_IDS[index]}
      ref={ref}
      className={cn(
        'group relative pb-12 pl-9 last:pb-0 sm:pl-11',
        'transition-[opacity,transform] duration-[600ms] ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute -left-[10px] top-1 h-[18px] w-[18px] rounded-full ring-4 transition-[transform,background-color,box-shadow] duration-300',
          '[@media(hover:hover)]:group-hover:scale-105',
          isActive ? 'scale-110 bg-blush-500 ring-blush-200 ring-offset-2 ring-offset-card' : 'bg-blush-400 ring-card',
        )}
      />

      <h3 className="font-display text-xl font-semibold text-blush-500 transition-colors duration-200 [@media(hover:hover)]:group-hover:text-blush-600 sm:text-[1.375rem]">
        {entry.role}
      </h3>
      <p className="mt-1 text-[1.0625rem] text-blush-500/85">
        {entry.org} | {entry.period}
      </p>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-graphite">
        {entry.description}
      </p>

      {entry.skillsUsed.length > 0 && (
        <div className="mt-4">
          <p className="text-[15px] font-medium text-blush-500 underline underline-offset-4">
            Skills used
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-3.5">
            {entry.skillsUsed.map((tool, i) => {
              const Mark = TOOL_MARKS[tool]
              return Mark ? (
                <li
                  key={tool}
                  className={cn(
                    'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100',
                    '[@media(hover:hover)]:group-hover:-translate-y-0.5',
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                  )}
                  style={{ transitionDelay: staggerSettled ? undefined : `${i * 80}ms` }}
                >
                  <Mark size="sm" />
                </li>
              ) : null
            })}
          </ul>
        </div>
      )}
    </li>
  )
}
