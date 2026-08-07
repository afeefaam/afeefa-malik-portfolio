import { getLenisInstance } from './lenis'

export function scrollToSection(id: string, reducedMotion: boolean) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = getLenisInstance()
  if (lenis && !reducedMotion) {
    lenis.scrollTo(el)
    return
  }

  el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
}
