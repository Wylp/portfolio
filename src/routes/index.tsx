import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '#/components/Navbar'
import { Hero } from '#/components/Hero'
import { MetricsStrip } from '#/components/MetricsStrip'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <MetricsStrip />
      </main>
    </>
  )
}
