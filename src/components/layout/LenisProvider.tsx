import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { setLenisInstance } from '../../lib/lenis'

function LenisBridge() {
  const lenis = useLenis()

  useEffect(() => {
    setLenisInstance(lenis ?? null)
    return () => setLenisInstance(null)
  }, [lenis])

  return null
}

/**
 * Light scroll smoothing, not scroll-jacking: a short duration and a gentle
 * ease-out close to linear so it just takes the edge off wheel input —
 * scrolling should still feel like scrolling, not like the page animating
 * on its own. Touch is left at native feel (no extra multiplier).
 *
 * Fully disabled under prefers-reduced-motion — not shortened, not
 * dampened, not mounted at all, so scrolling is 100% native in that case.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 0.6,
        easing: (t: number) => 1 - (1 - t) * (1 - t),
        touchMultiplier: 1,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  )
}
