import { useAuth } from '../context/AuthContext'
import { Container } from '../components/Container'
import { navigate } from '../router'
import { UsersChart } from '../components/charts/UsersChart'

export function Home() {
  const { user } = useAuth()

  return (
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
          <div className="mt-10 flex items-center justify-center gap-x-4">
            {!user ? (
              <>
                <button
                  className="rounded-md bg-[oklch(27.9%_0.041_260.031)] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[oklch(32%_0.045_260.031)] transition-colors"
                  onClick={() => navigate('/register')}
                >
                  Empezar
                </button>
                <button
                  className="rounded-md bg-[oklch(27.9%_0.041_260.031)] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[oklch(32%_0.045_260.031)] transition-colors"
                  onClick={() => navigate('/Profile')}
                >
                  Ya tengo cuenta
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-700">Sesión iniciada como {user.email}</span>
                <button
                  className="rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-950"
                  onClick={() => navigate('/register')}
                >
                  Crear otra cuenta
                </button>
              </>
            )}
          </div>
        </div>

        {user && (
          <div className="mt-16">
            <UsersChart />
          </div>
        )}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {['Rápido', 'Modular', 'Escalable'].map((title) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur laudantium labore voluptatibus, quos nostrum commodi vero aperiam animi accusantium doloremque atque dignissimos. Blanditiis doloremque maiores voluptatum fugiat adipisci maxime odio!
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}