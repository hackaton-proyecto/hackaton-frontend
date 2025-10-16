import { useState } from "react";

const CATEGORIAS = [
  "Produccion",
  "Tecnologia",
  "Comercio",
  "Agroindustria",
  "Inmobiliario",
  "Finanzas",
  "Ambiente",
  "Salud",
  "Arte",
  "Turismo",
  "Inteligencia Artificial",
  "VideoJuegos",
];


const primaryColorClass = "bg-slate-800 hover:bg-slate-700";
const primaryTextColorClass = "text-slate-800";
const primaryRingClass = "focus:ring-slate-800";


const darkGreenClass = "bg-green-800 border-green-800";
const darkGreenHoverClass = "hover:bg-green-700";


const inputClasses = `w-full p-3 border border-gray-300 rounded-md ${primaryRingClass} focus:border-slate-800 focus:ring-1 focus:ring-slate-800 outline-none transition duration-150 ease-in-out placeholder-gray-500 text-gray-800`;

export default function EmprendimientoForm() {
  const [fase, setFase] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    rubro: "", 
    descripcion: "",
    objetivo: "",
    producto: "",
    publico: "",
    modelo: "",
    monto: "", 
    uso: "",
    rentabilidad: "", 
    plazo: "",
    minimo: "", 
    
    panelVentas: "",
    reportes: "",

    email: "",
    ubicacion: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "number") {
     
      const numericValue = value.replace(/[^0-9.]/g, ''); 
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const validarCampos = () => {
    const fasesRequeridas: Record<number, string[]> = {
      1: ["nombre", "rubro", "descripcion"],
      2: ["objetivo", "producto", "publico", "modelo"],
      3: ["monto", "uso", "rentabilidad", "plazo", "minimo"],
      4: [],
      5: ["email", "ubicacion"],
    };

    const requeridos = fasesRequeridas[fase];

    if (!requeridos || requeridos.length === 0) return true;

    const todosLlenos = requeridos.every((campo) => {
      const valor = formData[campo as keyof typeof formData];

      return valor !== null && valor.toString().trim() !== "";
    });

    return todosLlenos;
  };

  const siguiente = () => {
    if (!validarCampos()) {
      alert("⚠️ Por favor, completa todos los campos obligatorios antes de continuar. Los campos requeridos están marcados con un *.");
      return;
    }
    setFase(fase + 1);
  };

  const anterior = () => setFase(fase - 1);

  const fases = [
    "Información básica",
    "Modelo de negocio",
    "Finanzas",
    "Transparencia",
    "Verificación",
  ];

  
  const primaryButtonClass = `${primaryColorClass} text-white px-6 py-2 rounded-lg font-semibold transition duration-200 ease-in-out tracking-wide`;

  const secondaryButtonClass = "bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out";

  const publishButtonClass = `${darkGreenClass} ${darkGreenHoverClass} text-white px-6 py-2 rounded-lg font-semibold ml-auto transition duration-200 ease-in-out tracking-wide`;

  return (
    <div className="flex justify-center mt-10 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-lg">
        
        <div className="flex justify-between mb-10 pb-4">
          {fases.map((label, index) => {
            const num = index + 1;
            const activo = fase === num;
            const completado = fase > num;
            return (
              <div key={num} className="flex flex-col items-center w-full relative">
         
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-medium transition-all duration-300
                  ${activo ? `${primaryColorClass} text-white border-slate-800` : completado ? `bg-green-800 text-white border-green-800` : "bg-white text-gray-500 border-gray-400"}`}
                >
                
                  {completado ? '✓' : num} 
                </div>
         
                <p className={`text-xs mt-2 text-center whitespace-nowrap ${activo ? `${primaryTextColorClass} font-semibold` : "text-gray-600"}`}>
                  {label}
                </p>
               
                {num < fases.length && (
                  <div
                    className={`absolute top-5 left-[50%] -translate-x-1/2 w-[100%] h-0.5 transition-all duration-300 transform -z-10
                    ${completado ? "bg-green-800" : "bg-gray-300"}`}
                   
                    style={{ left: 'calc(50% + 20px)', width: 'calc(100% - 40px)' }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <hr className="mb-8 border-gray-100" />
        
    
        <h2 className={`text-2xl font-bold mb-8 text-center ${primaryTextColorClass}`}>
          {fase === 1 && "Información Básica del Proyecto"}
          {fase === 2 && "Detalle del Modelo de Negocio"}
          {fase === 3 && "Información Financiera y de Inversión"}
          {fase === 4 && "Seguimiento y Transparencia (Opcional)"}
          {fase === 5 && "Datos del Emprendedor y Verificación"}
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* === FASE 1 === */}
          {fase === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre del emprendimiento o Startup *"
                className={inputClasses}
              />
              
             
              <select
                name="rubro"
                value={formData.rubro}
                onChange={handleChange}
                className={`${inputClasses} appearance-none cursor-pointer`} 
              >
                <option value="" disabled hidden>Selecciona una Categoría / Rubro *</option>
                {CATEGORIAS.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción breve y propuesta de valor (Máx. 300 caracteres) *"
                className={`${inputClasses} h-28 resize-none`}
                maxLength={300}
              />
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Logotipo o Imagen Principal (Opcional)</label>
                <input type="file" className={`${inputClasses} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-slate-800 hover:file:bg-gray-200`} />
              </div>
            </div>
          )}

        
          {fase === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <textarea
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                placeholder="Objetivo principal y problema que resuelve *"
                className={`${inputClasses} h-24 resize-none`}
              />
              <input
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                placeholder="Producto o servicio ofrecido (¿Qué vendes?) *"
                className={inputClasses}
              />
              <input
                name="publico"
                value={formData.publico}
                onChange={handleChange}
                placeholder="Público objetivo y segmento de mercado *"
                className={inputClasses}
              />
              <input
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Modelo de ingresos (Ej: Suscripción, Venta directa) *"
                className={inputClasses}
              />
            </div>
          )}

          {fase === 3 && (
            <div className="space-y-6 animate-fadeIn">
            
              <input
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                type="number"
                inputMode="numeric" 
                placeholder="Monto total solicitado para la ronda de inversión ($) *"
                className={inputClasses}
              />
              <input
                name="uso"
                value={formData.uso}
                onChange={handleChange}
                placeholder="Uso detallado del capital (Ej: 50% Marketing, 30% Desarrollo) *"
                className={inputClasses}
              />
            
              <input
                name="rentabilidad"
                value={formData.rentabilidad}
                onChange={handleChange}
                type="number"
                inputMode="numeric"
                placeholder="Rentabilidad anual estimada para el inversor (%) *"
                className={inputClasses}
              />
              <input
                name="plazo"
                value={formData.plazo}
                onChange={handleChange}
                placeholder="Plazo estimado de retorno o salida de la inversión *"
                className={inputClasses}
              />
              
              <input
                name="minimo"
                value={formData.minimo}
                onChange={handleChange}
                type="number"
                inputMode="numeric"
                placeholder="Monto mínimo de inversión por inversor ($) *"
                className={inputClasses}
              />
            </div>
          )}

          {/* === FASE 4 === */}
          {fase === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-gray-600 italic border-l-4 border-slate-300 pl-3 py-1 bg-gray-50">
                Esta fase es opcional. Proveer más transparencia aumenta la confianza de los inversores.
              </p>

              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subir Plan de Negocios / Pitch Deck (Opcional)</label>
                <input type="file" className={`${inputClasses} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-slate-800 hover:file:bg-gray-200`} />
              </div>

              <input
                type="url"
                name="panelVentas"
                value={formData.panelVentas}
                onChange={handleChange}
                placeholder="Panel de ventas o métricas clave (enlace a Dashboard público/privado)"
                className={inputClasses}
              />
              <textarea
                name="reportes"
                value={formData.reportes}
                onChange={handleChange}
                placeholder="Actualizaciones, hitos logrados o reportes recientes (opcional)"
                className={`${inputClasses} h-24 resize-none`}
              />
            </div>
          )}

          {/* === FASE 5 === */}
          {fase === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email de contacto del fundador/equipo *"
                className={inputClasses}
              />
              <input
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ubicación principal (ciudad, país) *"
                className={inputClasses}
              />
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Documento de Identidad/Verificación (Requerido para publicación) *</label>
                <input type="file" className={`${inputClasses} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-slate-800 hover:file:bg-gray-200`} />
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificado de Registro de Empresa (Opcional)</label>
                <input type="file" className={`${inputClasses} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-slate-800 hover:file:bg-gray-200`} />
              </div>
            </div>
          )}
        </form>

        <div className="flex justify-between mt-10 border-t pt-6 border-gray-100">
          {fase > 1 ? (
            <button
              onClick={anterior}
              className={secondaryButtonClass}
            >
              ← Atrás
            </button>
          ) : (
            <div className="w-1/4"></div>
          )}

          {fase < 5 ? (
            <button
              onClick={siguiente}
              className={primaryButtonClass}
            >
              Siguiente Paso {fase + 1} / 5
            </button>
          ) : (
            <button className={publishButtonClass} onClick={() => alert("¡Emprendimiento Publicado! (Simulación)")}>
              Publicar Emprendimiento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}