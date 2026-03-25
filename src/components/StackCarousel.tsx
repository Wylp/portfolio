import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'
import { useFadeIn } from '#/lib/useFadeIn'

const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'
const SIMPLE = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/'

type StackItem = { name: string; src: string }

function dev(icon: string) { return `${DEVICONS}${icon}` }
function si(icon: string) { return `${SIMPLE}${icon}` }

const row1: StackItem[] = [
  { name: 'React', src: dev('react/react-original.svg') },
  { name: 'TypeScript', src: dev('typescript/typescript-original.svg') },
  { name: 'JavaScript', src: dev('javascript/javascript-original.svg') },
  { name: 'Angular', src: dev('angular/angular-original.svg') },
  { name: 'Next.js', src: dev('nextjs/nextjs-original.svg') },
  { name: 'Node.js', src: dev('nodejs/nodejs-original.svg') },
  { name: 'Express', src: dev('express/express-original.svg') },
  { name: 'NestJS', src: dev('nestjs/nestjs-original.svg') },
  { name: 'Python', src: dev('python/python-original.svg') },
  { name: 'Go', src: dev('go/go-original.svg') },
  { name: 'C', src: dev('c/c-original.svg') },
  { name: 'C++', src: dev('cplusplus/cplusplus-original.svg') },
  { name: 'C#', src: dev('csharp/csharp-original.svg') },
  { name: 'React Native', src: dev('react/react-original.svg') },
  { name: 'TensorFlow', src: dev('tensorflow/tensorflow-original.svg') },
  { name: 'Redux', src: dev('redux/redux-original.svg') },
  { name: 'GraphQL', src: dev('graphql/graphql-plain.svg') },
  { name: 'Tailwind CSS', src: dev('tailwindcss/tailwindcss-original.svg') },
  { name: 'Vite', src: dev('vitejs/vitejs-original.svg') },
  { name: 'Webpack', src: dev('webpack/webpack-original.svg') },
  { name: 'Jest', src: dev('jest/jest-plain.svg') },
]

const row2: StackItem[] = [
  { name: 'Google Cloud', src: dev('googlecloud/googlecloud-original.svg') },
  { name: 'BigQuery', src: si('googlebigquery.svg') },
  { name: 'Cloud PubSub', src: si('googlepubsub.svg') },
  { name: 'AWS', src: dev('amazonwebservices/amazonwebservices-original-wordmark.svg') },
  { name: 'AWS Lambda', src: si('awslambda.svg') },
  { name: 'AWS SQS', src: si('amazonsqs.svg') },
  { name: 'AWS SES', src: si('amazonsimpleemailservice.svg') },
  { name: 'Kubernetes', src: dev('kubernetes/kubernetes-original.svg') },
  { name: 'Docker', src: dev('docker/docker-original.svg') },
  { name: 'Terraform', src: dev('terraform/terraform-original.svg') },
  { name: 'GitHub Actions', src: dev('githubactions/githubactions-original.svg') },
  { name: 'Nginx', src: dev('nginx/nginx-original.svg') },
  { name: 'Linux', src: dev('linux/linux-original.svg') },
  { name: 'PostgreSQL', src: dev('postgresql/postgresql-original.svg') },
  { name: 'MySQL', src: dev('mysql/mysql-original.svg') },
  { name: 'MongoDB', src: dev('mongodb/mongodb-original.svg') },
  { name: 'Redis', src: dev('redis/redis-original.svg') },
  { name: 'Firebase', src: dev('firebase/firebase-original.svg') },
  { name: 'RabbitMQ', src: dev('rabbitmq/rabbitmq-original.svg') },
  { name: 'Grafana', src: dev('grafana/grafana-original.svg') },
  { name: 'Prometheus', src: dev('prometheus/prometheus-original.svg') },
  { name: 'Git', src: dev('git/git-original.svg') },
]

type CategoryKey = 'languages' | 'frameworks' | 'cloud' | 'devops' | 'databases' | 'tools'

