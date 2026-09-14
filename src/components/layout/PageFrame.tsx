import type { ReactNode } from 'react'

/**
 * The dusty-pink gradient page holding one white rounded card — the outer
 * frame every full page (home, case studies, the coming-soon placeholder)
 * shares, so the "slim colored border around the page" reads the same
 * everywhere instead of being redrawn per page.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--color-page-top)_0%,var(--color-page-mid)_48%,var(--color-page-bottom)_100%)] px-3 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
      {/* No overflow-hidden here — it would clip to the container's own box
          and break `position: sticky` for any descendant (e.g. the case
          study "On this page" nav), since a non-visible overflow on an
          ancestor becomes its sticky containing block. The rounded corners
          don't need it: HomeNav/HomeFooter round their own top/bottom
          corners to match, and nothing else's background reaches the edge. */}
      <div className="mx-auto w-full max-w-[1400px] rounded-card bg-card shadow-[0_40px_90px_-40px_rgba(150,70,70,0.45)]">
        {children}
      </div>
    </div>
  )
}
