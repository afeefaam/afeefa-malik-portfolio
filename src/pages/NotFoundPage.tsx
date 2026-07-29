import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found — Afeefa Malik')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-stack-xs bg-bg px-6 text-center">
      <h1 className="font-display text-display-3 text-ink">Page not found</h1>
      <p className="max-w-md text-ink-soft">
        The page you're looking for doesn't exist, or the project has moved.
      </p>
      <Link
        to="/"
        className="mt-stack-xs rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  )
}
