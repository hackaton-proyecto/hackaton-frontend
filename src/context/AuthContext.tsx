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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      setUser(null)
    }
    setInitialized(true)
  }, [])

  const saveUser = (u: User | null) => {
    setUser(u)
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
