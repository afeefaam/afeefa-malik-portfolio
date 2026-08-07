import type Lenis from 'lenis'

// Module-level singleton so scrollToSection (a plain function, called from
// event handlers, not a component) can reach the Lenis instance without
// threading it through props. Populated by LenisProvider, null whenever
// Lenis isn't mounted (prefers-reduced-motion, or before first mount).
let instance: Lenis | null = null

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis
}

export function getLenisInstance(): Lenis | null {
  return instance
}
