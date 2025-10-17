import { useState } from 'react'
import type { FormEvent, InputHTMLAttributes } from 'react'
import { useAuth } from '../context/AuthContext'
import { Container } from '../components/Container'
import { navigate } from '../router'
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

export function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'Inversor' | 'Emprendedor' | ''>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!role) {
      setError('Debe seleccionar un rol para continuar.')
      return
    }

    setLoading(true)
    try {
      await register(
        name,
        lastName,
        role as 'Inversor' | 'Emprendedor',
        email,
        password
      )
      navigate('/')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No se pudo completar el registro.'
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
              Crear una cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Únete a nuestra comunidad de innovadores.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <FormField
                id="name"
                label="Nombre"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
              />
              <FormField
                id="lastName"
                label="Apellido"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-600"
              >
                Rol
              </label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as 'Inversor' | 'Emprendedor' | '')
                }
                className="mt-1 block w-full rounded-md border-gray-300 bg-white/50 px-3 py-2 text-gray-900 shadow-sm transition-colors duration-300 focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
              >
                <option value="" disabled>
                  Seleccione su rol...
                </option>
                <option value="Inversor">Soy Inversor</option>
                <option value="Emprendedor">Soy Emprendedor</option>
              </select>
            </div>

            <FormField
              id="email"
              label="Correo Electrónico"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <FormField
              id="password"
              label="Contraseña"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
                {loading ? 'Registrando...' : 'Registrarme'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-semibold text-blue-800 hover:text-blue-700 hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </Container>
    </section>
  )
} 