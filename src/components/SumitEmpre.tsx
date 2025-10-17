import { navigate } from '../router' 

export function FloatingActionButton() {
  const handleClick = () => {
    navigate('/emprendimientoForm')
  }

  return (
    <button
      onClick={handleClick}
      title="Añadir nuevo emprendimiento"
      className="
        fixed          // Posición fija en la pantalla
        bottom-8       // A 8 unidades (ej. 2rem o 32px) del borde inferior
        right-8        // A 8 unidades del borde derecho
        w-16           // Ancho de 16 unidades (4rem o 64px)
        h-16           // Alto de 16 unidades
        bg-blue-600    // Color de fondo azul
        rounded-full   // Bordes completamente redondeados para formar un círculo
        text-white     // Color del ícono
        flex           // Contenedor flex para centrar el ícono
        items-center   // Alinea el ícono verticalmente al centro
        justify-center // Alinea el ícono horizontalmente al centro
        shadow-lg      // Sombra grande para el efecto flotante
        hover:bg-blue-700 // Color de fondo más oscuro al pasar el mouse
        transition-all // Transición suave para todos los cambios
        focus:outline-none // Quita el borde al hacer foco
        focus:ring-2     // Añade un anillo de foco
        focus:ring-blue-500
        focus:ring-offset-2
        focus:ring-offset-gray-900
      "
    >
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  )
}

export default FloatingActionButton