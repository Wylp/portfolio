import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'

const colorMap: Record<string, { bar: string; label: string; tag: string; tagBg: string }> = {
  blue: { bar: 'bg-accent', label: 'text-accent', tag: 'text-accent', tagBg: 'bg-accent-light' },
  purple: { bar: 'bg-project-purple', label: 'text-project-purple', tag: 'text-project-purple', tagBg: 'bg-project-purple-light' },
  green: { bar: 'bg-project-green', label: 'text-project-green', tag: 'text-project-green', tagBg: 'bg-project-green-light' },
  amber: { bar: 'bg-project-amber', label: 'text-project-amber', tag: 'text-project-amber', tagBg: 'bg-project-amber-light' },
}

export function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-bg-surface py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{t.projects.label}</SectionLabel>
        <h2 id="projects-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-10">
          {t.projects.headline}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {t.projects.items.map((item: any, i: number) => {
            const colors = colorMap[item.color] || colorMap.blue
            return (
              <div key={i} className="bg-bg-primary border border-border rounded-[10px] p-7 relative overflow-hidden">
                {/* Top color bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] ${colors.bar}`} />

                <div className={`text-[11px] tracking-[1.5px] uppercase font-semibold mb-2 ${colors.label}`}>
                  {item.category}
                </div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-[13px] text-text-muted leading-[1.7] mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.techs.map((tech: string, j: number) => (
                    <span key={j} className={`text-[11px] px-2 py-0.5 rounded font-medium ${colors.tagBg} ${colors.tag}`}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {item.metrics.map((metric: string, j: number) => (
                    <span key={j} className="text-[11px] text-success font-semibold">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
