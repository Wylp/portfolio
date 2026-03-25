import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="max-w-[900px] mx-auto px-6 pt-20 pb-15">
      <SectionLabel>{t.hero.label}</SectionLabel>
      <h1 className="text-[36px] font-bold tracking-[-0.5px] text-text-primary mb-5 leading-tight">
        {t.hero.headline}
      </h1>
      <p className="text-[15px] text-text-muted leading-relaxed max-w-[560px] mb-8">
        {t.hero.subtitle}
      </p>
      <div className="flex gap-3">
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-text-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          {t.hero.cta_primary}
        </a>
        <a
          href="#projects"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary text-sm font-medium rounded-md hover:bg-bg-primary transition-colors"
        >
          {t.hero.cta_secondary}
        </a>
      </div>
    </section>
  )
}
