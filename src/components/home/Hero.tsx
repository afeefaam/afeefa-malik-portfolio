import { motion } from 'framer-motion'
import { hero } from '../../data/siteContent'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToSection } from '../../lib/scrollToSection'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { fadeUp } from '../motion/variants'
import { HeroVisual } from './HeroVisual'
import { TypewriterLine } from './TypewriterLine'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  const handleAnchorClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(id, reducedMotion)
  }

  return (
    <section className="pt-stack-lg pb-stack-xl md:pt-stack-xl">
      <Container className="grid grid-cols-1 items-center gap-stack-md md:grid-cols-12 md:gap-stack-lg">
        <motion.div
          className="flex flex-col items-start gap-stack-sm md:col-span-7"
          initial={reducedMotion ? undefined : 'hidden'}
          animate={reducedMotion ? undefined : 'visible'}
          variants={reducedMotion ? undefined : containerVariants}
        >
          <motion.span
            variants={reducedMotion ? undefined : fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-sage"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={reducedMotion ? undefined : fadeUp}
            className="font-display text-display-2 text-ink md:text-display-1"
          >
            <span className="block">{hero.greeting}</span>
            <TypewriterLine phrases={hero.roles} />
          </motion.h1>

          <motion.p
            variants={reducedMotion ? undefined : fadeUp}
            className="max-w-xl text-lg text-ink-soft"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            variants={reducedMotion ? undefined : fadeUp}
            className="mt-stack-xs flex flex-wrap items-center gap-4"
          >
            <Button
              href={hero.primaryCta.href}
              onClick={handleAnchorClick(hero.primaryCta.href.slice(1))}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              variant="ghost"
              href={hero.secondaryCta.href}
              onClick={handleAnchorClick(hero.secondaryCta.href.slice(1))}
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>

        <div className="md:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
