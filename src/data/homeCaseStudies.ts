import { getProjectBySlug } from './projects'
import type { ProjectImage } from './projects.types'

/**
 * The homepage "Case studies" section — a fixed, ordered set matching the
 * design reference. Markaz / Setlist / Close the Curtain pull their real
 * copy and covers from `projects.ts`. Heuristic Evaluation has no
 * long-form case-study page yet: its `to` is an external link straight to
 * the report itself (a Google Drive doc) rather than an in-app route —
 * `CaseStudies.tsx` renders any `http(s)` destination as a plain
 * new-tab link instead of a router `<Link>`.
 */
export interface HomeCaseStudy {
  title: string
  description: string
  to: string
  /** 'navy' renders the styled report-cover placeholder; otherwise an image. */
  cover: { kind: 'navy' } | { kind: 'image'; image: ProjectImage }
}

function fromProject(slug: string, description?: string): HomeCaseStudy {
  const project = getProjectBySlug(slug)
  if (!project) throw new Error(`homeCaseStudies: missing project "${slug}"`)
  return {
    title: project.title,
    description: description ?? project.tagline,
    to: `/work/${project.slug}`,
    cover: { kind: 'image', image: project.coverImage },
  }
}

export const homeCaseStudies: HomeCaseStudy[] = [
  {
    title: 'Heuristic Evaluation',
    description:
      'Analyzed BlackBerry Secure Communications using usability heuristics to uncover pain points and recommend improvements to the user experience.',
    to: 'https://drive.google.com/file/d/16fpUIIgWd5_qtBTS1kzGka83vbCG3zYj/view?usp=sharing',
    cover: { kind: 'navy' },
  },
  fromProject('markaz'),
  fromProject('setlist'),
  fromProject('close-the-curtain'),
]
