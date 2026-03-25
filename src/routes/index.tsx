import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '#/components/Navbar'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-[900px] mx-auto px-6">
          <p>Portfolio sections coming soon...</p>
        </div>
      </main>
    </>
  )
}
