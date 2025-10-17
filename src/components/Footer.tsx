import { navigate } from '../router' 

export function Footer() {
  const year = new Date().getFullYear()
  const Logo = () => (
    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-800">
      <svg
        className="h-7 w-7 text-indigo-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12l3-3 3 3-3 3-3-3z" />
        <path d="M12 12l3-3 3 3-3 3-3-3z" />
        <path d="M21 12l-3-3-3 3 3 3 3-3z" />
      </svg>
      camelCase
    </div>
  )

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
         
          <div className="text-center md:text-left">
            <Logo />
            <p className="mt-2 text-sm text-slate-600">
              © {year} - Conectando inversores y emprendedores.
            </p>
          </div>

    
          <div className="flex items-center gap-x-6 text-sm font-medium text-slate-700">
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-indigo-600 transition-colors"
            >
              Términos de Servicio
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-indigo-600 transition-colors"
            >
              Política de Privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}