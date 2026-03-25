import { Linkedin, Github, Mail } from 'lucide-react'
import { useI18n } from '#/i18n/context'

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/in/alexsander-dev', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/PLACEHOLDER', label: 'GitHub' },
  { icon: Mail, href: 'mailto:PLACEHOLDER@email.com', label: 'Email' },
]

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-footer-bg text-footer-text py-12">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:text-left text-center">
          <div>
            <div className="text-lg font-bold">
              alexsander<span className="text-accent">.</span>dev
            </div>
            <div className="text-footer-muted text-sm">{t.footer.tagline}</div>
          </div>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition"
              >
                <Icon size={16} className="text-footer-text" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 my-6" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:text-left text-center">
          <span className="text-footer-subtle text-xs">{t.footer.copyright}</span>
          <span className="text-footer-subtle text-xs">{t.footer.built_with}</span>
        </div>
      </div>
    </footer>
  )
}
