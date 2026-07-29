import { About } from '../components/home/About'
import { Contact } from '../components/home/Contact'
import { Experience } from '../components/home/Experience'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/home/Hero'
import { SelectedWork } from '../components/home/SelectedWork'
import { Nav } from '../components/layout/Nav'
import { useScrollToHash } from '../hooks/useScrollToHash'

export default function HomePage() {
  useScrollToHash()

  return (
    <>
      <Nav />
      <main className="bg-bg pt-20">
        <Hero />
        <SelectedWork />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
