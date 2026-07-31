import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { heroVisual } from '../../data/siteContent'
import { projects } from '../../data/projects'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { BrowserMockup } from './BrowserMockup'
import { PhoneMockup } from './PhoneMockup'

const EASE = [0.2, 0, 0, 1] as const
const featured = projects.find((project) => project.isFeatured) ?? projects[0]

/**
 * Layered browser + phone mockups standing in for real product screenshots.
 * Swap heroVisual.browser/phone.src in siteContent.ts once real work is
 * ready to drop in — everything else (framing, shadow, motion) stays.
 */
export function HeroVisual() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-12 rounded-full bg-lavender/25 blur-3xl"
      />

      <span
        aria-hidden="true"
        className="absolute right-4 top-0 h-3 w-3 rounded-full bg-lavender/70"
      />

      {/* Browser mockup — back layer, the large surface */}
      <motion.div
        className="absolute left-0 top-8 w-[76%]"
        initial={reducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.96 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={
            reducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }
          }
        >
          <BrowserMockup image={heroVisual.browser} className="rotate-2 shadow-soft" />
        </motion.div>
      </motion.div>

      {/* Phone mockup — front layer, overlapping the browser's lower edge */}
      <motion.div
        className="absolute bottom-0 right-2 w-[34%]"
        initial={reducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.96 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
          transition={
            reducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }
          }
        >
          <PhoneMockup image={heroVisual.phone} className="-rotate-3 shadow-soft-lg" />
        </motion.div>
      </motion.div>

      {/* Floating glass chip — links to the featured case study */}
      <motion.div
        className="absolute -left-3 bottom-16 sm:bottom-20"
        initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
      >
        <Link
          to={`/work/${featured.slug}`}
          className="flex items-center gap-2 rounded-full border border-lavender/30 bg-surface/55 py-2 pl-2.5 pr-4 shadow-soft-sm backdrop-blur-lg transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-lavender" />
          <span className="text-xs font-medium text-ink">Case study — {featured.title}</span>
        </Link>
      </motion.div>
    </div>
  )
}
