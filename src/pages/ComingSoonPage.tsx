import { Link } from 'react-router-dom'
import { HomeFooter } from '../components/home/HomeFooter'
import { HomeNav } from '../components/home/HomeNav'
import { Bounded } from '../components/home/Bounded'
import { PageFrame } from '../components/layout/PageFrame'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/**
 * Placeholder for a case study that has been announced on the homepage but
 * whose write-up isn't a long-form case study page (currently: Heuristic
 * Evaluation, which lives as a PDF/presentation instead). Once that file is
 * added to the project, wire the homepage card straight to it — a new-tab
 * link or embedded viewer — rather than routing here.
 */
export default function ComingSoonPage() {
  useDocumentTitle('Heuristic Evaluation — Afeefa Malik')

  return (
    <PageFrame>
      <HomeNav />
      <main>
        <Bounded className="flex min-h-[60svh] flex-col items-start justify-center gap-4 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blush-500">
            Case study
          </p>
          <h1 className="font-display text-[2.25rem] font-semibold text-blush-500 sm:text-[2.75rem]">
            Heuristic Evaluation
          </h1>
          <p className="max-w-md text-lg text-graphite">
            This case study is being written up and will be published here soon.
          </p>
          <Link
            to="/#projects"
            className="mt-2 text-sm font-medium text-blush-500 underline underline-offset-4 hover:text-blush-600"
          >
            ← Back to all projects
          </Link>
        </Bounded>
      </main>
      <HomeFooter />
    </PageFrame>
  )
}
