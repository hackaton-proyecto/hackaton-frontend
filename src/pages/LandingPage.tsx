import { motion } from "framer-motion";
import { navigate } from "../router";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Fondo con imagen y capa oscura */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')",
        }}
      ></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col justify-center items-start min-h-screen px-10 lg:px-32">
        {/* Logo */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-blue-400 text-lg font-semibold tracking-widest"
        >
          CONECTA CAPITAL
        </motion.h2>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl lg:text-7xl font-extrabold mt-4 leading-tight max-w-3xl"
        >
          Inversiones inteligentes, emprendimientos reales.
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-300 text-lg mt-6 max-w-2xl"
        >
          Nuestra plataforma conecta emprendedores con proyectos prometedores y
          los inversores que buscan oportunidades reales, seguras y
          transparentes.
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-4 mt-10"
        >
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3 rounded-full shadow-lg text-white transition"
          >
            Soy Inversor
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-transparent border border-white text-lg px-6 py-3 rounded-full hover:bg-white hover:text-black transition text-white"
          >
            Soy Emprendedor
          </button>
        </motion.div>

        {/* Datos de autor / fecha */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-gray-500 text-sm mt-20"
        >
          © 2025 Conecta Capital — Plataforma de inversión colaborativa.
        </motion.p>
      </div>

      {/* Gráfico decorativo con líneas ascendentes */}
      <svg
        className="absolute bottom-0 right-0 w-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#2563eb"
          fillOpacity="0.3"
          d="M0,192L60,213.3C120,235,240,277,360,250.7C480,224,600,128,720,117.3C840,107,960,181,1080,213.3C1200,245,1320,235,1380,229.3L1440,224V320H0Z"
        ></path>
      </svg>
    </div>
  );
}
