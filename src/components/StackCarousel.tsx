import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'

const row1 = [
  { name: 'React', icon: 'react/react-original.svg' },
  { name: 'TypeScript', icon: 'typescript/typescript-original.svg' },
  { name: 'Angular', icon: 'angular/angular-original.svg' },
  { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
  { name: 'Express', icon: 'express/express-original.svg' },
  { name: 'Redux', icon: 'redux/redux-original.svg' },
  { name: 'Vite', icon: 'vitejs/vitejs-original.svg' },
  { name: 'React Native', icon: 'react/react-original.svg' },
  { name: 'Expo', icon: 'nodejs/nodejs-original.svg' },
]

const row2 = [
  { name: 'Google Cloud', icon: 'googlecloud/googlecloud-original.svg' },
  { name: 'AWS', icon: 'amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Kubernetes', icon: 'kubernetes/kubernetes-original.svg' },
  { name: 'Docker', icon: 'docker/docker-original.svg' },
  { name: 'MySQL', icon: 'mysql/mysql-original.svg' },
  { name: 'PostgreSQL', icon: 'postgresql/postgresql-original.svg' },
  { name: 'Redis', icon: 'redis/redis-original.svg' },
  { name: 'BigQuery', icon: 'googlecloud/googlecloud-original.svg' },
  { name: 'PubSub', icon: 'googlecloud/googlecloud-original.svg' },
  { name: 'GitHub', icon: 'github/github-original.svg' },
]

function CarouselRow({
  items,
  direction,
}: {
  items: typeof row1
  direction: 'left' | 'right'
}) {
  const speed = direction === 'left' ? '35s' : '30s'
  const animName = direction === 'left' ? 'scroll-left' : 'scroll-right'

  return (
    <div className="carousel-mask overflow-hidden py-4 group">
      <div
        className="flex gap-12 w-max group-hover:[animation-play-state:paused] carousel-track"
        style={{ animation: `${animName} ${speed} linear infinite` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="group/item flex items-center gap-2.5 shrink-0 cursor-default transition-transform duration-300 hover:scale-[1.08]"
          >
            <img
              src={`${CDN}${item.icon}`}
              alt={item.name}
              width={32}
              height={32}
              className="w-8 h-8 object-contain grayscale opacity-50 transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100"
              loading="lazy"
            />
            <span className="text-[15px] font-medium text-[#94A3B8] whitespace-nowrap transition-colors duration-300 group-hover/item:text-text-primary">
              {item.name}
            </span>
          </div>
        ))}
        {items.map((item, i) => (
          <div
            key={`dup-${i}`}
            aria-hidden="true"
            className="group/item flex items-center gap-2.5 shrink-0 cursor-default transition-transform duration-300 hover:scale-[1.08]"
          >
            <img
              src={`${CDN}${item.icon}`}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 object-contain grayscale opacity-50 transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100"
              loading="lazy"
            />
            <span className="text-[15px] font-medium text-[#94A3B8] whitespace-nowrap transition-colors duration-300 group-hover/item:text-text-primary">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StackCarousel() {
  const { t } = useI18n()

  return (
    <section id="stack" aria-labelledby="stack-heading" className="bg-bg-primary py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{t.stack.label}</SectionLabel>
        <h2 id="stack-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-10">
          {t.stack.headline}
        </h2>
      </div>
      <div className="max-w-[1200px] mx-auto">
        <CarouselRow items={row1} direction="left" />
        <CarouselRow items={row2} direction="right" />
      </div>
    </section>
  )
}
