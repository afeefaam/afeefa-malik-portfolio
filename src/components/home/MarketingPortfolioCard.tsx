import { marketingPortfolio } from '../../data/siteContent'
import { Bounded } from './Bounded'
import { ExternalLinkMark } from './icons'

/**
 * A secondary pointer to Afeefa's separate Canva portfolio (marketing,
 * social, event branding) — deliberately NOT another row in `CaseStudies`.
 * UX is the primary portfolio here; this is one compact, clearly-external
 * card so a visitor immediately reads it as "leaves the site" rather than
 * another in-depth case study: a dashed border + tinted fill instead of
 * the case studies' solid media blocks, and a plain text-arrow link
 * instead of their solid pink CTA button.
 */
export function MarketingPortfolioCard() {
  return (
    <section aria-label="External marketing portfolio" className="pb-2 sm:pb-4">
      <Bounded>
        <a
          href={marketingPortfolio.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-4 rounded-xl border border-dashed border-blush-300 bg-blush-50/70 p-6 transition-colors hover:border-blush-400 hover:bg-blush-50 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blush-500/70">
              External portfolio
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-blush-500">
              {marketingPortfolio.title}
            </h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-graphite">
              {marketingPortfolio.description}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-blush-500 transition-transform group-hover:translate-x-0.5">
            {marketingPortfolio.cta}
            <ExternalLinkMark className="h-4 w-4" />
          </span>
        </a>
      </Bounded>
    </section>
  )
}
