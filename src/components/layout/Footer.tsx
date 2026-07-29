import { Link } from 'react-router-dom'
import { person, socialLinks } from '../../data/siteContent'
import { Container } from '../ui/Container'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="flex flex-col items-center gap-stack-xs py-stack-md text-center md:flex-row md:justify-between md:text-left">
        <Link to="/" className="font-display text-base font-medium text-ink">
          {person.name}
        </Link>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-ink-soft">© {year} {person.name}</p>
      </Container>
    </footer>
  )
}
