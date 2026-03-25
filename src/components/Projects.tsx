import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'
import { useFadeIn } from '#/lib/useFadeIn'

type TerminalLine = {
  prompt?: boolean
  header?: boolean
  success?: boolean
  dim?: boolean
  accent?: string
  text: string
}

const TERMINAL_DATA: {
  title: string
  lines: TerminalLine[]
}[] = [
  {
    title: 'fleet-api — health-check',
    lines: [
      { prompt: true, text: 'curl -s https://fleet-api.io/health | jq' },
      { dim: true, text: '{' },
      { text: '  "status": ', accent: '"healthy",' },
      { text: '  "uptime": ', accent: '"99.99%",' },
      { text: '  "active_users": ', accent: '10847,' },
      { text: '  "services": ', accent: '60,' },
      { text: '  "avg_response": ', accent: '"45ms"' },
      { dim: true, text: '}' },
    ],
  },
  {
    title: 'fleet-app — eas-cli',
    lines: [
      { prompt: true, text: 'eas build --platform all --profile prod' },
      { dim: true, text: '' },
      { success: true, text: '✔ Build completed successfully' },
      { text: '  Platform   ', accent: 'iOS (arm64) + Android (aab)' },
      { text: '  Bundle     ', accent: '28.4 MB / 22.1 MB' },
      { text: '  Tests      ', accent: '148 passed, 0 failed' },
      { text: '  OTA        ', accent: 'Ready for submission' },
    ],
  },
  {
    title: 'production — kubectl',
    lines: [
      { prompt: true, text: 'kubectl get ns --no-headers | wc -l' },
      { accent: '60', text: '' },
      { prompt: true, text: 'kubectl top nodes' },
      { header: true, text: 'NAME           CPU   MEM' },
      { text: 'node-pool-1    ', accent: '34%   52%' },
      { text: 'node-pool-2    ', accent: '28%   47%' },
      { text: 'node-pool-3    ', accent: '31%   49%' },
    ],
  },
  {
    title: 'metrics-api — curl',
    lines: [
      { prompt: true, text: 'curl -s :4000/api/metrics/team | jq' },
      { dim: true, text: '{' },
      { text: '  "velocity": ', accent: '47 pts/sprint,' },
      { text: '  "cycle_time": ', accent: '"2.1 days",' },
      { text: '  "deploy_freq": ', accent: '"10/week",' },
      { text: '  "lead_time": ', accent: '"4.2h",' },
      { text: '  "mttr": ', accent: '"< 15min"' },
      { dim: true, text: '}' },
    ],
  },
  {
    title: 'telemetry-ingest — prometheus',
    lines: [
      { prompt: true, text: 'promql \'rate(points_total[24h])\'' },
      { dim: true, text: '{' },
      { text: '  "today": ', accent: '104,382,917,' },
      { text: '  "throughput": ', accent: '"1,157 pts/sec",' },
      { text: '  "p99_latency": ', accent: '"18ms",' },
      { text: '  "queues": ', accent: '"pubsub + sqs",' },
      { text: '  "errors_24h": ', accent: '0' },
      { dim: true, text: '}' },
    ],
  },
  {
    title: 'fleet-db — psql',
    lines: [
      { prompt: true, text: 'SELECT pg_size_pretty(pg_total_size(\'points\'))' },
      { accent: '12.4 TB', text: '' },
      { prompt: true, text: 'SELECT count(*) FROM telemetry_points' },
      { accent: '247,839,482,103', text: '' },
      { prompt: true, text: '\\timing on → SELECT * WHERE vehicle_id=42' },
      { text: '  rows: ', accent: '2,847,291' },
      { text: '  time: ', accent: '3.2s ✔' },
    ],
  },
]

const colorMap: Record<string, { label: string; tag: string; tagBg: string; termAccent: string }> = {
  blue: { label: 'text-accent', tag: 'text-accent', tagBg: 'bg-accent-light', termAccent: '#60a5fa' },
  purple: { label: 'text-project-purple', tag: 'text-project-purple', tagBg: 'bg-project-purple-light', termAccent: '#a78bfa' },
  green: { label: 'text-project-green', tag: 'text-project-green', tagBg: 'bg-project-green-light', termAccent: '#34d399' },
  amber: { label: 'text-project-amber', tag: 'text-project-amber', tagBg: 'bg-project-amber-light', termAccent: '#fbbf24' },
}

function MiniTerminal({ title, lines, accentColor }: { title: string; lines: TerminalLine[]; accentColor: string }) {
  return (
    <div className="h-full flex flex-col bg-[#1a1b2e] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#151623] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] text-white/30 font-mono ml-1">{title}</span>
      </div>

      {/* Content */}
      <div className="px-4 py-3 font-mono text-[11px] leading-[1.65] overflow-x-auto flex-1 flex flex-col justify-center">
        {lines.map((line, i) => {
          if (line.prompt) {
            return (
              <div key={i} className="flex items-center gap-0">
                <span className="text-[#28c840]">❯</span>
                <span className="text-white/90 ml-1.5">{line.text}</span>
              </div>
            )
          }
          if (line.header) {
            return <div key={i} className="text-white/40">{line.text}</div>
          }
          if (line.success) {
            return <div key={i} className="text-[#28c840]">{line.text}</div>
          }
          if (line.dim && !line.accent) {
            return <div key={i} className="text-white/30">{line.text || '\u00A0'}</div>
          }
          return (
            <div key={i} className="text-white/50">
              {line.text}
              {line.accent && <span style={{ color: accentColor }}>{line.accent}</span>}
            </div>
          )
        })}
        <div className="flex items-center gap-0 mt-0.5">
          <span className="text-[#28c840]">❯</span>
          <span className="w-[2px] h-3 bg-white/60 ml-1.5 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const { t } = useI18n()
  const ref = useFadeIn<HTMLElement>()

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-heading" className="fade-in-section bg-bg-surface py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>{t.projects.label}</SectionLabel>
        <h2 id="projects-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-10">
          {t.projects.headline}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {t.projects.items.map((item: any, i: number) => {
            const colors = colorMap[item.color] || colorMap.blue
            const terminal = TERMINAL_DATA[i]
            const isRightColumn = i % 2 === 1

            return (
              <div
                key={i}
                className={`bg-bg-primary border border-border rounded-[10px] overflow-hidden flex flex-col ${isRightColumn ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Terminal — flush to card edge, full height */}
                {terminal && (
                  <div className={`md:w-[50%] shrink-0 ${isRightColumn ? 'md:rounded-r-[10px]' : 'md:rounded-l-[10px]'} overflow-hidden`}>
                    <MiniTerminal
                      title={terminal.title}
                      lines={terminal.lines}
                      accentColor={colors.termAccent}
                    />
                  </div>
                )}

                {/* Project info */}
                <div className="p-6 flex-1 flex flex-col min-w-0">
                  <div className={`text-[11px] tracking-[1.5px] uppercase font-semibold mb-2 ${colors.label}`}>
                    {item.category}
                  </div>
                  <h3 className="text-[17px] font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-[13px] text-text-muted leading-[1.7] mb-5 flex-1">{item.description}</p>

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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
