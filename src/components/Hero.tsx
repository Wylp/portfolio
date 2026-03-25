import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'

const TERMINAL_LINES = [
  { prompt: true, text: 'kubectl get pods -n production' },
  { header: true, text: 'NAME                              READY   STATUS    RESTARTS   AGE' },
  { text: 'api-gateway-7d4f8b6c9-x2k         1/1     Running   0          52d' },
  { text: 'fleet-tracker-5c8a9d3b1-m7n        1/1     Running   0          52d' },
  { text: 'notification-svc-6f2e1a4-p9q       1/1     Running   0          38d' },
  { text: 'realtime-engine-8b3c2d5e7-k4j      1/1     Running   0          45d' },
  { text: 'auth-service-4e7a1f9c3-r8s         1/1     Running   0          52d' },
  { text: 'telemetry-ingest-2d6b8e4a1-w3x     1/1     Running   0          31d' },
  { text: 'driver-app-api-9c1d3f7b5-y6z       1/1     Running   0          44d' },
  { text: 'pubsub-worker-3a5e9c2d8-t1u        1/1     Running   0          52d' },
  { text: 'cron-scheduler-7f8b4d6a2-v5w       1/1     Running   0          29d' },
  { text: 'metrics-aggregator-1c9e5a3f-h2i    1/1     Running   0          36d' },
] as const

function TerminalWindow() {
  return (
    <div className="w-full rounded-xl border border-border/60 bg-[#1a1b2e] shadow-2xl shadow-black/20 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#151623] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-white/30 font-mono ml-2">production — kubectl</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-[12px] leading-[1.7] overflow-x-auto">
        {TERMINAL_LINES.map((line, i) => {
          if ('prompt' in line && line.prompt) {
            return (
              <div key={i} className="flex items-center gap-0">
                <span className="text-[#28c840]">❯</span>
                <span className="text-white/90 ml-2">{line.text}</span>
              </div>
            )
          }
          if ('header' in line && line.header) {
            return (
              <div key={i} className="text-white/40 mt-2">{line.text}</div>
            )
          }
          return (
            <div key={i} className="text-white/70">
              <span>{line.text.substring(0, 34)}</span>
              <span className="text-[#28c840]">{line.text.substring(34, 42)}</span>
              <span className="text-[#28c840]">{line.text.substring(42, 52)}</span>
              <span className="text-white/40">{line.text.substring(52)}</span>
            </div>
          )
        })}
        <div className="flex items-center gap-0 mt-2">
          <span className="text-[#28c840]">❯</span>
          <span className="w-[2px] h-4 bg-white/60 ml-2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="w-full min-h-[calc(100vh-180px)] flex items-center pb-20">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div>
          <SectionLabel>{t.hero.label}</SectionLabel>
          <h1 className="text-[36px] font-bold tracking-[-0.5px] text-text-primary mb-5 leading-tight">
            {t.hero.headline}
          </h1>
          <p className="text-[15px] text-text-muted leading-relaxed max-w-[560px] mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://linkedin.com/in/alexsander-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-text-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              {t.hero.cta_primary}
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary text-sm font-medium rounded-md hover:bg-bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              {t.hero.cta_secondary}
            </a>
          </div>
        </div>

        {/* Right — terminal */}
        <div className="hidden md:block">
          <TerminalWindow />
        </div>
      </div>
    </section>
  )
}
