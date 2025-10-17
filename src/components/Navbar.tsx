import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { navigate } from '../router'
import logo from '../assets/images/D-Photoroom.png'

export function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        <div className="flex items-center gap-x-6">
          <button
            onClick={() => navigate('/home')}
            aria-label="Ir al inicio"
            
            className="flex items-center gap-3 text-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
          >
            <img
              src={logo}
              alt="Logo camelCase"
          
              className="h-24 w-auto object-contain"
            />
            <span className="font-semibold text-slate-900">Capital</span>
          </button>

          {user && (
            <div className="hidden items-center gap-x-4 md:flex">
              <button
                onClick={() => navigate('/home')}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-x-4">
          {!user ? (
            <>
              <button
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                onClick={() => navigate('/register')}
              >
                Registrarse
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/chatlist')}
                className="relative grid h-10 w-10 place-items-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"
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
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-offset-2 ring-transparent focus:outline-none focus:ring-indigo-500"
                  onClick={() => setOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  title={user.email}
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.email}`}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </button>

                {open && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-slate-200 bg-white py-1 text-sm text-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-slate-50"
                      onClick={() => {
                        setOpen(false)
                        navigate('/profile')
                      }}
                    >
                      Ver perfil
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-slate-50"
                      onClick={() => {
                        setOpen(false)
                        navigate('/adminEmpre')
                      }}
                    >
                      Administrar ganancias
                    </button>
                    <div className="my-1 h-px bg-slate-200" />
                    <button
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-slate-50"
                      onClick={() => {
                        setOpen(false)
                        logout()
                        navigate('/')
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