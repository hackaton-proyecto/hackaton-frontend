import { Container } from '../components/Container'
import { navigate } from '../router'

export function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Página no encontrada</h2>
      <p className="mt-2 text-gray-600">La ruta solicitada no existe.</p>
      <div className="mt-8">
        <button
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
      </div>
    </Container>
  )
}
