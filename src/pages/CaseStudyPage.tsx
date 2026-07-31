import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CaseStudyHero } from '../components/case-study/CaseStudyHero'
import { CaseStudyMeta } from '../components/case-study/CaseStudyMeta'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { CaseStudySectionNav } from '../components/case-study/CaseStudySectionNav'
import { ConfidentialNotice } from '../components/case-study/ConfidentialNotice'
import { Footer } from '../components/layout/Footer'
import { Nav } from '../components/layout/Nav'
import { Container } from '../components/ui/Container'
import { getProjectBySlug, projects } from '../data/projects'
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
  useDocumentTitle(`${project.title} — Afeefa Malik`)

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
      <Nav />
      <main className="bg-bg pt-20">
        <CaseStudyHero project={project} />

        {project.isConfidential ? (
          <>
            <Container>
              <div className="max-w-sm pb-stack-md">
                <CaseStudyMeta meta={project.meta} links={project.links} />
              </div>
            </Container>
            <ConfidentialNotice note={project.confidentialNote} />
          </>
        ) : (
          <Container className="pb-stack-lg">
            <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-12">
              <aside className="md:col-span-3">
                <div className="flex flex-col gap-stack-sm md:sticky md:top-28">
                  <CaseStudyMeta meta={project.meta} links={project.links} />
                  <CaseStudySectionNav sections={project.sections} />
                </div>
              </aside>

              <div className="md:col-span-8 md:col-start-5">
                {project.sections.map((section, index) => (
                  <CaseStudySection key={section.type} section={section} index={index} />
                ))}
              </div>
            </div>
          </Container>
        )}

        <section className="border-t border-border py-stack-md">
          <Container>
            <Link
              to={`/work/${nextProject.slug}`}
              className="group flex flex-col gap-1.5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                Next project
              </span>
              <span className="font-display text-display-3 text-ink transition-colors group-hover:text-sage">
                {nextProject.title} →
              </span>
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
