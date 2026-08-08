import { About } from '../components/home/About'
import { Contact } from '../components/home/Contact'
import { ExperienceLedger } from '../components/home/ExperienceLedger'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/home/Hero'
import { ProjectArchive } from '../components/home/ProjectArchive'
import { Nav } from '../components/layout/Nav'
import { useScrollToHash } from '../hooks/useScrollToHash'

export default function HomePage() {
  useScrollToHash()

  return (
    <>
      <Nav />
      <main className="bg-bg pt-20">
        <Hero />
        <ProjectArchive />
        <ExperienceLedger />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
