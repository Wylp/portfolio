import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { I18nProvider } from '#/i18n/context'
import { I18N_INIT_SCRIPT } from '#/i18n/init-script'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Alexsander Gusmão — Software Architect & Tech Lead' },
      { name: 'description', content: 'Arquiteto de software com 5 anos de experiência liderando equipes e escalando plataformas SaaS com 10k+ usuários diários e 99.99% de uptime.' },
      { property: 'og:title', content: 'Alexsander Gusmão — Software Architect & Tech Lead' },
      { property: 'og:description', content: 'Arquiteto de software com 5 anos de experiência liderando equipes e escalando plataformas SaaS com 10k+ usuários diários e 99.99% de uptime.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://alexsander.dev' },
      { property: 'og:image', content: '/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: 'https://alexsander.dev' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: I18N_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}
