import { ClosingNote } from '../components/home/ClosingNote'
import { ExperienceLedger } from '../components/home/ExperienceLedger'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/home/Hero'
import { ProjectArchive } from '../components/home/ProjectArchive'
import { StudioCorner } from '../components/home/StudioCorner'
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
        <StudioCorner />
        <ClosingNote />
      </main>
      <Footer />
    </>
  )
}
