import { Container } from '../components/Container'
import { ShowcaseCards } from '../components/ShowcaseCards'
import { FloatingActionButton } from "./../components/SumitEmpre"
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-indigo-50" />
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              camelCase - Conecta Inversores y Emprendedores
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Plataforma dedicada a conectar inversores con emprendedores. Regístrate
              para descubrir oportunidades de inversión o presentar tu proyecto.
            </p>
          </div>

          <ShowcaseCards />

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {['Rápido', 'Modular', 'Escalable'].map((title) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur laudantium labore voluptatibus, quos nostrum commodi vero aperiam animi accusantium doloremque atque dignissimos. Blanditiis doloremque mayores voluptatum fugiat adipisci maxime odio!
                </p>
              </div>
            ))}
          </div>
        </Container>
        <FloatingActionButton />
      </section>
      <Footer />
    </>
  )
}

export default Home