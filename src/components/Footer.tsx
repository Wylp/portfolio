import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { useI18n } from '#/i18n/context'

const socials = [
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/alexsander-dev', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/Wylp', label: 'GitHub' },
  { icon: Mail, href: 'mailto:alexsandeveloper@gmail.com', label: 'Email' },
]

const navKeys = ['about', 'experience', 'stack', 'projects'] as const

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16">
          {/* Brand column */}
          <div className="max-w-[320px]">
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0">
                <rect x="3" y="14" width="4" height="7" rx="1" fill="currentColor" opacity="0.3" />
                <rect x="10" y="9" width="4" height="12" rx="1" fill="currentColor" opacity="0.5" />
                <rect x="17" y="4" width="4" height="17" rx="1" fill="currentColor" opacity="0.8" />
              </svg>
              <span className="text-[15px] font-semibold tracking-tight">
                Alexsander de Oliveira Gusmão
              </span>
            </div>
            <p className="text-[13px] text-footer-muted leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav column */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-footer-muted mb-4">
              {t.nav.about === 'Sobre' ? 'Navegação' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5">
              {navKeys.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-[13px] text-footer-subtle hover:text-footer-text transition-colors"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-footer-muted mb-4">
              {t.nav.about === 'Sobre' ? 'Conecte-se' : 'Connect'}
            </h3>
            <ul className="space-y-2.5">
              {socials.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-footer-subtle hover:text-footer-text transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <span className="text-[11px] text-footer-subtle">
            {t.footer.copyright}
          </span>

          <div className="flex items-center gap-1.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg"
              >
                <Icon size={14} className="text-footer-muted" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
