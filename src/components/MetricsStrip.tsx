import { useI18n } from '#/i18n/context'

export function MetricsStrip() {
  const { t } = useI18n()

  return (
    <section className="max-w-[900px] mx-auto px-6 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {/* Uptime */}
        <div className="md:border-r border-border md:pr-6">
          <div className="text-[32px] font-bold text-text-primary leading-none">{t.metrics.uptime.value}</div>
          <div className="text-xs text-text-muted mt-1 mb-2">{t.metrics.uptime.label}</div>
          <span className="inline-block text-[10px] font-semibold bg-success-light text-success rounded-full px-2.5 py-0.5">
            ↑ {t.metrics.uptime.badge}
          </span>
        </div>

        {/* Cost */}
        <div className="md:border-r border-border md:px-6">
          <div className="text-[32px] font-bold text-text-primary leading-none">{t.metrics.cost.value}</div>
          <div className="text-xs text-text-muted mt-1 mb-2">{t.metrics.cost.label}</div>
          <span className="inline-block text-[10px] font-semibold bg-success-light text-success rounded-full px-2.5 py-0.5">
            ↑ {t.metrics.cost.badge}
          </span>
        </div>

        {/* Performance - 2 badges stacked */}
        <div className="md:border-r border-border md:px-6">
          <div className="text-[32px] font-bold text-text-primary leading-none">{t.metrics.performance.value}</div>
          <div className="text-xs text-text-muted mt-1 mb-2">{t.metrics.performance.label}</div>
          <div className="flex flex-col gap-1">
            {t.metrics.performance.badges.map((badge: string, i: number) => (
              <span key={i} className="inline-block text-[10px] font-semibold bg-success-light text-success rounded-full px-2.5 py-0.5 w-fit">
                ↑ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Deploys - blue badge */}
        <div className="md:pl-6">
          <div className="text-[32px] font-bold text-text-primary leading-none">{t.metrics.deploys.value}</div>
          <div className="text-xs text-text-muted mt-1 mb-2">{t.metrics.deploys.label}</div>
          <span className="inline-block text-[10px] font-semibold bg-accent-light text-accent rounded-full px-2.5 py-0.5">
            → {t.metrics.deploys.badge}
          </span>
        </div>
      </div>
    </section>
  )
}
