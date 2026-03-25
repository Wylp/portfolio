import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'

export function About() {
  const { t } = useI18n()

  const facts = [t.about.facts.education, t.about.facts.location, t.about.facts.languages]

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-bg-primary py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{t.about.label}</SectionLabel>
        <h2 id="about-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-10">
          {t.about.headline}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            {t.about.text_col1.split('\n\n').map((p: string, i: number) => (
              <p key={i} className="text-[14px] text-text-secondary leading-[1.8] mb-4">{p}</p>
            ))}
          </div>
          <div>
            {t.about.text_col2.split('\n\n').map((p: string, i: number) => (
              <p key={i} className="text-[14px] text-text-secondary leading-[1.8] mb-4">{p}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {facts.map((fact, i) => (
            <div key={i} className="border border-border rounded-lg px-4 py-2">
              <div className="text-[11px] text-text-muted font-medium">{fact.label}</div>
              <div className="text-[13px] text-text-primary font-medium">{fact.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
