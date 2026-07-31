import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scrollToSection } from '../../lib/scrollToSection'
import { Container } from '../ui/Container'

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export function Nav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const activeId = useActiveSection(isHome ? SECTION_IDS : [])
  const reducedMotion = usePrefersReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = (id: string) => (e: React.MouseEvent) => {
    if (!isHome) return
    e.preventDefault()
    setMenuOpen(false)
    scrollToSection(id, reducedMotion)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-lavender/20 bg-surface/65 shadow-soft-sm backdrop-blur-xl">
      <Container as="nav" className="flex h-20 items-center justify-between" aria-label="Primary">
        <Link
          to="/"
          className="font-display text-lg font-medium text-ink"
          onClick={() => setMenuOpen(false)}
        >
          Afeefa Malik
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              {isHome ? (
                <a
                  href={`#${link.id}`}
                  onClick={handleLinkClick(link.id)}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`text-sm transition-colors ${
                    activeId === link.id
                      ? 'font-semibold text-ink'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={{ pathname: '/', hash: `#${link.id}` }}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-full bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-[1.5px] w-full bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </Container>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-border/70 bg-bg md:hidden">
          <Container as="ul" className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                {isHome ? (
                  <a
                    href={`#${link.id}`}
                    onClick={handleLinkClick(link.id)}
                    className="block rounded-md px-2 py-3 text-base text-ink"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={{ pathname: '/', hash: `#${link.id}` }}
                    className="block rounded-md px-2 py-3 text-base text-ink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
