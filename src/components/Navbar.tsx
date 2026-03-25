import { useEffect, useState } from 'react'
import { useI18n } from '#/i18n/context'

const navLinks = [
  { href: '#about', key: 'about' as const },
  { href: '#experience', key: 'experience' as const },
  { href: '#stack', key: 'stack' as const },
  { href: '#projects', key: 'projects' as const },
]

export function Navbar() {
  const { locale, t, toggleLocale } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll and handle Escape key when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false)
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [menuOpen])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg-surface/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Left — name as subtle wordmark */}
        <a href="#" className="select-none rounded text-[13px] text-text-muted font-medium tracking-wide hover:text-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0">
            <rect x="3" y="14" width="4" height="7" rx="1" fill="currentColor" opacity="0.3" />
            <rect x="10" y="9" width="4" height="12" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="17" y="4" width="4" height="17" rx="1" fill="currentColor" opacity="0.8" />
          </svg>
          Alexsander de Oliveira Gusmão
        </a>

        {/* Center — Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-[13px] text-text-muted hover:text-text-primary px-3 py-1.5 rounded-md hover:bg-bg-primary/80 transition-all focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>

        {/* Right — social links + locale toggle + mobile hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://linkedin.com/in/alexsander-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-text-muted hover:text-text-primary bg-bg-primary/60 hover:bg-bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/Wylp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-text-muted hover:text-text-primary bg-bg-primary/60 hover:bg-bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span className="text-[11px] font-semibold">+8k</span>
            </a>
          </div>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium cursor-pointer bg-bg-primary/60 hover:bg-bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
          >
            <span className={locale === 'pt' ? 'text-text-primary font-bold' : 'text-text-muted'}>
              PT
            </span>
            <span className="text-border">/</span>
            <span className={locale === 'en' ? 'text-text-primary font-bold' : 'text-text-muted'}>
              EN
            </span>
          </button>

          <button
            className="md:hidden p-2 text-text-muted hover:text-text-primary cursor-pointer focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 rounded-md hover:bg-bg-primary/80 transition-all"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </button>
        </div>
      </div>

    </nav>

      {/* Mobile modal overlay — outside nav to avoid h-16 clipping */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-bg-surface shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
            <span className="text-[13px] text-text-muted font-medium">
              Alexsander Gusmao
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-text-muted hover:text-text-primary cursor-pointer rounded-md hover:bg-bg-primary/80 transition-all focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={handleLinkClick}
                className="text-[14px] text-text-muted hover:text-text-primary px-3 py-2.5 rounded-md hover:bg-bg-primary/80 transition-all focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>

          <div className="mt-auto px-6 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <a
                href="https://linkedin.com/in/alexsander-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-text-muted hover:text-text-primary bg-bg-primary/60 hover:bg-bg-primary transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/Wylp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-text-muted hover:text-text-primary bg-bg-primary/60 hover:bg-bg-primary transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span className="text-[11px] font-semibold">+8k</span>
              </a>
            </div>
            <p className="text-[11px] text-text-muted/60 font-medium tracking-wider mb-3">
              Alexsander de Oliveira Gusmao
            </p>
            <button
              onClick={() => { toggleLocale(); setMenuOpen(false) }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium cursor-pointer bg-bg-primary/60 hover:bg-bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              <span className={locale === 'pt' ? 'text-text-primary font-bold' : 'text-text-muted'}>
                PT
              </span>
              <span className="text-border">/</span>
              <span className={locale === 'en' ? 'text-text-primary font-bold' : 'text-text-muted'}>
                EN
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
