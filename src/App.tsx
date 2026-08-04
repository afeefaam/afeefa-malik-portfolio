import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/layout/ScrollToTop'

const HomePage = lazy(() => import('./pages/HomePage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-bg" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
