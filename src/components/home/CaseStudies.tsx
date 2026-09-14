import { Link } from 'react-router-dom'
import { homeCaseStudies, type HomeCaseStudy } from '../../data/homeCaseStudies'
import { cn } from '../../lib/cn'
import { Bounded } from './Bounded'
import { ArrowRightMark } from './icons'

/**
 * Case studies — the staggered section from the reference. Media and text
 * alternate sides row to row (media leads on the left for the first row).
 * Markaz / Setlist / Close the Curtain link to their real case-study
 * pages; Heuristic Evaluation's `to` is an external URL (the report
 * itself), which `Row` renders as a plain new-tab link rather than a
 * router `<Link>`.
 */
export function CaseStudies() {
  return (
    <section id="projects" className="scroll-mt-[calc(var(--nav-height)+24px)] py-12 sm:py-16">
      <Bounded>
        <h2 className="font-display text-[2rem] font-semibold text-blush-500 sm:text-[2.5rem]">
          Case studies
        </h2>

        <div className="mt-10 flex flex-col gap-12 sm:mt-12">
          {homeCaseStudies.map((study, i) => (
            <Row key={study.title} study={study} mediaRight={i % 2 === 1} />
          ))}
        </div>
      </Bounded>
    </section>
  )
}

function Row({ study, mediaRight }: { study: HomeCaseStudy; mediaRight: boolean }) {
  const isExternal = /^https?:\/\//.test(study.to)
  const linkClassName =
    'mt-5 inline-flex items-center gap-2 rounded-lg bg-blush-500 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-blush-600'

  return (
    <article className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
      <div className={cn(mediaRight && 'lg:order-2')}>
        <Media study={study} />
      </div>

      <div className={cn('flex flex-col items-start', mediaRight && 'lg:order-1')}>
        <h3 className="font-display text-2xl font-semibold text-blush-500 sm:text-[1.75rem]">
          {study.title}
        </h3>
        <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-graphite">
          {study.description}
        </p>
        {isExternal ? (
          <a href={study.to} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            View case study
            <ArrowRightMark />
          </a>
        ) : (
          <Link to={study.to} className={linkClassName}>
            View case study
            <ArrowRightMark />
          </Link>
        )}
      </div>
    </article>
  )
}

function Media({ study }: { study: HomeCaseStudy }) {
  if (study.cover.kind === 'navy') {
    return (
      <div className="flex aspect-[16/10] flex-col justify-center rounded-xl border border-blush-300 bg-navy p-7 text-white sm:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
          BlackBerry Secure Communications
        </p>
        <p className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]">
          Heuristic Evaluation
          <br />
          Report
        </p>
      </div>
    )
  }

  const { image } = study.cover
  return (
    <div className="overflow-hidden rounded-xl border border-blush-300 bg-blush-50">
      <img
        src={image.src ?? undefined}
        alt={image.alt}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover"
      />
    </div>
  )
}
