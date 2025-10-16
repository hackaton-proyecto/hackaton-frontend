import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'

type RouteConfig = {
  path: string
  element: JSX.Element
}

const routes: RouteConfig[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]

function getHashPath() {
  const hash = window.location.hash || '#/'
  const cleaned = hash.replace(/^#/, '')
  return cleaned || '/'
}

export function navigate(path: string) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`
}

export function Router() {
  const [path, setPath] = useState(getHashPath())

  useEffect(() => {
    const handler = () => setPath(getHashPath())
    window.addEventListener('hashchange', handler)
    if (!window.location.hash) navigate('/')
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const match = routes.find((r) => r.path === path)
  return match ? match.element : <NotFound />
}

