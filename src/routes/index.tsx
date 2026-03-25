import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '#/components/Navbar'
import { Hero } from '#/components/Hero'
import { MetricsStrip } from '#/components/MetricsStrip'
import { About } from '#/components/About'
import { Experience } from '#/components/Experience'
import { StackCarousel } from '#/components/StackCarousel'
import { Projects } from '#/components/Projects'

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
        <About />
        <Experience />
        <StackCarousel />
        <Projects />
      </main>
    </>
  )
}
