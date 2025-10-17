import { navigate } from '../router'
import logo from '../assets/images/D-Photoroom.png' // Se importa el logo

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            {/* --- CÓDIGO MODIFICADO: Se reemplaza el SVG por el logo de la imagen --- */}
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <img
                src={logo}
                alt="Logo Capital"
                className="h-10 w-auto object-contain"
              />
              <span className="text-lg font-semibold text-slate-900">
                Capital
              </span>
            </div>
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