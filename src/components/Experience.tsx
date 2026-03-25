import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'
import { useFadeIn } from '#/lib/useFadeIn'

export function Experience() {
  const { t } = useI18n()
  const ref = useFadeIn<HTMLElement>()

  return (
    <section ref={ref} id="experience" aria-labelledby="experience-heading" className="fade-in-section bg-bg-surface py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{t.experience.label}</SectionLabel>
        <h2 id="experience-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-10">
          {t.experience.headline}
        </h2>

        <div className="relative pl-10">
          {/* Vertical line — centered on the 16px circles: pl-10 (40px) - 33px + 8px - 1px = 14px */}
          <div className="absolute left-[14px] top-2 bottom-2 w-[2px] bg-border" />

          {t.experience.roles.map((role: any, i: number) => (
            <div key={i} className={`relative ${i < t.experience.roles.length - 1 ? 'mb-10' : ''}`}>
              {/* Circle indicator — center at 40px - 33px + 8px = 15px from left edge */}
              <div
                className={`absolute left-[-33px] top-1 w-[16px] h-[16px] rounded-full timeline-pulse ${
                  role.current
                    ? 'bg-accent border-[3px] border-[#DBEAFE]'
                    : 'bg-[#94A3B8] border-[3px] border-[#F1F5F9]'
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-full ${role.current ? 'bg-accent/40' : 'bg-[#94A3B8]/40'}`}
                  style={{ animation: 'sonar 2s ease-out infinite' }}
                />
              </div>

              <div className="text-[16px] font-semibold text-text-primary">{role.title}</div>
              <div className="text-[13px] text-text-muted mt-0.5">{role.context}</div>
              <div className="text-[12px] text-text-muted mt-1">{role.period}</div>

              {(role.badges.length > 0 || role.highlights.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {role.badges.map((badge: string, j: number) => (
                    <span key={`b-${j}`} className="text-[11px] px-2.5 py-1 rounded-md bg-[#F1F5F9] text-text-secondary font-medium">
                      {badge}
                    </span>
                  ))}
                  {role.highlights.map((hl: string, j: number) => (
                    <span key={`h-${j}`} className="text-[11px] px-2.5 py-1 rounded-md bg-success-light text-success font-semibold">
                      {hl}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
