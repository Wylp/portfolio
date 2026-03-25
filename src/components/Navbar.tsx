import { useState } from 'react'
import { useI18n } from '#/i18n/context'

const navLinks = [
  { href: '#about', key: 'about' as const },
  { href: '#experience', key: 'experience' as const },
  { href: '#stack', key: 'stack' as const },
  { href: '#projects', key: 'projects' as const },
  { href: '#contact', key: 'contact' as const },
]

export function Navbar() {
  const { locale, t, toggleLocale } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg-surface border-b border-border">
      <div className="max-w-[900px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bold text-text-primary text-lg select-none rounded focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2">
          alexsander<span className="text-accent">.</span>dev
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition rounded focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              {t.nav[link.key]}
            </a>
          ))}

          {/* Locale toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 border border-border rounded-full px-3 py-1 text-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
          >
            <span className={locale === 'pt' ? 'font-bold text-accent' : 'text-text-muted'}>
              PT
            </span>
            <span className="text-text-muted">|</span>
            <span className={locale === 'en' ? 'font-bold text-accent' : 'text-text-muted'}>
              EN
            </span>
          </button>
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden p-2 text-text-primary cursor-pointer focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 rounded"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="absolute top-0 right-0 h-full w-[280px] bg-bg-surface shadow-xl flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-border">
              <span className="font-bold text-text-primary text-lg">
                alexsander<span className="text-accent">.</span>dev
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-text-primary cursor-pointer rounded focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-2 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-base text-text-secondary hover:text-text-primary transition py-2 rounded focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </div>

            {/* Locale toggle at bottom */}
            <div className="mt-auto px-6 pb-8">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1 border border-border rounded-full px-3 py-1 text-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
              >
                <span className={locale === 'pt' ? 'font-bold text-accent' : 'text-text-muted'}>
                  PT
                </span>
                <span className="text-text-muted">|</span>
                <span className={locale === 'en' ? 'font-bold text-accent' : 'text-text-muted'}>
                  EN
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
