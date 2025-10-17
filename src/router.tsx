import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import EmprendimientoForm from './pages/EmpreForm'
import ProjectDetail from './pages/ProjectDetail'
import Profile from './pages/Profile'
import AdminEmpre from './pages/AdminEmpre'
import Chat from './pages/ChatEmpre'
import ListaChats from './pages/ListaChats'
import LandingPage from './pages/LandingPage'

type RouteConfig = {
  path: string
  element: JSX.Element
}

const routes: RouteConfig[] = [
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/emprendimientoForm', element: <EmprendimientoForm /> },
  { path: '/project', element: <ProjectDetail /> },
  { path: '/profile', element: <Profile /> },
  { path: '/adminEmpre', element: <AdminEmpre /> },
  { path: '/chat', element: <Chat /> },
  { path: '/chatlist', element: <ListaChats /> },
  { path: '/', element: <LandingPage /> },

]

function getHashPath() {
  const hash = window.location.hash || '#/'
  const cleaned = hash.replace(/^#/, '')
  const pathname = cleaned.split('?')[0]
  return pathname || '/'
}

export function navigate(path: string) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`
}

export function navigateReplace(path: string) {
  const target = path.startsWith('#') ? path : `#${path}`
  const base = window.location.href.split('#')[0]
  window.location.replace(`${base}${target}`)
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

