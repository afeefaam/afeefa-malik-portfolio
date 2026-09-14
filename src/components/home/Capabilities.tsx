import type { ReactNode } from 'react'
import { skills, socialLinks, tools } from '../../data/siteContent'
import { Bounded } from './Bounded'
import { BehanceMark, GitHubMark, LinkedInMark, ResumeMark } from './icons'
import { TOOL_MARKS } from './toolMarks'

const SOCIAL_MARKS: Record<string, () => ReactNode> = {
  LinkedIn: LinkedInMark,
  GitHub: GitHubMark,
  Behance: BehanceMark,
  Resume: ResumeMark,
}

function Heading({ children }: { children: string }) {
  return (
    <h2 className="font-display text-2xl font-semibold text-blush-500">{children}</h2>
  )
}

/**
 * Skills / Tools / Social — a two-column block: a bulleted skills list on
 * the left, the tool-icon grid and social icons stacked on the right,
 * matching the reference. Each skill bullet is a category (bolded) plus
 * its specifics, e.g. "Research: interviews, heuristic evaluations,
 * usability testing." rather than a flat list of individual skill tags.
 */
export function Capabilities() {
  return (
    <section className="pt-6 pb-12 sm:pt-8 sm:pb-16">
      <Bounded className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Heading>My Skills</Heading>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[1.0625rem] leading-relaxed text-graphite marker:text-graphite/50">
            {skills.map((skill) => (
              <li key={skill.category}>
                <span className="font-semibold text-blush-500">{skill.category}:</span> {skill.items}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <Heading>Tools</Heading>
            <ul className="mt-4 flex flex-wrap items-center gap-5">
              {tools.map((tool) => {
                const Mark = TOOL_MARKS[tool]
                return Mark ? (
                  <li key={tool}>
                    <Mark />
                  </li>
                ) : null
              })}
            </ul>
          </div>

          <div>
            <Heading>Social</Heading>
            <ul className="mt-4 flex flex-wrap items-center gap-1.5">
              {socialLinks
                .filter((link) => link.label !== 'Resume')
                .map((link) => {
                  const Mark = SOCIAL_MARKS[link.label]
                  if (!Mark) return null
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="group inline-block transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <Mark />
                      </a>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </Bounded>
    </section>
  )
}
