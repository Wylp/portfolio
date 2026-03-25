import { GraduationCap, Award, MapPin, Globe } from 'lucide-react'
import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'
import { useFadeIn } from '#/lib/useFadeIn'

type EducationItem = {
  type?: string
  degree: string
  institution: string
  status: string
  current: boolean
  badges: string[]
}

function getCardStyle(edu: EducationItem) {
  if (edu.current) return { card: 'border-accent/30 bg-accent-light/50', icon: 'bg-accent/10', iconColor: 'text-accent', badge: 'bg-accent/10 text-accent' }
  if (edu.type === 'award') return { card: 'border-project-amber/30 bg-project-amber-light/50', icon: 'bg-project-amber/10', iconColor: 'text-project-amber', badge: 'bg-project-amber/10 text-project-amber' }
  return { card: 'border-border bg-bg-surface', icon: 'bg-bg-primary', iconColor: 'text-text-muted', badge: 'bg-[#F1F5F9] text-text-secondary' }
}

export function About() {
  const { t } = useI18n()
  const ref = useFadeIn<HTMLElement>()

  const education = t.about.education as EducationItem[]
  const details = t.about.details as { location: string; languages: string }

  return (
    <section ref={ref} id="about" aria-labelledby="about-heading" className="fade-in-section bg-bg-primary py-20">
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

        {/* Education & Awards */}
        <div className="mt-10 space-y-3">
          {education.map((edu, i) => {
            const style = getCardStyle(edu)
            const isAward = edu.type === 'award'
            const Icon = isAward ? Award : GraduationCap

            return (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-lg border p-4 ${style.card}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${style.icon}`}>
                  <Icon size={20} className={style.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold text-text-primary">{edu.degree}</span>
                    {edu.current && (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded-full px-2 py-0.5">
                        {edu.status}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-text-muted">{edu.institution}</p>
                  {!edu.current && (
                    <p className="text-[12px] text-text-muted/70 mt-0.5">{edu.status}</p>
                  )}
                  {edu.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {edu.badges.map((badge, j) => (
                        <span
                          key={j}
                          className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${style.badge}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Location + Languages — compact row */}
        <div className="flex flex-wrap gap-5 mt-5">
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            <MapPin size={14} className="text-text-muted/60" />
            <span>{details.location}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            <Globe size={14} className="text-text-muted/60" />
            <span>{details.languages}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
