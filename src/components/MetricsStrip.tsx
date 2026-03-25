import { useI18n } from '#/i18n/context'
import { useFadeIn } from '#/lib/useFadeIn'

type MetricKey = 'uptime' | 'cost' | 'performance' | 'deploys'

const metrics: { key: MetricKey; color: 'green' | 'blue' }[] = [
  { key: 'uptime', color: 'green' },
  { key: 'cost', color: 'green' },
  { key: 'performance', color: 'green' },
  { key: 'deploys', color: 'blue' },
]

const badgeStyles = {
  green: 'bg-success-light text-success',
  blue: 'bg-accent-light text-accent',
}

const prefixes = { green: '↑', blue: '→' }

export function MetricsStrip() {
  const { t } = useI18n()
  const ref = useFadeIn<HTMLElement>()

  return (
    <section ref={ref} className="fade-in-section px-12 md:px-20 -mt-8 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 text-center">
        {metrics.map((metric, i) => {
          const data = t.metrics[metric.key]
          const isLast = i === metrics.length - 1
          const badges = data.badges as string[]

          return (
            <div
              key={metric.key}
              className={`${!isLast ? 'md:border-r border-border' : ''} ${i === 0 ? 'md:pr-6' : isLast ? 'md:pl-6' : 'md:px-6'}`}
            >
              <div className="text-[32px] font-bold text-text-primary leading-none">{data.value}</div>
              <div className="text-xs text-text-muted mt-1 mb-3">{data.label}</div>
              <div className="flex flex-col gap-1.5 items-center">
                {badges.map((badge: string, j: number) => (
                  <span
                    key={j}
                    className={`inline-block text-[13px] font-medium rounded-full px-3.5 py-1 ${badgeStyles[metric.color]}`}
                  >
                    {prefixes[metric.color]} {badge}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
