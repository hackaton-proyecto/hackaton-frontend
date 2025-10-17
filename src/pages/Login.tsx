import { useEffect, useState } from 'react'
import type { FormEvent, InputHTMLAttributes } from 'react'
import { useAuth } from '../context/AuthContext'
import { Container } from '../components/Container'
import { navigate, navigateReplace } from '../router'


import { motion } from 'framer-motion'

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

    if (!email.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.')
      return
    }

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
    <div className="flex flex-col min-h-screen register-bg overflow-hidden">
    

      <section className="flex-grow flex items-center justify-center">
        <Container className="flex items-center justify-center py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto w-full max-w-md rounded-2xl border border-blue-900/20 bg-white/95 p-8 shadow-2xl shadow-blue-900/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Iniciar sesión
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Bienvenido de nuevo. Accede a tu cuenta.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
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
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-[oklch(27.9%_0.041_260.031)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[oklch(32%_0.045_260.031)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </motion.div>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 text-center text-sm text-gray-600"
            >
              ¿No tienes una cuenta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-semibold text-blue-800 hover:text-blue-700 hover:underline"
              >
                Crea una aquí
              </button>
            </motion.p>
          </motion.div>
        </Container>
      </section>

  
    </div>
  )
}
