import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the ref'd element first enters the viewport, then stops
 * observing — for a scroll-in reveal that never replays on scroll-up.
 * Lightweight IntersectionObserver alternative to a full animation library.
 */
export function useInViewOnce<T extends Element>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold])

  return { ref, inView } as const
}
