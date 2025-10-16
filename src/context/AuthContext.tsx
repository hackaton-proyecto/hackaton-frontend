import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Role = 'Inversor' | 'Emprendedor'
type User = { email: string; name?: string; lastName?: string; role?: Role }

type AuthContextType = {
  user: User | null
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      setUser(null)
    }
  }, [])

  const saveUser = (u: User | null) => {
    setUser(u)
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const login = async (email: string, _password: string) => {
    // Generic placeholder: accept any credentials and "log in"
    // If you later persist users, you can fetch the stored name here.
    saveUser({ email })
  }

  const register = async (
    name: string,
    lastName: string,
    role: Role,
    email: string,
    _password: string
  ) => {
    // Placeholder local register: persist minimal profile locally
    saveUser({ email, name, lastName, role })
  }

  const logout = () => saveUser(null)

  const value = useMemo(() => ({ user, login, register, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}