import { useEffect, useState } from 'react'
import type { FormEvent, InputHTMLAttributes } from 'react'
import { useAuth } from '../context/AuthContext'
import { Container } from '../components/Container'
import { navigate, navigateReplace } from '../router'

// Componente reutilizable para los campos del formulario
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

function FormField({ id, label, ...props }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="mt-1 block w-full rounded-md border-gray-300 bg-white/50 px-3 py-2 text-gray-900 shadow-sm transition-colors duration-300 focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
      />
    </div>
  )
}

export function Login() {
  const { login, user } = useAuth()
  // Se quitan los valores iniciales para que el formulario empiece vacío.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigateReplace('/')
    }
  }, [user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // --- VALIDACIÓN DE CAMPOS VACÍOS ---
    // Verifica que los campos no estén vacíos antes de continuar.
    if (!email.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.')
      return // Detiene la ejecución si hay un error
    }
    // ------------------------------------

    setLoading(true)
    try {
      await login(email, password)
      let dest = '/home'
      try {
        const saved = localStorage.getItem('post_login_redirect')
        if (saved) {
          dest = saved
          localStorage.removeItem('post_login_redirect')
        }
      } catch {}
      navigateReplace(dest)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Las credenciales son incorrectas.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="register-bg min-h-screen">
      <Container className="flex items-center justify-center py-12 sm:py-16">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-blue-900/20 bg-white/95 p-8 shadow-2xl shadow-blue-900/20 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Bienvenido de nuevo. Accede a tu cuenta.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <FormField
              id="email"
              label="Correo Electrónico"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />

            <FormField
              id="password"
              label="Contraseña"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {error && (
              <p className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[oklch(27.9%_0.041_260.031)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[oklch(32%_0.045_260.031)] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-semibold text-blue-800 hover:text-blue-700 hover:underline"
            >
              Crea una aquí
            </button>
          </p>
        </div>
      </Container>
    </section>
  )
}