const categories: { key: CategoryKey; items: StackItem[] }[] = [
  {
    key: 'languages',
    items: [
      { name: 'TypeScript', src: dev('typescript/typescript-original.svg') },
      { name: 'JavaScript', src: dev('javascript/javascript-original.svg') },
      { name: 'Python', src: dev('python/python-original.svg') },
      { name: 'Go', src: dev('go/go-original.svg') },
      { name: 'C', src: dev('c/c-original.svg') },
      { name: 'C++', src: dev('cplusplus/cplusplus-original.svg') },
      { name: 'C#', src: dev('csharp/csharp-original.svg') },
    ],
  },
  {
    key: 'frameworks',
    items: [
      { name: 'React', src: dev('react/react-original.svg') },
      { name: 'React Native', src: dev('react/react-original.svg') },
      { name: 'Angular', src: dev('angular/angular-original.svg') },
      { name: 'Next.js', src: dev('nextjs/nextjs-original.svg') },
      { name: 'Node.js', src: dev('nodejs/nodejs-original.svg') },
      { name: 'Express', src: dev('express/express-original.svg') },
      { name: 'NestJS', src: dev('nestjs/nestjs-original.svg') },
      { name: 'Redux', src: dev('redux/redux-original.svg') },
      { name: 'GraphQL', src: dev('graphql/graphql-plain.svg') },
    ],
  },
  {
    key: 'cloud',
    items: [
      { name: 'Google Cloud', src: dev('googlecloud/googlecloud-original.svg') },
      { name: 'BigQuery', src: si('googlebigquery.svg') },
      { name: 'Cloud PubSub', src: si('googlepubsub.svg') },
      { name: 'AWS', src: dev('amazonwebservices/amazonwebservices-original-wordmark.svg') },
      { name: 'AWS Lambda', src: si('awslambda.svg') },
      { name: 'AWS SQS', src: si('amazonsqs.svg') },
      { name: 'AWS SES', src: si('amazonsimpleemailservice.svg') },
      { name: 'Firebase', src: dev('firebase/firebase-original.svg') },
    ],
  },
  {
    key: 'devops',
    items: [
      { name: 'Kubernetes', src: dev('kubernetes/kubernetes-original.svg') },
      { name: 'Docker', src: dev('docker/docker-original.svg') },
      { name: 'Terraform', src: dev('terraform/terraform-original.svg') },
      { name: 'GitHub Actions', src: dev('githubactions/githubactions-original.svg') },
      { name: 'Nginx', src: dev('nginx/nginx-original.svg') },
      { name: 'Linux', src: dev('linux/linux-original.svg') },
      { name: 'Git', src: dev('git/git-original.svg') },
    ],
  },
  {
    key: 'databases',
    items: [
      { name: 'PostgreSQL', src: dev('postgresql/postgresql-original.svg') },
      { name: 'MySQL', src: dev('mysql/mysql-original.svg') },
      { name: 'MongoDB', src: dev('mongodb/mongodb-original.svg') },
      { name: 'Redis', src: dev('redis/redis-original.svg') },
      { name: 'RabbitMQ', src: dev('rabbitmq/rabbitmq-original.svg') },
    ],
  },
  {
    key: 'tools',
    items: [
      { name: 'Tailwind CSS', src: dev('tailwindcss/tailwindcss-original.svg') },
      { name: 'Vite', src: dev('vitejs/vitejs-original.svg') },
      { name: 'Webpack', src: dev('webpack/webpack-original.svg') },
      { name: 'Jest', src: dev('jest/jest-plain.svg') },
      { name: 'TensorFlow', src: dev('tensorflow/tensorflow-original.svg') },
      { name: 'Grafana', src: dev('grafana/grafana-original.svg') },
      { name: 'Prometheus', src: dev('prometheus/prometheus-original.svg') },
    ],
  },
]

function CarouselRow({
  items,
  direction,
}: {
  items: StackItem[]
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
              src={item.src}
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
              src={item.src}
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

function ExpandableSkillsGrid() {
  const { t } = useI18n()
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [updateHeight])

  return (
    <div className="max-w-[900px] mx-auto px-6 mt-10">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="group flex items-center gap-2 mx-auto cursor-pointer text-text-muted hover:text-accent transition-colors duration-300"
        aria-expanded={expanded}
        aria-controls="skills-grid"
      >
        <span className="text-[14px] font-semibold tracking-wide">
          {expanded ? t.stack.collapse : t.stack.show_all}
        </span>
        <ChevronDown
          size={18}
          className="transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div
        id="skills-grid"
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ height: expanded ? height : 0 }}
      >
        <div ref={contentRef} className="pt-8 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, catIdx) => (
              <div
                key={cat.key}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: expanded ? 1 : 0,
                  transform: expanded ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: expanded ? `${catIdx * 60}ms` : '0ms',
                }}
              >
                <h3 className="text-[11px] font-semibold tracking-[2px] uppercase text-accent mb-4">
                  {t.stack.categories[cat.key]}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="group/skill flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-surface border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200"
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain grayscale opacity-60 transition-all duration-200 group-hover/skill:grayscale-0 group-hover/skill:opacity-100"
                        loading="lazy"
                      />
                      <span className="text-[13px] font-medium text-text-muted whitespace-nowrap transition-colors duration-200 group-hover/skill:text-text-primary">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function StackCarousel() {
  const { t } = useI18n()
  const ref = useFadeIn<HTMLElement>()

  return (
    <section ref={ref} id="stack" aria-labelledby="stack-heading" className="fade-in-section bg-bg-primary py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{t.stack.label}</SectionLabel>
        <h2 id="stack-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-10">
          {t.stack.headline}
        </h2>
      </div>
      <div>
        <CarouselRow items={row1} direction="left" />
        <CarouselRow items={row2} direction="right" />
      </div>
      <ExpandableSkillsGrid />
    </section>
  )
}
