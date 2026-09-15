import { AboutMe } from '../components/home/AboutMe'
import { Capabilities } from '../components/home/Capabilities'
import { CaseStudies } from '../components/home/CaseStudies'
import { Contact } from '../components/home/Contact'
import { ExperienceTimeline } from '../components/home/ExperienceTimeline'
import { Hero } from '../components/home/Hero'
import { HomeFooter } from '../components/home/HomeFooter'
import { HomeNav } from '../components/home/HomeNav'
import { Intro } from '../components/home/Intro'
import { MarketingPortfolioCard } from '../components/home/MarketingPortfolioCard'
import { PageFrame } from '../components/layout/PageFrame'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useScrollToHash } from '../hooks/useScrollToHash'

/**
 * Homepage (portfolio-v2) — the framed layout from the design reference: a
 * dusty-pink gradient page holding one white rounded card that runs from
 * the rose nav bar through to the footer.
 */
export default function HomePage() {
  useDocumentTitle('Afeefa Malik — UX Designer & Computer Science Student')
  useScrollToHash()

  return (
    <PageFrame>
      <HomeNav />
      <main>
        <Hero />
        <Intro />
        <Capabilities />
        <CaseStudies />
        <MarketingPortfolioCard />
        <ExperienceTimeline />
        <AboutMe />
        <Contact />
      </main>
      <HomeFooter />
    </PageFrame>
  )
}
