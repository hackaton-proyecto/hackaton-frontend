import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Role = 'Inversor' | 'Emprendedor'
type User = { email: string; name?: string; lastName?: string; role?: Role }

type AuthContextType = {
  user: User | null
  initialized: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    lastName: string,
    role: Role,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'auth_user'
const isDev = import.meta.env.DEV

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // En desarrollo no restauramos sesi贸n desde localStorage
    if (!isDev) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setUser(JSON.parse(raw))
      } catch {
        setUser(null)
      }
    } else {
      // Limpieza defensiva por si qued贸 alguna sesi贸n almacenada
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {}
      setUser(null)
    }
    setInitialized(true)
  }, [])

  const saveUser = (u: User | null) => {
    setUser(u)
    // En desarrollo no persistimos sesi贸n para evitar entrar logueado al arrancar
    if (isDev) {
      try {
        if (!u) localStorage.removeItem(STORAGE_KEY)
      } catch {}
      return
    }
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const login = async (email: string, _password: string) => {
    saveUser({ email })
  }

  const register = async (
    name: string,
    lastName: string,
    role: Role,
    email: string,
    _password: string
  ) => {
    saveUser({ email, name, lastName, role })
  }

  const logout = () => saveUser(null)

  const value = useMemo(() => ({ user, initialized, login, register, logout }), [user, initialized])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}