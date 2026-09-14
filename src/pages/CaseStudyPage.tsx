import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BackToTopButton } from '../components/case-study/BackToTopButton'
import { CaseStudyHero } from '../components/case-study/CaseStudyHero'
import { CaseStudyMeta } from '../components/case-study/CaseStudyMeta'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { CaseStudySectionNav } from '../components/case-study/CaseStudySectionNav'
import { ConfidentialNotice } from '../components/case-study/ConfidentialNotice'
import { Bounded } from '../components/home/Bounded'
import { HomeFooter } from '../components/home/HomeFooter'
import { HomeNav } from '../components/home/HomeNav'
import { PageFrame } from '../components/layout/PageFrame'
import { getProjectBySlug, publishedProjects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFoundPage from './NotFoundPage'

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <NotFoundPage />
  }

  return <CaseStudyContent project={project} />
}

function CaseStudyContent({ project }: { project: NonNullable<ReturnType<typeof getProjectBySlug>> }) {
  useDocumentTitle(`${project.title} · Afeefa Malik`)

  // Cycle only through published projects, so "next" never lands on a
  // hidden one. If the current project itself isn't published (viewed
  // directly via its URL), default to the first published project.
  const currentIndex = publishedProjects.findIndex((p) => p.id === project.id)
  const nextProject =
    currentIndex === -1
      ? publishedProjects[0]
      : publishedProjects[(currentIndex + 1) % publishedProjects.length]

  return (
    <PageFrame>
      <HomeNav />
      <main>
        <CaseStudyHero project={project} />

        {project.isConfidential ? (
          <>
            <Bounded>
              <div className="max-w-sm pb-8">
                <CaseStudyMeta meta={project.meta} links={project.links} award={project.award} />
              </div>
            </Bounded>
            <ConfidentialNotice note={project.confidentialNote} />
          </>
        ) : (
          <Bounded className="pb-16 sm:pb-20">
            {/* Sidebar only at lg+ (1024px) — at tablet widths (768-1023px)
                a 3/8-column split leaves too little room for either side,
                so tablet gets the same full-width single column as mobile,
                just with more breathing room. */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
              {/* `aside` (not a nested wrapper div) is the flex container
                  here on purpose: it's the grid item that stretches to the
                  full row height, so the sticky nav's containing block has
                  room to actually stick for the whole scroll range instead
                  of being boxed into a div that shrink-wraps its content. */}
              <aside className="flex flex-col gap-4 lg:col-span-4">
                {/* Project details stay in normal document flow — only the
                    "On this page" nav below should follow the reader. Its
                    sticky offset clears the sticky main navbar (z-50) plus
                    24px of breathing room, and it sits at a lower z-index
                    (10) so it can never render above the navbar if their
                    edges ever touch mid-scroll. */}
                <CaseStudyMeta meta={project.meta} links={project.links} award={project.award} />
                <div className="lg:sticky lg:top-[calc(var(--nav-height)+24px)] lg:z-10">
                  <CaseStudySectionNav sections={project.sections} />
                </div>
              </aside>

              <div className="lg:col-span-8">
                {project.sections.map((section, index) => (
                  <CaseStudySection key={section.type} section={section} index={index} />
                ))}
              </div>
            </div>
          </Bounded>
        )}

        <section className="border-t border-blush-200 py-10">
          <Bounded>
            <Link to={`/work/${nextProject.slug}`} className="group flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blush-300">
                Next project
              </span>
              <span className="flex items-center gap-3 font-display text-2xl font-semibold text-blush-500 transition-colors group-hover:text-blush-600 sm:text-[2rem]">
                {nextProject.title}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Bounded>
        </section>
      </main>
      <HomeFooter />
      <BackToTopButton />
    </PageFrame>
  )
}
