import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { navigate } from '../router'

export function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur shadow-md shadow-blue-900/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            className="text-lg font-semibold text-gray-900 hover:text-blue-900"
            onClick={() => navigate('/home')}
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
            <>
     
              <button
                onClick={() => navigate('/chatlist')}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                aria-label="Ver conversaciones"
                title="Conversaciones"
              >
               
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M7.5 3.75A4.5 4.5 0 003 8.25v7.5A4.5 4.5 0 007.5 20.25h.75v2.25a.75.75 0 001.28.53L13.06 20.25H16.5A4.5 4.5 0 0021 15.75v-7.5A4.5 4.5 0 0016.5 3.75h-9z" />
                </svg>

          
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
                  onClick={() => setOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  title={user.email}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </button>

                {open && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg"
                  >
                    <button
                      className="block w-full px-3 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setOpen(false)
                        navigate('/profile')
                      }}
                    >
                      Ver perfil
                    </button>
                    <button
                      className="block w-full px-3 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setOpen(false)
                        navigate('/adminEmpre')
                      }}
                    >
                      Administrar ganancias
                    </button>
                    <button
                      className="block w-full px-3 py-2 text-left text-red-600 hover:bg-gray-50"
                      onClick={() => {
                        setOpen(false)
                        logout()
                        navigate('/home')
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
