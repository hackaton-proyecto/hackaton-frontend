import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { Container } from '../components/Container'
import { navigate } from '../router'

export function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('No se pudo iniciar sesión (placeholder).')
    }
  }

  return (
    <section className="register-bg">
      <Container className="py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-blue-900 bg-white/95 p-6 shadow-2xl shadow-blue-900/20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
   

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="rounded-md bg-[oklch(27.9%_0.041_260.031)] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[oklch(32%_0.045_260.031)] transition-colors"
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="rounded-md bg-[oklch(27.9%_0.041_260.031)] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[oklch(32%_0.045_260.031)] transition-colors"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}