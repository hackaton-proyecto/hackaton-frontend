import { useAuth } from '../context/AuthContext'
import { navigate } from '../router'

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur shadow-md shadow-blue-900/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            className="text-lg font-semibold text-gray-900 hover:text-blue-900"
            onClick={() => navigate('/')}
            aria-label="Go to home"
          >
            camelCase
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!user && (
            <>
              <button
                className="text-sm font-medium text-[oklch(27.9%_0.041_260.031)] hover:text-[oklch(33%_0.05_260.031)] transition-colors"
                onClick={() => navigate('/login')}
>
                Iniciar Sesión
              </button>
              <button
                className="rounded-md bg-[oklch(27.9%_0.041_260.031)] px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-[oklch(33%_0.05_260.031)] transition-colors"
                onClick={() => navigate('/register')}
>
                  Registrarse
                </button>
            </>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Hi, {user.name || user.email}</span>
              <button
                className="rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-950"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}