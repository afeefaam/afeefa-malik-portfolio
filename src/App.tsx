import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LenisProvider } from './components/layout/LenisProvider'
import { ScrollToTop } from './components/layout/ScrollToTop'

const HomePage = lazy(() => import('./pages/HomePage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <LenisProvider>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-bg" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/heuristic-evaluation" element={<ComingSoonPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </LenisProvider>
  )
}

export default App
