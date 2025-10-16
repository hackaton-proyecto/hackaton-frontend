export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-white/90 backdrop-gray shadow-inner shadow-blue-900/5">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
        <p>
          Â© {year} camelCase - Tu plataforma para conectar inversores y emprendedores. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
